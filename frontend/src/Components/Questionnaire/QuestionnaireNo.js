import {
    Link
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import Swal from 'sweetalert2'
function AppQuestionnaireNo(){
    const { id } = useParams();
    const [sequencesteps, setsequencesteps] = useState(1);
 
    const [QueSheetName, setQueSheetName] = useState('');
    const [imgquesheet_path, setimgquesheet_path] = useState('');  

    const [URLOnline, setURLOnline] = useState(window.location.host+"/OnlineQuestionnaire/"+id);

    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const fetchDataquesheet = async () => {
        try{
            fetch(variables.API_URL+"quesheet/detail/"+id+"/", {
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
                    setQueSheetName(result.quesheetname)
                    setimgquesheet_path(result.imgquesheet_path)
                }
            )
            fetch(variables.API_URL+"queheaddetails/detail/"+id+"/", {
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
                }
            )
            fetch(variables.API_URL+"quetopicdetails/detail/"+id+"/", {
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
                }
            )
            
        }catch (err) {
            console.error(err)
            setStartError(1);
           
        }
    };
    if(Start === 0){
        fetchDataquesheet();
        setStart(1);
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(URLOnline)
          .then(() => {
            Swal.fire({
                title: "",
                text: URLOnline+"\n คัดลอก link สำหรับทำแบบสอบถามออนไลน์แล้ว สามารถส่ง link ไปให้ผู้ใช้เพื่อทำแบบสอบถามออนไลน์ได้",
                icon: "success",
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",  
            }).then((result) => {
            });
        })
          .catch((error) => {
            Swal.fire('เกิดข้อผิดพลาด');
        });
    }

    const handleDownload = () => {
        const filePath = imgquesheet_path;
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.target = "_blank";
        link.download = {QueSheetName};
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        setTimeout(() => {
            if(StartError !== 1){
                setStartError(2);
            }
        }, 500); 
    }, []);

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
            {StartError === 0 || StartError === 1 ? 
                    StartError === 0 ? 
                        <div className='box-content-view'>
                            <div className='bx-topic light '>
                                <div className='skeleton-loading'>
                                    <div className='skeleton-loading-topic'></div>
                                </div> 
                            </div>
                            <div className='bx-details light '>
                                <div className='skeleton-loading'>
                                    <div className='skeleton-loading-content'></div>
                                </div> 
                            </div>
                        </div>
                    :
                        <div className='box-content-view'>
                            <div className='bx-topic light'>เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง</div>
                            <div className='bx-details light'><h2>Not Found</h2></div>
                        </div>
                :
                    null
                }
                <div className={StartError === 2 ?'box-content-view':'box-content-view none'}>
                    <div className='bx-topic light'>
                        <p><Link to="/Questionnaire">จัดการแบบสอบถาม</Link> / <Link to={"/Questionnaire/"}>แบบสอบถามทั้งหมด</Link> / {QueSheetName}</p>
                        <div className='bx-grid-topic'>
                            <h2>แบบสอบถาม</h2>  
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <div className="bx-grid-detail-topic">
                            <div className="bx-details-items-small">
                                <div className="bx-bx-topic">
                                    ข้อมูลแบบสอบถาม
                                </div>
                                <div className="bx-bx-details">
                                    <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">ชื่อแบบสอบถาม : {QueSheetName}</p></div>
                                    </div>
                                    {/* <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">ชื่อหัวข้อแบบสอบถาม : {QueSheetTopicName}</p></div>
                                    </div>
                                    <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">รายละเอียดบรรทัดที่ 1 : {DetailsLineOne}</p></div>
                                    </div>
                                    <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">รายละเอียดบรรทัดที่ 2 : {DetailsLinetwo}</p></div>
                                    </div>
                                    <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">คำชี้แจง : {Explanation}</p></div>
                                    </div> */}
                                    {/* <div className="bx-bx-details">
                                        <div className="bx-details-box-small inline-grid"><p className="text-overflow">แบบสอบถามออนไลน์ :</p></div>
                                    </div> */}
                                    <div className="bx-bx-details flexCenter">
                                        <div className="button-submit center w200px" onClick={handleCopyClick}>URL แบบสอบถามออนไลน์</div>
                                    </div>
                                    <div className="bx-bx-details flexCenter">
                                        <div className="button-submit center w200px" onClick={handleDownload}>ดาวโหลดแบบสอบถาม</div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="space10"></div>
                        <div className="fb">ขั้นตอนเตรียมการก่อนการประมวลผล</div>
                        <div className="bx-step-content">
                            {/* <div className={sequencesteps ? "bx-show":"bx-show wait" }><Link to={"/Questionnaire/QuestionnaireNo/ShowQuestionnaire/1"+id}><div className="box"><div className="box-img"><img src='/img/DownloadsQuz.png' alt=''/><p>กระดาษแบบสอบถาม</p></div></div></Link></div> */}

                            <div className={sequencesteps ? "bx-show":"bx-show wait" }>
                                <Link to={"/Questionnaire/QuestionnaireNo/ShowQuestionnaire/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            <img src='/img/QueStep1.png' alt=''/>
                                            <p>กระดาษแบบสอบถาม</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={sequencesteps ? "bx-show":"bx-show wait" }>
                                <Link to={"/Questionnaire/QuestionnaireNo/SetDateTimeQuestionnaire/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            <img src='/img/QueStep2.png' alt=''/>
                                            <p>แบบสอบถามออนไลน์</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={sequencesteps ? "bx-show":"bx-show wait" }>
                                <Link to={"/Questionnaire/QuestionnaireNo/UploadQuestionnaire/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            <img src='/img/QueStep3.png' alt=''/>
                                            <p>อัปโหลดแบบสอบถาม</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="fb">ขั้นตอนการประมวลผล</div>
                        <div className="bx-step-content">
                            <div className={sequencesteps ? "bx-show":"bx-show wait" }>
                                <Link to={"/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            <img src='/img/step5.png' alt=''/>
                                            <p>ประมวลผล</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={sequencesteps ? "bx-show":"bx-show wait" }>
                                <Link to="">
                                    <div className="box">
                                        <div className="box-img">
                                            <img src='/img/step7.png' alt=''/>
                                            <p>วิเคราะห์ผล</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppQuestionnaireNo;