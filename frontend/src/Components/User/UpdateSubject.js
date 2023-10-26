import {
    Link
} from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function AppUpdateSubject(){

    const [SubjectID, setSubjectID] = useState('xxxxx');
    const [SubName, setSubName] = useState('xxxxx');
    const [Year, setYear] = useState('xxxx');
    const [Semester, setSemester] = useState('x');

    const handleInputSubjectID = (e) => { setSubjectID(e.target.value); };
    const handleInputSubName = (e) => {setSubName(e.target.value);};
    const handleInputYear = (e) => { setYear(e.target.value); };
    const handleInputSemester = (e) => {setSemester(e.target.value);};

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SubjectID:', SubjectID);
        console.log('SubName:', SubName);
        console.log('Year:', Year);
        console.log('Semester:', Semester);
    };

    return(
        <div className='content'>
            <main>
                <div className='box-content'>
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                            <p><Link to="/Subject">จัดการรายวิชา</Link>/ แก้ไขรายวิชา</p>
                            <h2>แก้ไขรายวิชา</h2>  
                        </div>
                        <div className='bx-details light'>
                            <form onSubmit={handleSubmit}>
                                <div className="bx-input-fix">
                                    <label className="w100px" htmlFor="SubjectID">รหัสวิชา</label>
                                    <input
                                        type="text"
                                        id="SubjectID"
                                        name="SubjectID"
                                        value={SubjectID}
                                        onChange={handleInputSubjectID}
                                        placeholder="กรอกรายวิชา"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label className="w100px" htmlFor="SubName">ชื่อวิชา</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="SubName"
                                        name="SubName"
                                        value={SubName}
                                        onChange={handleInputSubName}
                                        placeholder="กรอกรหัสวิชา"
                                    />
                                    
                                </div>
                                <div className="bx-input-fix">
                                    <label className="w100px" htmlFor="Year">ปีการศึกษา</label>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <input
                                        type="text"
                                        id="Year"
                                        name="Year"
                                        value={Year}
                                        onChange={handleInputYear}
                                        placeholder="กรอกปีการศึกษา"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                <label className="w100px" htmlFor="Semester">ภาคเรียน</label>
                                    <input
                                        type="text"
                                        id="Semester"
                                        name="Semester"
                                        value={Semester}
                                        onChange={handleInputSemester}
                                        placeholder="กรอกภาคเรียน"
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

export default AppUpdateSubject;