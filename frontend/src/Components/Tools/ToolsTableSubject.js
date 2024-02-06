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
import Cookies from 'js-cookie';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft, faAnglesRight, faAnglesLeft, faTrashCan, faPen, faSortDown, faSortUp, faSort} from "@fortawesome/free-solid-svg-icons";

const TableSubject = ({ columns }) => {
    // const [DataSubject, setDataSubject] = useState([]);
    const [data, setdata] = useState([]);

    const fetchDataSubject = async () => {
        try{
            fetch(variables.API_URL+"subject/detail/user/"+Cookies.get('userid')+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setdata(result)
                }
            )
        }catch (err) {
            // console.error('ไม่พบข้อมูล:', err);
            setdata([])
        }
        
    };
    
    useEffect(() => {
        fetchDataSubject();
    }, []);

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

    const handleDelCours = async (subid,subname) => {
        // console.log(subid)
        Swal.fire({
            title: "ลบรายวิชา",
            text: `คุณต้องการลบรายวิชา ${subname} ใช่หรือไม่ `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText:"ยกเลิก"
        }).then( (result) => {
            if (result.isConfirmed) {
                try{
                    fetch(variables.API_URL+"subject/delete/"+subid+"/", {
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
                                title: result.msg+"\n"+result.deletetime,
                                icon: "success",//error,question,warning,success
                                confirmButtonColor: "#341699",
                            });
                            fetchDataSubject();
                        }
                    )
                }catch (err) {
                    // console.error('เกิดข้อผิดพลาดในการลบ:', err);
                    Swal.fire({
                        title: "เกิดข้อผิดพลาดในการลบรายวิชา",
                        icon: "error",//error,question,warning,success
                        confirmButtonColor:"#341699",
                    });
                }
            }
        });
    };
    const handlecancelDel = async (subid,subname,datetime) => {
        Swal.fire({
            title: `วิชาจะถูกลบในวันที่และเวลา \n${datetime}`,
            text: `คุณต้องการยกเลิกการลบวิชา ${subname} ใช่หรือไม่ `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText:"ยกเลิก"
        }).then( (result) => {
            if (result.isConfirmed) {
                try{
                    fetch(variables.API_URL+"subject/update/"+subid+"/", {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({
                            deletetimesubject : null
                    
                        }),
                        })
                        .then(response => response.json())
                        .then(result => {
                            Swal.fire({
                                title: "ทำการยกเลิกการลบเสร็จสิ้น",
                                icon: "success",//error,question,warning,success
                                confirmButtonColor: "#341699",
                            });
                            fetchDataSubject();
                        }
                    )
                }catch (err) {
                    // console.error('เกิดข้อผิดพลาดในการลบ:', err);
                    Swal.fire({
                        title: "เกิดข้อผิดพลาดในการลบรายวิชา",
                        icon: "error",//error,question,warning,success
                        confirmButtonColor:"#341699",
                    });
                }
            }
        });
    };
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
            <div className="tableSub LC-bg">
                
                <table {...getTableProps()} className="table width100">
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>ลำดับ</th>
                            {headerGroup.headers.map((column) => (
                                (column.id !== 'userid' && column.id !== 'subid' && column.id !== 'statussubject' && column.id !== 'createtimesubject' && column.id !== 'deletetimesubject') ? (
                                    <th {...column.getHeaderProps()}>
                                    {/* <th {...column.getHeaderProps(column.getSortByToggleProps())}> */}
                                        {column.render('Header')}
                                        {/* {console.log(column.Header)} */}
                                        <span className='' {...column.getSortByToggleProps()}>
                                            {column.isSorted ? (column.isSortedDesc ?  <FontAwesomeIcon icon={faSortDown} />: <FontAwesomeIcon icon={faSortUp} />) : <FontAwesomeIcon icon={faSort} />}
                                        </span>
                                        {/* <div>
                                            {column.canFilter ? ( // Check if the column can be filtered
                                            <input
                                                type="text"
                                                value={column.filterValue || ''}
                                                onChange={(e) =>
                                                column.setFilter(e.target.value) // Set the filter value for the column
                                                }
                                                placeholder={`ค้นหา ${column.render('Header')}`}
                                            />
                                            ) : null}
                                        </div> */}
                                    </th>
                                ) : null
                            ))}
                            <th>การจัดการ</th>
                        </tr>
                    ))}
                    
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.length <= 0 ? (<tr className='center'><td colSpan={columns.length + 2}>ไม่พบข้อมูล</td></tr>):(
                        page.map((row) => {
                            prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.id}>
                                        <td className={row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?"center":"center wait"}><Link to={"/Subject/SubjectNo/"+row.cells[0].value}>{Number(row.id)+1}</Link></td>
                                        <td className={row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?"":"wait"}><Link to={"/Subject/SubjectNo/"+row.cells[0].value}>{row.cells[1].value}</Link></td>
                                        <td className={row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?"":"wait"}><Link to={"/Subject/SubjectNo/"+row.cells[0].value}>{row.cells[2].value}</Link></td>
                                        <td className={row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?"":"wait"}><Link to={"/Subject/SubjectNo/"+row.cells[0].value}>{row.cells[3].value}</Link></td>
                                        <td className={row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?"":"wait"}><Link to={"/Subject/SubjectNo/"+row.cells[0].value}>{row.cells[4].value}</Link></td>
                                        {/* {console.log(row.cells[6].value)} */}
                                        {row.cells[6].value === null || row.cells[6].value === '' || row.cells[6].value === "null"?
                                            <td className='center mw80px' ><Link to={"/Subject/UpdateSubject/"+row.cells[0].value} className='' style={{ display: 'contents' }}><span className=''><FontAwesomeIcon icon={faPen} /></span></Link><span className='danger light-font' onClick={() => handleDelCours(row.cells[0].value,row.cells[1].value)}><FontAwesomeIcon icon={faTrashCan} /></span> </td>
                                        :
                                            <td className='center mw80px' ><Link to="#"><p className='danger light-font' onClick={() => handlecancelDel(row.cells[0].value,row.cells[2].value,row.cells[6].value)}>ยกเลิกการลบ</p> </Link></td>
                                        }
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
                    {/* <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '} */}
                </span>
                {/* <span>
                | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                    }}
                />
                </span>{' '} */}

            </div>
        </div>
    );
};

export default TableSubject;