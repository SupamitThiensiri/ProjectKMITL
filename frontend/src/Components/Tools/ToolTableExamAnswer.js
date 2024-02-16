import React, { useState, useEffect} from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useFilters, // Import useFilters
} from 'react-table';
import {variables} from "../../Variables";
import Swal from 'sweetalert2'
import {
    Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft, faAnglesRight, faAnglesLeft, faTrashCan, faPen, faSortDown, faSortUp, faSort, faSquarePlus, faCircleCheck, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const TableExamAnswer = ({ columns, examnoanswers }) => {
    const { id } = useParams(); 
    const [data, setdata] = useState([]);
    const FullData = useState([]);
    const numbers = parseInt(examnoanswers)
    const [Start, setStart] = useState(0);

    const Simulateddata = Array.from({ length: numbers }, (_, index) => ({
        choiceanswers: null,
        examanswersid: null,
        examid: null,
        examnoanswers: `${index + 1}`,
        papeans_path: null,
        scoringcriteria: null
    }));
    const fetchDataExamAnswer = async () => {
        try{
            fetch(variables.API_URL+"examanswers/detail/exam/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
 

                    const output2Map = result.reduce((map, item) => {
                        map[item.examnoanswers] = item;
                        return map;
                    }, {});
                    const FullData = Simulateddata.map(item => {
                        const output2Item = output2Map[item.examnoanswers];
                        return output2Item ? output2Item : item;
                    });
                    setdata(FullData)
                }
            )
        }catch (err) {
            setdata([])
        }
     };
     
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        gotoPage,
        pageCount,
        setPageSize,
    } = useTable(
        {
        columns,
        data,
        filterTypes: {
            text: (rows, id, filterValue) => {
            return rows.filter((row) => {
                const rowValue = row.values[id];
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .includes(String(filterValue).toLowerCase())
                : true;
            });
            },
        },
        },
        useFilters, // Use useFilters before useSortBy
        useGlobalFilter,
        useSortBy,
        usePagination
    );
 
 
    const { pageIndex, pageSize, globalFilter } = state;
    const [selectedColumn] = useState('all');
    // const [selectedColumn,setSelectedColumn] = useState('all'); // Default to search all columns

    const handleDelCours = async (examanswersid,examnoanswers) => {
        // console.log(subid)
        Swal.fire({
            title: "ลบเฉลยคำตอบ",
            text: `คุณต้องลบเฉลยข้อสอบชุดที่ ${examnoanswers} ใช่หรือไม่ `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText:"ยกเลิก"
        }).then( (result) => {
            if (result.isConfirmed) {
                try{
                    fetch(variables.API_URL+"examanswers/delete/"+examanswersid+"/", {
                        method: "DELETE",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        })
                        .then(response => response.json())
                        .then(result => {
                            // console.log(result)
                            Swal.fire({
                                title: result.msg,
                                icon: "success",//error,question,warning,success
                                confirmButtonColor: "#341699",
                            });
                            fetchDataExamAnswer();
                        }
                    )
                }catch (err) {
                    // console.error('เกิดข้อผิดพลาดในการลบ:', err);
                    Swal.fire({
                        title: "เกิดข้อผิดพลาดในการลบการสอบ",
                        icon: "error",//error,question,warning,success
                        confirmButtonColor:"#341699",
                    });
                }
            }
        });
    };    
    // display: flex;
    // justify-content: center;
    // padding: 20px;
    // margin: 20px
    const showAlertCreate = (id,idsetexam) => {
        const isMobile = window.innerWidth < 500;
        Swal.fire({
          title: 'รูปแบบการสร้างเฉลย  ',
          html: `
            <div className="bx-step-content" style="display: ${isMobile ? 'grid' : 'flex'};justify-content: center;" >
                <div style="margin: 20px;"><a href="/Subject/SubjectNo/Exam/ExamAnswer/CreateExamAnswer/${id}/${idsetexam}/1"><div className="bx-show" style="padding: 20px;border: 1px solid #DDDDDD" ><div className="box"><div className="box-img"><img src='/img/AnsCustomized.png' alt='' /><p className="grid" style="color: #000;">กำหนดเอง</p></div></div></div></a></div>
                <div style="margin: 20px;"><a href="/Subject/SubjectNo/Exam/ExamAnswer/CreateExamAnswer/${id}/${idsetexam}/2"><div className="bx-show" style="padding: 20px;border: 1px solid #DDDDDD;" ><div className="box"><div className="box-img"><img src='/img/AnsScan.png' alt='' /><p className="grid" style="color: #000;">สแกนไฟล์เฉลย</p></div></div></div></a></div>
            </div>
            `,
            showConfirmButton:false,
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            customClass: {
            popup: 'custom-alert-popup',
            },
            
        });
    };


    useEffect(() => {
        if(data.length === 0){
            fetchDataExamAnswer();
        }
    }, [data,FullData]);
    if(Start === 0){
        fetchDataExamAnswer();
        setStart(1);
    }

    return (
        <div>
            <div className='InputSize space-between'>
                <select className='selectShow'
                    value={pageSize}
                    onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                ))}
                </select>
                <input
                    type="text"
                    value={selectedColumn=== "all"? globalFilter || '':selectedColumn.filterValue || ''}
                    onChange={(e) => selectedColumn === "all" ? setGlobalFilter(e.target.value) : selectedColumn.setFilter(e.target.value)}
                    placeholder="ค้นหาทั้งหมด..."
                />
            </div>   
            <div className="tableSub nLC-bg">
                
                <table {...getTableProps()} className="table width100">
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>ลำดับ</th>
                            {headerGroup.headers.map((column) => (
                                (column.id !== 'examanswersid' && column.id !== 'scoringcriteria' && column.id !== 'choiceanswers' && column.id !== 'papeans_path') ? (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                        <span className='' {...column.getSortByToggleProps()}>
                                            {column.isSorted ? (column.isSortedDesc ?  <FontAwesomeIcon icon={faSortDown} />: <FontAwesomeIcon icon={faSortUp} />) : <FontAwesomeIcon icon={faSort} />}
                                        </span>
                                    </th>
                                ) : null
                            ))}
                            <th>สถานะ</th>
                            <th>การจัดการ</th>
                        </tr>
                    ))}
                    
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.length <= 0 ? (
                    <>
                        <tr className='center'><td colSpan={columns.length + 2}>ไม่พบข้อมูล</td></tr>
                    </>
                    ):(
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                row.values.examanswersid !== null ?
                                    <tr {...row.getRowProps()} key={row.id} className='LCshow'>
                                        <td className='center'><Link to={"" + row.values.examanswersid}>{Number(row.id) + 1}</Link></td>
                                        <td><Link to={"" + row.values.examanswersid}>{row.values.examnoanswers}</Link></td>
                                        <td className='statustable'><Link to={""}><p className='succeed'><FontAwesomeIcon icon={faCircleCheck} />{"สร้างเฉลยเสร็จสิ้น"}</p></Link></td>
                                        <td className='center mw80px '>
                                            <Link to={"/Subject/SubjectNo/Exam/ExamAnswer/UpdateExamAnswer/" + row.values.examanswersid +"/"+ id +"/"+ row.values.examnoanswers} className='' style={{ display: 'contents' }}>
                                                <span className='border-icon-dark'><FontAwesomeIcon icon={faPen} /></span>
                                            </Link>
                                            <span className='danger light-font' onClick={() => handleDelCours(row.values.examanswersid, row.values.examnoanswers)}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </span>
                                        </td>
                                    </tr>  
                                    :
                                    <tr {...row.getRowProps()} key={row.id} className='LCnotshow' onClick={() => showAlertCreate(id,Number(row.id) + 1)}>
                                        <td className='center'><Link to={"" + row.values.examanswersid}>{Number(row.id) + 1}</Link></td>
                                        <td><Link to={"" + row.values.examanswersid}>{row.values.examnoanswers}</Link></td>
                                        <td className='statustable'><Link to={""}><p className='warning'><FontAwesomeIcon icon={faTriangleExclamation} />{"รอดำเนินการสร้าง"}</p></Link></td>
                                        <td className='center mw80px'>
                                            <span className='primary-blue light-font' >
                                                <FontAwesomeIcon icon={faSquarePlus} />
                                            </span>
                                        </td>
                                    </tr>  
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
            <div className='InputSize'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {<FontAwesomeIcon icon={faAnglesLeft} />}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {<FontAwesomeIcon icon={faChevronLeft} />}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {<FontAwesomeIcon icon={faChevronRight} />}
                </button>{' '}
                <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                >
                {<FontAwesomeIcon icon={faAnglesRight} />}
                </button>{' '}
                <span>
                    Page{' '}
                    {pageIndex + 1} of {pageOptions.length}
                </span>
            </div>
        </div>
    );
};
 

export default TableExamAnswer;                                     


