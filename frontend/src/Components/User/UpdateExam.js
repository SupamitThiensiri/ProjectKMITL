import {
    Link
} from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";


function AppUpdateExam(){

    const [NameExam, setNameExam] = useState('xxxxxxx');
    const [ExamNo, setExamNo] = useState('x');
    const [NumExam, setNumExam] = useState('x');
    const [SetExam, setSetExam] = useState('x');

    const handleInputNameExam = (e) => { setNameExam(e.target.value); };
    const handleInputExamNo = (e) => {setExamNo(e.target.value);};
    const handleInputNumExam = (e) => { setNumExam(e.target.value); };
    const handleInputSetExam = (e) => {setSetExam(e.target.value);};

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('NameExam:', NameExam);
        console.log('ExamNo:', ExamNo);
        console.log('NumExam:', NumExam);
        console.log('SetExam:', SetExam);
    };

    return(
        <div className='content'>
            <main>
                <div className='box-content'>
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                            <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">รายวิชาทั้งหมด</Link> / แก้ไขการสอบ</p>
                            <h2>แก้ไขการสอบ</h2>  
                        </div>
                        <div className='bx-details light'>
                            <form onSubmit={handleSubmit}>
                                <div className="bx-input-fix">
                                    <label htmlFor="NameExam">ชื่อการสอบ</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="NameExam"
                                        name="NameExam"
                                        value={NameExam}
                                        onChange={handleInputNameExam}
                                        placeholder="ชื่อการสอบ"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="ExamNo">การสอบครั้งที่</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="ExamNo"
                                        name="ExamNo"
                                        value={ExamNo}
                                        onChange={handleInputExamNo}
                                        placeholder="การสอบครั้งที่"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="setNumExam">จำนวนข้อสอบ</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="setNumExam"
                                        name="setNumExam"
                                        value={NumExam}
                                        onChange={handleInputNumExam}
                                        placeholder="จำนวนข้อสอบ"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="SetExam">จำนวนชุดข้อสอบ</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="SetExam"
                                        name="SetExam"
                                        value={SetExam}
                                        onChange={handleInputSetExam}
                                        placeholder="จำนวนชุดข้อสอบ"
                                    />
                                </div>

                                <div className='bx-button'>
                                    <button type="reset" className='button-cancel'>รีเซ็ท</button>
                                    <button type="submit"  className='button-submit'>บันทึก</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default AppUpdateExam;