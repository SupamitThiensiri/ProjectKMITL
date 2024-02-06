import {
    Link
} from "react-router-dom";
import React, { useState,useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { SRLWrapper } from 'simple-react-lightbox';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import Cookies from 'js-cookie';
function AppCreateAnswerSheet(){
    const { id } = useParams();

    const [ExamNo, setExamNo] = useState('');
    const [ExamNoShow, setExamNoShow] = useState('');
    const [subid, setsubid] = useState('');
    const [subjectname, setsubjectname] = useState('');
    const [imganswersheetformat_path, setimganswersheetformat_path] = useState('');
    
    const [File, setFile] = useState(''); // สำหรับเก็บไฟล์
    const [statusitem, setStatusItem] = useState(false); // สำหรับเปิด box แสดงชื่อไฟล์และลบลบไฟล์ box item
    const [namefileupload, setNameFileUpload] = useState(''); // สำหรับชื่อไฟล์อัปโหลด
    const [selectedOption, setSelectedOption] = useState('1');
    const [isChecked, setChecked] = useState(false);

    const handleOptionChange = (event) => {setSelectedOption(event.target.value);console.log(selectedOption)};
    const handleCheckboxChange = () => {setChecked(!isChecked);};
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
                    console.log(result)
                    setExamNo(result.examno)
                    setExamNoShow(result.examid)
                    setimganswersheetformat_path(result.imganswersheetformat_path)
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
        if(acceptedFiles[0].type === "image/png" ||acceptedFiles[0].type === "image/jpeg" ||acceptedFiles[0].type === "image/jpg"){
            handleFileInputChange(acceptedFiles[0]);
        }else{
            console.log("รองรับเฉพาะไฟล์ .PNG .JPG และ .JPGE");
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
        if ((File !== '' && isChecked === true) || isChecked === false) {
            Swal.fire({
                title: "",
                text: `กดยืนยันเพื่อทำการสร้างกระดาษคำตอบ`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
                cancelButtonColor: "#d33",
                cancelButtonText: "ยกเลิก"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(variables.API_URL + "exam/update/" + id + "/", {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            body: JSON.stringify({
                                answersheetformat:selectedOption,
                                statusexam:"2",
                                userid : Cookies.get('userid')
                            }),
                        });
    
                        const result = await response.json();
    
                        if (response.ok) {
                            fetchDataStart()
                            Swal.fire({
                                title: "",
                                text: "สร้างกระดาษคำตอบเสร็จสิ้น",
                                icon: "success",
                                confirmButtonColor: "#341699",
                                confirmButtonText: "ยืนยัน",  
                            });
                        } else {
                            Swal.fire({
                                title: "เกิดข้อผิดพลาด" + result.msg,
                                icon: "error", //error,question,warning,success
                                confirmButtonColor: "#341699",
                            });
                        }
                    } catch (err) {
                        Swal.fire({
                            title: "เกิดข้อผิดพลาด" + err,
                            icon: "error", //error,question,warning,success
                            confirmButtonColor: "#341699",
                        });
                        console.error(err);
                    }
    
                }
            });
        } else {
            console.log("กรุณาอัปโหลดไฟล์");
            Swal.fire({
                title: "",
                text: `กรุณาอัปโหลดไฟล์`,
                icon: "warning", //error,question,warning,success
                confirmButtonColor: "#341699",
                confirmButtonText: "ตกลง",
            }).then((result) => {});
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
            console.log("File",File);
        }
        });
    }

    const images= [
        { id: '1', imageName: imganswersheetformat_path, tag: 'free' }, // 1170 827
    ]
    const options = {}
    const [filteredImages] = useState(images);


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
                            <div className='bx-grid2-topic'>
                                <h2>สร้างกระดาษคำตอบ</h2>
                                <div className="flex-end"><p className="button-submit">ดาวโหลด</p></div>
                            </div> 
                        </div>
                        <div className='bx-details light'>
                            <div>รูปแบบฟอร์มกระดาษคำตอบ</div>
                            <div className="gtc2-CAS">
                                <div className="jc-center">
                                    <div className="mw300px fit-content">
                                        <div>
                                            <div className="bx-input-fix pl20">
                                                <span className="flex">
                                                    <input className="mgR10" type="radio" name="option" value="1" checked={selectedOption === '1'} onChange={handleOptionChange}/>123 กระดาษคำตอบแบบ 1, 2, 3, ...
                                                </span>
                                            </div>
                                            <div className="bx-input-fix pl20">
                                                <span className="flex">
                                                    <input className="mgR10" type="radio" name="option" value="2" checked={selectedOption === '2'} onChange={handleOptionChange}/>ABC กระดาษคำตอบแบบ A, B, C, ...
                                                </span>
                                            </div>
                                            <div className="bx-input-fix pl20">
                                                <span className="flex">
                                                    <input className="mgR10" type="radio" name="option" value="3" checked={selectedOption === '3'} onChange={handleOptionChange}/>กขค กระดาษคำตอบแบบ ก, ข, ค, ...
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bx-input-fix">
                                            <span className="flex"><input className="mgR10" value = "Tree" type = "checkbox" checked={isChecked} onChange = {handleCheckboxChange} /> เพิ่มรูปโลโก้ <p className="fs10 flexJACenter">&nbsp;(ขนาดรูปภาพที่แนะนำ 480 x 280 Pixels)</p> </span>
                                        </div>
                                        <div className={isChecked ? "dropzone":"dropzone wait"}>
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
                                </div>
                                <div className="TB">
                                    <div className="TB-box">
                                        <h3>แสดงตัวอย่างรูปแบบฟอร์มกระดาษคำตอบ</h3>
                                        <SRLWrapper options={options}>
                                            <div className="container">
                                                {filteredImages.map(image => (
                                                    <div key={image.id} className="image-card">
                                                        <a href={`${image.imageName}`}>
                                                            <img className="image" src={`${image.imageName}`} alt="" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </SRLWrapper> 
                                    </div>
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

export default AppCreateAnswerSheet;