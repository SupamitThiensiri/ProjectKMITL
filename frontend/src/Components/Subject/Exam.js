import {
    Link
} from "react-router-dom";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";

function AppExam(){
    const { id } = useParams();
    const [NameExam, setNameExam] = useState('');
    const [ExamNo, setExamNo] = useState('');
    const [ExamNoShow, setExamNoShow] = useState('');
    const [NumExam, setNumExam] = useState(40);
    const [SetExam, setSetExam] = useState(1);
    const [statusexam, setstatusexam] = useState(1);
    const [subid, setsubid] = useState('');
    const [subjectname, setsubjectname] = useState('');
    
    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const fetchDataUpdateExam = async () => {
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
                    console.log(result)
                    if(result.err !== undefined){
                        setStartError(1);
                    }
                    setNameExam(result.examname)
                    setExamNo(result.examno)
                    setExamNoShow(result.examid)
                    setNumExam(result.numberofexams)
                    setSetExam(result.numberofexamsets)
                    setstatusexam(result.statusexam)
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
            // console.error(err)
            setStartError(1);
        }
    };

    if(Start === 0){
        fetchDataUpdateExam();
        setStart(1);
    }
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
                            <div className="fb">ขั้นตอนเตรียมการก่อนการประมวลผล</div>
                            <div className="bx-step-content">
                                <div className={statusexam ? "bx-show":"bx-show wait" }><Link to={"/Subject/SubjectNo/Exam/UploadStudent/"+id}><div className="box"><div className="box-img"><img src='/img/step1.png' alt=''/><p>อัปโหลดรายชื่อ</p></div></div></Link></div>
                                <div className={statusexam ? "bx-show":"bx-show wait" }><Link to={"/Subject/SubjectNo/Exam/CreateAnswerSheet/"+id}><div className="box"><div className="box-img"><img src='/img/step2.png' alt=''/><p>เลือกรูปแบบกระดาษ</p></div></div></Link></div>
                                <div className={statusexam >= 2 ? "bx-show":"bx-show wait" }><Link to={"/Subject/SubjectNo/Exam/ExamAnswer/"+id}><div className="box"><div className="box-img"><img src='/img/step3.png' alt=''/><p>สร้างเฉลย</p></div></div></Link></div>
                                <div className={statusexam >= 3 ? "bx-show":"bx-show wait" }><Link to={"/Subject/SubjectNo/Exam/UploadAnswerSheet/"+id}><div className="box"><div className="box-img"><img src='/img/step4.png' alt=''/><p>อัปโหลดกระดาษคำตอบ</p></div></div></Link></div>
                            </div>
                            <div className="fb">ขั้นตอนการประมวลผล</div>
                            <div className="bx-step-content">
                                <div className={statusexam >= 4 ? "bx-show":"bx-show wait" }><Link to={"/Subject/SubjectNo/Exam/CheckAnswerSheet/"+id}><div className="box"><div className="box-img"><img src='/img/default_image.png' alt=''/><p>ประมวลผล</p></div></div></Link></div>
                                <div className={statusexam >= 5 ? "bx-show":"bx-show wait" }><Link to=""><div className="box"><div className="box-img"><img src='/img/step6.png' alt=''/><p>ผลลัพธ์คะแนน</p></div></div></Link></div>
                                <div className={statusexam >= 5 ? "bx-show":"bx-show wait" }><Link to=""><div className="box"><div className="box-img"><img src='/img/step7.png' alt=''/><p>วิเคราะห์ผล</p></div></div></Link></div>
                                
                            </div>
                            
                        </div>
                    </div>
                }
            </div>
        </main>
    </div>

    );

}

export default AppExam;