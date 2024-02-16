import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faTrashCan, faPen, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import Cookies from 'js-cookie';
import Papa from "papaparse";
function AppCheckAnswerSheet(){
    const { id } = useParams();
    const [data, setdata] = useState([]);
    const [dataduplicate, setdataduplicate] = useState([]);


    const [ExamNo, setExamNo] = useState('');
    const [ExamNoShow, setExamNoShow] = useState('');
    const [numberofexamsets, setnumberofexamsets] = useState('');
    
    const [subid, setsubid] = useState('');
    const [subjectid, setsubjectid] = useState('');
    const [subjectname, setsubjectname] = useState('');

    const [csvData, setcsvData] = useState([]);

    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const fetchDataStartExam = async () => {
        try{
            const response = await fetch(variables.API_URL+"exam/detail/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            });
            const result = await response.json();
                // console.log(result)
                if(result.err !== undefined){
                    setStartError(1);
                }
                console.log(result)
                setExamNo(result.examno)
                setExamNoShow(result.examid)
                setsubid(result.subid)
                setnumberofexamsets(result.numberofexamsets)

                if (result.std_csv_path !== null) {
                    const csvResponse = await fetch(result.std_csv_path);
                    const csvText = await csvResponse.text();
                    // const csvBlob = new Blob([csvText], { type: 'text/csv' });
                    // const csvFile = new File([csvBlob], 'student_list.csv', { type: 'text/csv' });

                    parseCSVData(csvText);
                }


                fetch(variables.API_URL+"subject/detail/"+result.subid+"/", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    })
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)
                        setsubjectid(result.subjectid)
                        setsubjectname(result.subjectname)
                        
                    }
                )
        }catch (err) {
            // console.error(err)
            setStartError(1);
        }
    };


    const fetchDataExamInfo = async () => {
        try{
            fetch(variables.API_URL+"examinformation/detail/exam/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    if(result.err !== undefined){
                        setStartError(1);
                    }
                    console.log("result __",result)
                    setdata(result.non_duplicate_records)
                    setdataduplicate(result.duplicate_records)
                }
            )
        }catch (err) {
            setdata([])
        }

     };
     
    if(Start === 0){
        fetchDataStartExam();
        fetchDataExamInfo();
        setStart(1);
    }
    
    function extractFilenameFromURL(url) {
        const parts = url.split('/');
        const filenameWithSpaces = parts[parts.length - 1];
        const decodedFilename = decodeURIComponent(filenameWithSpaces);
        return decodedFilename;
    }
    const handleDelCours = async (examinfoid,idindex) => {
        // console.log(subid)
        Swal.fire({
            title: "ลบข้อมูลข้อสอบ",
            text: `คุณต้องการลบข้อมูลเกี่ยวกับ ${idindex} ใช่หรือไม่ `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText:"ยกเลิก"
        }).then( (result) => {
            if (result.isConfirmed) {
                try{
                    fetch(variables.API_URL+"examinformation/delete/"+examinfoid+"/", {
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
                                title: result.msg+"\n",
                                icon: "success",//error,question,warning,success
                                confirmButtonColor: "#341699",
                            });
                            fetchDataExamInfo();
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
    const showCustomAlert = (dataid,datastdid,datasubid,datasetexaminfo,dataimg,type) => {
        console.log(dataid)
        console.log("รหัสนักศึกษา :",datastdid)
        console.log("รหัสวิชา :",datasubid)
        console.log("ชุดข้อสอบ :",datasetexaminfo)
        console.log("รูปแบบ :",type)

        const isMobile = window.innerWidth < 780;
        const subjectpass = subjectid;
        Swal.fire({
            title: 'แก้ไขข้อผิดพลาด  ',
            html: `
                <div class='test' style="display: ${isMobile ? 'grid' : 'flex'}; ${isMobile ? 'grid-template-columns: 1fr;' : 'justify-content: center; align-items: center;'} width: 100%;">
                    <div style="flex: 1; text-align: center;">
                        <img src="${dataimg}" alt="Image" style="width: 584px; height: 413px;">
                    </div>
                    <div style="flex: 1; margin-left: 20px; text-align: left;"> 
                        <div style=" ${type === '1' || type === '3'? '' : 'display:none'}">
                            <div>
                                <label for="input1">รหัสนักศึกษา </label>
                            </div>
                            <div>
                                <select id="input1" class="swal2-select" style="width: 250px;margin:0px;height: 42px;font-size: 16px;color: black;border-radius: 5px; ">
                                    ${generateOptionsStd(csvData, datastdid)}
                                </select>
                            </div>
                            <div>
                                <label for="input2">รหัสวิชา:</label>
                            </div>
                            <div style="position: relative;">
                                <input type="text" id="input2" value="${datasubid}" class="swal2-input" style="width: 250px;margin:0px;padding-right: 40px;">
                                <img src="/img/check.png" alt="Image" id="passTextsubid" style="width: 30px; height: 30px; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);left: 215;">
                            </div>
                            <div>
                                <label for="input3">ชุดข้อสอบ:</label>
                            </div>
                            <div>
                                <select id="input3" class="swal2-select" style="width: 250px;margin:0px;height: 42px;font-size: 16px;color: black;border-radius: 5px; ">
                                    ${generateOptionsNumberofExamSets(numberofexamsets, datasetexaminfo)}
                                </select>
                            </div>
                        </div>
                        <div style=" ${type === '2' || type === '3'? '' : 'display:none'}">
                            <div>
                                <label for="fileInput">อัปโหลดไฟล์:</label> 
                            </div>
                            <div>
                                <input type="file" id="fileInput" class="swal2-file" style="width: 250px;margin:0px;">
                            </div>
                        </div>
                    </div>
                </div>
            `,
        
            showCancelButton: true,
            confirmButtonColor: "#341699",
            confirmButtonText: 'แก้ไข',
            cancelButtonText: 'ยกเลิก',
            customClass: {
                popup: 'custom-alert-popup',
            },
            preConfirm: () => {
                const input1Value = document.getElementById('input1').value;
                const input2Value = document.getElementById('input2').value;
                const input3Value = document.getElementById('input3').value;
    
                if (input1Value === '' || input2Value === '' || input3Value === '') {
                    Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                    return false;
                }
            }
        }).then((result) => {
            const input1Value = document.getElementById('input1').value;
            const input2Value = document.getElementById('input2').value;
            const input3Value = document.getElementById('input3').value;
    
            if (input1Value === '' || input2Value === '' || input3Value === '') {
                Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                return; // Prevent closing the alert
            }
    
            if (result.isConfirmed) {
                if(UpdateExamInfo(input1Value,input2Value,input3Value,dataid)){
                    fetchDataExamInfo();
                    Swal.fire({
                        icon: 'success',
                        title: 'แก้ไขข้อมูลเสร็จสิ้น',
                        text: '',
                    }).then(() => {
                        window.location.reload();
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: '',
                    });
                }
              
            }
        });

        document.getElementById('passTextsubid').addEventListener('click', function() {
            document.getElementById('input2').value = subjectpass;
            document.getElementById('input2').disabled = true;
            document.getElementById('input2').style.backgroundColor = '#DDDDDD';
            document.getElementById('passTextsubid').src = "/img/checkgreen.png";
        });
      
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if(UpdateuploadFile(file,dataid)) {
                fetchDataExamInfo();
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขข้อมูลเสร็จสิ้น',
                    text: '',
                }).then(() => {
                    window.location.reload();
                });
                
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการแก้ไข',
                    text: '',
                });
            }
        });
    };
    function generateOptionsStd(data, selectedValue) {
        console.log('selectedValuestd:',selectedValue)
        let optionsHTML = '';
        optionsHTML += `<option value="">กรุณาเลือกรหัสนักศึกษา...</option>`;
        data.forEach(entry => {
            const isSelected = String(entry['Student ID']) === String(selectedValue) ? 'selected' : '';
            optionsHTML += `<option value="${entry['Student ID']}" ${isSelected}>${entry['Student ID']}</option>`;
        });
        return optionsHTML;
    }
    function generateOptionsNumberofExamSets(data, selectedValue) {
        console.log('selectedValueNumber:',selectedValue)
        let optionsHTML = '';
        optionsHTML += `<option value="">กรุณาเลือกชุดข้อสอบ...</option>`;
        for (let i = 1; i <= data; i++) {
            optionsHTML += `<option value="${i}" ${String(selectedValue) === String(i) ? 'selected' : ''}>${i}</option>`;
        }
        return optionsHTML;
    }
    async function UpdateuploadFile(fileUpload,dataid) {
        try{
            const formData = new FormData();
            formData.append("file", fileUpload);
            formData.append("userid", Cookies.get('userid'));
            formData.append("examid", id);
            console.log(formData)
            const response = await fetch(variables.API_URL + "examinformation/update/"+dataid+"/", {
                method: "PUT",
                body: formData,
            });
            const result = await response.json();
            console.log("result :",result)
            if(result.ok){
                return true;
            }
        }catch (err) {
            return false;
        }
    }
    async function UpdateExamInfo(data1,data2,data3,dataid) {
        try{
            const formData = new FormData();
            formData.append("stdid", data1);
            formData.append("subjectidstd", data2);
            formData.append("setexaminfo", data3);
            formData.append("examinformation", dataid);
            formData.append("userid", Cookies.get('userid'));
            formData.append("examid", id);
            formData.append("errorstype", '');
            
            console.log("formData: ",formData)
            const response = await fetch(variables.API_URL + "examinformation/update/"+dataid+"/", {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if(result.ok){
                return true;
            }

        }catch (err) {
            console.error(err);
            return false;
        }
    }
    const parseCSVData = (text) => {
        Papa.parse(text, {
            header: true, 
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (result) {
                console.log('Parsed CSV data:', result.data);
                setcsvData(result.data);
            },
        });
    };

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                {StartError === 1 ?
                    <div className='box-content-view'>
                        <div className='bx-topic light'>เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง</div>
                        <div className='bx-details light'><h2>Not Found</h2></div>
                    </div>
                :
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">รายวิชาทั้งหมด</Link> / <Link to={"/Subject/SubjectNo/"+subid}> {subjectname} </Link> / <Link to={"/Subject/SubjectNo/Exam/"+ExamNoShow}> การสอบครั้งที่ {ExamNo} </Link> / ตรวจความถูกต้องกระดาษคำตอบ</p>
                            <div className='bx-grid-topic'>
                                <div className="flex">
                                    <h2>ตรวจความถูกต้องกระดาษคำตอบ</h2>
                                    <div className="pdl10px">
                                        <Link to="#">
                                            <p className='button-process'><span className="fb">วิเคราะห์ผล</span></p>
                                        </Link>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className='bx-details light'>
                            <div>
                                {/* <div style={{ width: '200px', height: '450px', overflow: 'hidden' }}>
                                    <img 
                                        src="/img/answersheet_eng.jpg" 
                                        alt="Image" 
                                        style={{ width: '584px', height: '413px', marginLeft: '0px', marginTop: '0' }} 
                                    />
                                </div> */}
                                    <div className="space10"></div>
                                    <div className="fb">ตารางแสดงความถูกต้องของไฟล์กระดาษคำตอบ ที่ถูกต้อง</div>
                                    <div className="tableSub">
                                    <table className="">
                                        <thead>
                                            <tr>
                                                <th style={{ minWidth: '150px',maxWidth: '150px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>#</th>
                                                <th style={{ minWidth: '150px',maxWidth: '150px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>รหัสนักศึกษา</th>
                                                <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>รหัสวิชา</th>
                                                <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>ชุดข้อสอบ</th>
                                                <th style={{ minWidth: '170px',maxWidth: '170px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>การตรวจคำตอบ</th>
                                                <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>สาเหตุ</th>
                                                <th style={{ minWidth: '180px',maxWidth: '180px',overflowX: 'auto', whiteSpace: 'nowrap' }}>ชื่อไฟล์</th>
                                                <th style={{ minWidth: '100px',maxWidth: '100px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>การจัดการ</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.map((item, index) => (
                                                (item.stdid !== '' && item.stdid !== null && item.stdid !== "0" && item.stdid !== 0 ) &&
                                                (item.subjectidstd !== '' && item.subjectidstd !== null && item.subjectidstd !== "0" && item.setexaminfo !== 0 ) && 
                                                (item.setexaminfo !== '' && item.setexaminfo !== null && item.setexaminfo !== "0" && item.setexaminfo !== 0) && 
                                                (item.anschoicestd !== '' && item.anschoicestd !== null && item.anschoicestd !== "0" && item.anschoicestd !== 0) 
                                                ? (
                                                <tr key={index}>
                                                    <td className="center">{item.stdid} </td>
                                                    <td className="center" >{item.stdid !== "" && item.stdid !== null && item.subjectidstd !== "0" && item.stdid !== 0 ? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p> :<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                    <td className="center">{item.subjectidstd !== "" && item.subjectidstd !== null && item.subjectidstd !== "0" && item.subjectidstd !== 0 ? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                    <td className="center">{item.setexaminfo !== ""  && item.setexaminfo !== null && item.setexaminfo !== "0" && item.setexaminfo !== 0 ? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                    <td className="center">{item.anschoicestd !== ""  && item.anschoicestd !== null && item.anschoicestd !== "0" && item.anschoicestd !== 0 ?<FontAwesomeIcon className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                    <td className="hover-trigger center green-font"><p className="hover-content">รายละเอียดถูกต้อง</p><FontAwesomeIcon icon={faCircleCheck} /></td>
                                                    <td className="w150px" style={{ overflowX: 'auto', whiteSpace: 'nowrap'}}>{extractFilenameFromURL(item.imgansstd_path)}</td>
                                                    <td className="center mw80px"> 
                                                        <Link to="#" onClick={() =>showCustomAlert(item.examinfoid,item.stdid,item.subjectidstd,item.setexaminfo,item.imgansstd_path, '3')} className='' style={{ display: 'contents' }}><span className='border-icon-dark'>{<FontAwesomeIcon icon={faPen} />}</span></Link>
                                                        <span className='danger light-font' onClick={() => handleDelCours(item.examinfoid,extractFilenameFromURL(item.imgansstd_path))}><FontAwesomeIcon icon={faTrashCan} /></span>
                                                    </td>
                                                </tr>
                                                ) : null
                                            ))}
                                        </tbody>
                                    </table>
                                   
                                    <div>
                                        <div className="space10"></div>
                                        <div className="fb">ตารางแสดงความถูกต้องของไฟล์กระดาษคำตอบ ที่ไม่ถูกต้อง</div>
                                        <table className="">
                                            <thead>
                                                <tr>
                                                    <th style={{ minWidth: '150px',maxWidth: '150px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>#</th>
                                                    <th style={{ minWidth: '150px',maxWidth: '150px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>รหัสนักศึกษา</th>
                                                    <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>รหัสวิชา</th>
                                                    <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>ชุดข้อสอบ</th>
                                                    <th style={{ minWidth: '170px',maxWidth: '170px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>การตรวจคำตอบ</th>
                                                    <th style={{ minWidth: '130px',maxWidth: '130px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>สาเหตุ</th>
                                                    <th style={{ minWidth: '180px',maxWidth: '180px',overflowX: 'auto', whiteSpace: 'nowrap' }}>ชื่อไฟล์</th>
                                                    <th style={{ minWidth: '100px',maxWidth: '100px' ,overflowX: 'auto', whiteSpace: 'nowrap'}}>การจัดการ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => {
                                                    if (
                                                        (item.stdid === '' || item.stdid === null || item.stdid === "0" || item.stdid === 0) ||
                                                        (item.subjectidstd === '' || item.subjectidstd === null || item.subjectidstd === "0" || item.subjectidstd === 0) ||
                                                        (item.setexaminfo === '' || item.setexaminfo === null || item.setexaminfo === "0" || item.setexaminfo === 0) ||
                                                        (item.anschoicestd === '' || item.anschoicestd === null || item.anschoicestd === "0" || item.anschoicestd === 0)
                                                    ) {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="center">{item.stdid } </td>
                                                                <td className="center">{item.stdid !== "" && item.stdid !== null  && item.stdid !== "0" && item.stdid !== 0? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p> :<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                                <td className="center">{item.subjectidstd !== "" && item.subjectidstd !== null  && item.subjectidstd !== "0" && item.subjectidstd !== 0? <p><FontAwesomeIcon  className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                                <td className="center">{item.setexaminfo !== ""  && item.setexaminfo !== null  && item.setexaminfo !== "0" && item.setexaminfo !== 0? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                                <td className="center">{item.anschoicestd !== ""  && item.anschoicestd !== null && item.anschoicestd !== "0" && item.anschoicestd !== 0 ?<FontAwesomeIcon className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                                {/* <td className="center"><div className="floating-box">สาเหตุ</div></td> */}
                                                                <td className="hover-trigger center warning-font"><FontAwesomeIcon icon={faTriangleExclamation} /><p className="hover-content">{item.errorstype}</p></td>

                                                                <td className="w150px" style={{ overflowX: 'auto', whiteSpace: 'nowrap'}}>{extractFilenameFromURL(item.imgansstd_path)}</td>
                                                                <td className="center mw80px"> <Link to="#" onClick={() =>showCustomAlert(item.examinfoid,item.stdid,item.subjectidstd,item.setexaminfo,item.imgansstd_path,item.anschoicestd !== "" && item.anschoicestd !== null && item.anschoicestd !== "0" && item.anschoicestd !== 0 ? "1" : "2")} className='' style={{ display: 'contents' }}><span className='border-icon-dark'>{<FontAwesomeIcon icon={faPen} />}</span></Link><span className='danger light-font' onClick={() => handleDelCours(item.examinfoid,extractFilenameFromURL(item.imgansstd_path))}><FontAwesomeIcon icon={faTrashCan} /></span></td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                                {dataduplicate.map((item, index) => {   
                                                    return (  
                                                        <tr key={index}>
                                                            <td className="center danger-font">{item.stdid } </td>
                                                            <td className="center">{item.stdid !== "" && item.stdid !== null  && item.stdid !== "0" && item.stdid !== 0? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p> :<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                            <td className="center">{item.subjectidstd !== "" && item.subjectidstd !== null  && item.subjectidstd !== "0" && item.subjectidstd !== 0? <p><FontAwesomeIcon  className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                            <td className="center">{item.setexaminfo !== ""  && item.setexaminfo !== null  && item.setexaminfo !== "0" && item.setexaminfo !== 0? <p><FontAwesomeIcon className="green-font" icon={faCircleCheck} /></p>:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                            <td className="center">{item.anschoicestd !== ""  && item.anschoicestd !== null && item.anschoicestd !== "0" && item.anschoicestd !== 0 ?<FontAwesomeIcon className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                                            <td className="hover-trigger center warning-font"><p className="hover-content">รหัสนักศึกษาซ้ำกัน{item.errorstype}</p><FontAwesomeIcon icon={faTriangleExclamation} /></td>
                                                            <td className="w150px" style={{ overflowX: 'auto', whiteSpace: 'nowrap'}}>{extractFilenameFromURL(item.imgansstd_path)}</td>
                                                            <td className="center mw80px"> <Link to="#" onClick={() =>showCustomAlert(item.examinfoid,item.stdid,item.subjectidstd,item.setexaminfo,item.imgansstd_path, "3")} className='' style={{ display: 'contents' }}><span className='border-icon-dark'>{<FontAwesomeIcon icon={faPen} />}</span></Link><span className='danger light-font' onClick={() => handleDelCours(item.examinfoid,extractFilenameFromURL(item.imgansstd_path))}><FontAwesomeIcon icon={faTrashCan} /></span></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <td className="center">{ true ?<FontAwesomeIcon icon={faCircleCheck} />:<FontAwesomeIcon icon={faCircleXmark} />}</td> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    </div>

    );

}

export default AppCheckAnswerSheet;