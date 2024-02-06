import {
    Link
} from "react-router-dom";
import React, { useState,useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { SRLWrapper } from 'simple-react-lightbox';

function AppUploadAnswerSheet(){

    const [File, setFile] = useState([]); // สำหรับเก็บไฟล์
    const [statusitem, setStatusItem] = useState(false); // สำหรับเปิด box แสดงชื่อไฟล์และลบลบไฟล์ box item
    const [namefileupload, setNameFileUpload] = useState(''); // สำหรับชื่อไฟล์อัปโหลด

    const onDrop = useCallback((acceptedFiles) => {
        setFile([])
        setNameFileUpload('')
        const imageFiles = acceptedFiles.filter(file => (
            file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"
        ));

        if (imageFiles.length > 0) {
            handleFileInputChange(imageFiles);
        }else{
            Swal.fire({
                title: "",
                text: `รองรับเฉพาะไฟล์ .PNG .JPG และ .JPGE`,
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
        multiple: true,
    })

    const handleFileInputChange = (files) => {
        setFile([])
        setNameFileUpload('')
        const fileArray = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFile(prevFiles => [...prevFiles, reader.result]);
            }
            return file;
        });
        setStatusItem(true);
        setNameFileUpload(fileArray.map(file => file.name));
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
       if (File.length > 0) {
            console.log(File)
            for (let i = 0; i < File.length; i++) {
                console.log("File : ",i," : ",File[i])
            }
            Swal.fire({
                title: "",
                text: `กดยืนยันเพื่อจะทำการประมวลผลกระดาษคำตอบ`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
                cancelButtonColor: "#d33",
                cancelButtonText:"ยกเลิก"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "",
                text: "สร้างกระดาษคำตอบเสร็จสิ้น",
                icon: "success",
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
                });
            }
            });
        }else{
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

    const handleDelFileUpload = (indexitem) => {
        setNameFileUpload(namefileupload.filter((_, index) => index !== indexitem))
        setFile(File.filter((_, index) => index !== indexitem))
        console.log(File)
        console.log(namefileupload)
        console.log(indexitem)
        
        // const updatedFiles = [...File];
        // updatedFiles.splice(index, 1);
        // setFile(updatedFiles);
        // console.log(File)
        // if (updatedFiles.length === 0) {
        //     setNameFileUpload('');
        //     setStatusItem(false);
        // } else {
        //     setNameFileUpload(updatedFiles.map(file => file.name).join(', '));
        // }
        // Swal.fire({
        //     title: "",
        //     text: `คุณต้องการลบไฟล์ออกใช่หรือไม่`,
        //     icon: "question",
        //     showCancelButton: true,
        //     confirmButtonColor: "#341699",
        //     confirmButtonText: "ยืนยัน",
        //     cancelButtonColor: "#d33",
        //     cancelButtonText:"ยกเลิก"
        // }).then((result) => {
        // if (result.isConfirmed) {
        //     setNameFileUpload('');
        //     setFile('');
        //     setStatusItem(false);
        //     console.log("File",File);
        // }
        // });
    }
    
    const options = {}

    return(
        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / รายวิชาทั้งหมด</p>
                        <div className='bx-grid2-topic'>
                            <h2>อัปโหลดกระดาษคำตอบ</h2>
                           
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <div>รูปแบบฟอร์มกระดาษคำตอบ</div>
                       
                        
                        <div className="gtc2-CAS">
                            <div className="jc-center">
                                <div className="mw300px fit-content">
                                    <div className="dropzone">
                                        <div className="dz-box"{...getRootProps()}>
                                            <input className="test" {...getInputProps()} />
                                            <div className="dz-icon blue-font"><FontAwesomeIcon icon={faCloudArrowUp} /></div>
                                            { isDragActive ?
                                                    <div>วางไฟล์ที่นี่ ...</div>:
                                                    <div>ลากไฟล์มาที่นี่หรืออัปโหลด<p className="">รองรับ .PNG .JPG และ JPEG</p></div>  
                                            }
                                        </div>
                                    </div>
                                    
                                    {
                                        // statusitem?
                                        // <div>
                                        //     {/* <div className="box-item-name-trash space-between">
                                        //         <div>{namefileupload}</div>
                                        //         <div onClick={handleDelFileUpload} className="icon-Trash danger-font"><FontAwesomeIcon icon={faTrashCan} /></div>
                                        //     </div> */}
                                            
                                        //     {File.map((file, index) => (
                                        //         <div className="box-item-name-trash space-between">
                                        //             <div>{namefileupload[index]}{console.log("index :",index)}</div>
                                        //             {/* <div key={index} onClick={() => handleDelFileUpload(index)} className="icon-Trash danger-font">
                                        //                 <FontAwesomeIcon icon={faTrashCan} />
                                        //             </div> */}
                                        //         </div>
                                                
                                        //     ))}
                                            
                                        // </div>
                                        // :
                                        // ''
                                        statusitem ? (
                                            <div>
                                                <div className="space10"></div>
                                                <div className="ovf-auto">
                                                    <div className="ovfy-auto-h200">
                                                    {File.map((file, index) => (
                                                        <div key={index} className="box-item-name-trash space-between">
                                                            <div>{namefileupload[index]}</div>
                                                            <div onClick={() => handleDelFileUpload(index)} className="icon-Trash danger-font">
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ''
                                    }
                                    <form className="flex-end" onSubmit={handleSubmitFile}>
                                        <div className='bx-button' >
                                            <button type="submit"  className='button-submit'>บันทึก</button>
                                        </div>
                                    </form >
                                </div>
                            </div>
                            <div className="TB">
                                <div className="TB-box">
                                    <h3>แสดงตัวอย่างรูปแบบฟอร์มกระดาษคำตอบ</h3>
                                    <SRLWrapper options={options}>
                                    {File === ''? 
                                        <div className="container">
                                        {File.map(index => (
                                            <div key={index} className="image-card">
                                                <a href={index}>
                                                    <img className="image" src={index} alt="" />
                                                </a>
                                            </div>
                                        ))}
                                        </div>
                                    :
                                    <div className="container">
                                        <div key={1} className="image-card">
                                                <a href="/img/answersheet_eng.jpg">
                                                    <img className="image" src="/img/answersheet_eng.jpg" alt="" />
                                                </a>
                                        </div>
                                    </div>
                                    }
                                    </SRLWrapper> 
                                </div>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );

}

export default AppUploadAnswerSheet;