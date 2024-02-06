import {
    Link
} from "react-router-dom";
import React, { useState,useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";

function AppUploadStudent(){
    // examid
    // userid
    // file
    const { id } = useParams();

    const [ExamNo, setExamNo] = useState('');
    const [ExamNoShow, setExamNoShow] = useState('');
    const [subid, setsubid] = useState('');
    const [subjectname, setsubjectname] = useState('');

    const [File, setFile] = useState(''); // สำหรับเก็บไฟล์
    const [statusitem, setStatusItem] = useState(false); // สำหรับเปิด box แสดงชื่อไฟล์และลบลบไฟล์ box item
    const [namefileupload, setNameFileUpload] = useState(''); // สำหรับชื่อไฟล์อัปโหลด
    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const fetchDataStart = async () => {
        try{
            fetch(variables.API_URL+"exam/detail/"+id+"/", {
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
                    setExamNo(result.examno)
                    setExamNoShow(result.examid)
                    setsubid(result.subid)
                    fetch(variables.API_URL+"subject/detail/"+result.subid+"/", {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            setsubjectname(result.subjectname)
                            
                        }
                    )
                }
            )
        }catch (err) {
            setStartError(1);
        }
    };
    if(Start === 0){
        fetchDataStart();
        setStart(1);
    }

    const onDrop = useCallback((acceptedFiles) => {
        console.log("OnDrop");
        console.log(acceptedFiles);
        console.log(acceptedFiles[0].type);
        if(acceptedFiles[0].type === "text/csv"){
            handleFileInputChange(acceptedFiles[0]);
        }else{
            console.log("รองรับเฉพาะไฟล์ .csv");
            Swal.fire({
                title: "",
                text: `รองรับเฉพาะไฟล์ .CSV`,
                icon: "error",//error,question,warning,success
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
            }).then((result) => {
            });
        }
       
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: false,
    })

    const handleFileInputChange = (e) => {
        const file = e;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
        }

        setStatusItem(true);
        setNameFileUpload(file.path);

    }
    async function handleSubmitFile(e) {
        e.preventDefault();
        if (File !== '') {
            Swal.fire({
                title: "",
                text: `กดยืนยันเพื่อทำการอัปโหลดรายชื่อนักศึกษา`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
                cancelButtonColor: "#d33",
                cancelButtonText: "ยกเลิก"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setNameFileUpload('');
                    setFile('');
                    setStatusItem(false);
                    console.log("File", File);
                    try {
                        const response = await fetch(variables.API_URL + "/exam/upload/csv/", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            body: JSON.stringify({
                               
                            }),
                        });
    
                        // const result = await response.json();

                        if (response.ok) {
                            Swal.fire({
                                title: "",
                                text: "อัปโหลดรายชื่อนักศึกษาเสร็จสิ้น",
                                icon: "success",
                                confirmButtonColor: "#341699",
                                confirmButtonText: "ยืนยัน",
                            });
                        } else {}
                    } catch (err) {
                        Swal.fire({
                            title: "",
                            text: "เกิดข้อผิดพลาดในการอัปโหลด",
                            icon: "error",
                            confirmButtonColor: "#341699",
                            confirmButtonText: "ยืนยัน",
                        });
                    }
                }
            });
        } else {
            console.log("กรุณาอัปโหลดไฟล์");
            Swal.fire({
                title: "",
                text: `กรุณาอัปโหลดไฟล์`,
                icon: "warning",//error,question,warning,success
                confirmButtonColor: "#341699",
                confirmButtonText: "ตกลง",
            }).then((result) => {
            });
        }
    }

    const handleDelFileUpload = (e) => {
        Swal.fire({
            title: "",
            text: `คุณต้องการลบไฟล์ออกใช่หรือไม่`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#341699",
            confirmButtonText: "ยืนยัน",
            cancelButtonColor: "#d33",
            cancelButtonText:"ยกเลิก"
        }).then((result) => {
        if (result.isConfirmed) {
            setNameFileUpload('');
            setFile('');
            setStatusItem(false);
        }
        });
    }
  
    const handleDownload = () => {
        const filePath = '/csv/UploadStudent.csv';
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.download = 'UploadStudent.csv';
        link.click();
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
                            <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">รายวิชาทั้งหมด</Link> / <Link to={"/Subject/SubjectNo/"+subid}> {subjectname} </Link> / <Link to={"/Subject/SubjectNo/Exam/"+ExamNoShow}> การสอบครั้งที่ {ExamNo} </Link></p>
                            <div className='bx-grid-topic'>
                                <h2>อัปโหลดรายชื่อนักศึกษา</h2>
                                
                            </div> 
                        </div>
                        <div className='bx-details light'>
                            <div className="mw300px">
                                <div className="flex-end">
                                   
                                    <div className="bx-button">
                                        <div className="button-download" onClick={handleDownload}>
                                            ตัวอย่างไฟล์ CSV
                                        </div>
                                    </div>
                                </div>
                                <div className="dropzone">
                                    <div className="dz-box"{...getRootProps()}>
                                        <input className="test" {...getInputProps()} />
                                        <div className="dz-icon blue-font"><FontAwesomeIcon icon={faCloudArrowUp} /></div>
                                        { isDragActive ?
                                                <div>วางไฟล์ที่นี่ ...</div>:
                                                <div>ลากไฟล์มาที่นี่หรืออัปโหลด<p className="">รองรับ .CSV</p></div>  
                                        }
                                    </div>
                                </div>
                                {
                                    statusitem?
                                    <div className="box-item-name-trash space-between">
                                        <div>{namefileupload}</div>
                                        <div onClick={handleDelFileUpload} className="icon-Trash danger-font"><FontAwesomeIcon icon={faTrashCan} /></div>
                                    </div>
                                    :
                                    ''
                                }
                                <form className="flex-end" onSubmit={handleSubmitFile}>
                                    <div className='bx-button' >
                                        <button type="submit"  className='button-submit'>บันทึก</button>
                                    </div>
                                </form >
                            </div>
                            <div>แสดงรายชื่อนักศึกษา</div>
                            <div className="tableSub">
                                <table>
                                    <thead>
                                        <tr >
                                            <th >รหัสนักศึกษา</th>
                                            <th >ชื่อ</th>
                                            <th >นามสกุล</th>
                                            <th >กลุ่มเรียน</th>
                                            <th >อีเมล์</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        <tr>
                                            <td>64015142</td>
                                            <td>ศุภมิตร</td>
                                            <td>เทียนศิริ</td>
                                            <td>1</td>
                                            <td>64015142@kmitl.ac.th</td>
                                        
                                        </tr>
                                        <tr>
                                            <td>64015161</td>
                                            <td>อนุวัต</td>
                                            <td>สะอุบล</td>
                                            <td>53</td>
                                            <td>tode@kmitl.ac.th</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    </div>

    );

}

export default AppUploadStudent;