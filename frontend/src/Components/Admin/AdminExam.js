import {
    Link
} from "react-router-dom";
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

function AppAdminExam(){
    const { id } = useParams();
    const [NameExam, setNameExam] = useState('');
    const [ExamNo, setExamNo] = useState('');
    const [ExamNoShow, setExamNoShow] = useState('');
    const [NumExam, setNumExam] = useState(40);
    const [SetExam, setSetExam] = useState(1);
    const [sequencesteps, setsequencesteps] = useState(1);
    const [subid, setsubid] = useState('');
    const [subjectname, setsubjectname] = useState('');
    const [std_csv_path, setstd_csv_path] = useState('');
    
    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const [data, setdata] = useState([]);

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
                    setdata(result)
                }
            )
        }catch (err) {
            setdata([])
        }
         
     };
    const fetchDataExam = async () => {
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
                    setNameExam(result.examname)
                    setExamNo(result.examno)
                    setExamNoShow(result.examid)
                    setNumExam(result.numberofexams)
                    setSetExam(result.numberofexamsets)
                    setsequencesteps(result.sequencesteps)
                    setsubid(result.subid)
                    setstd_csv_path(result.std_csv_path)
                    fetch(variables.API_URL+"subject/detail/"+result.subid+"/", {
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
                            }else{
                                setsubjectname(result.subjectname)
                                // setStartError(2);
                            }
                        }
                    )
                }
            )
        }catch (err) {
            setStartError(1);
        }
    };

    if(Start === 0){
        fetchDataExamAnswer();
        fetchDataExam();
        setStart(1);
        setTimeout(function() {
            if(StartError !== 1){
                setStartError(2);
            }
            
        }, 800);
    }

    useEffect(() => {
        const intervalId = setInterval(() => fetchDataExam(), 30000);
        return () => clearInterval(intervalId);
    }, [fetchDataExam]);

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
                        <p><Link to="Admin/AdminSubject">จัดการรายวิชา</Link> / <Link to="/Admin/AdminSubject">รายวิชาทั้งหมด</Link> / <Link to={"/Admin/AdminSubject/SubjectExam/"+subid}>{subjectname}</Link> /  การสอบครั้งที่ {ExamNo}</p>
                        <div className='bx-grid2-topic'>
                            <h2>การสอบครั้งที่ {ExamNo}</h2>                           
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <div className="bx-grid-detail-topic">
                            <div className="bx-details-items">
                                <div className="bx-bx-topic">
                                    ข้อมูลการสอบ
                                </div>
                                <div className="bx-bx-details">
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">การสอบครั้งที่ : {ExamNo}</p></div>
                                    <div className="bx-details-box inline-grid "><p className="text-overflow">ชื่อการสอบ : {NameExam}</p></div>
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">จำนวนข้อสอบ : {NumExam}</p></div>
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">จำนวนชุดข้อสอบ : {SetExam}</p></div>
                                </div>
                            </div> 
                        </div>
                        <div className="space10"></div>
                        <div className="fb">ขั้นตอนการประมวลผล</div>
                        <div className="bx-step-content">
                            <div className={sequencesteps >= 6 ? "bx-show":"bx-show wait" }>
                                <Link to={"/Admin/AdminSubject/SubjectExam/Exam/ScoreResults/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            {/* <span className="fb num-stap">6</span> */}
                                            {sequencesteps >= 6 ?<FontAwesomeIcon icon={faCircleCheck} className="icon-success" />:''}
                                            <img src='/img/step6.png' alt=''/>
                                            <p>ผลลัพธ์คะแนน</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={sequencesteps >= 6 ? "bx-show":"bx-show wait" }>
                                <Link to={"/Admin/AdminSubject/SubjectExam/Exam/AnalyzeResults/"+id}>
                                    <div className="box">
                                        <div className="box-img">
                                            {/* <span className="fb num-stap">7</span> */}
                                            {sequencesteps >= 6 ?<FontAwesomeIcon icon={faCircleCheck} className="icon-success" />:''}
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

export default AppAdminExam;