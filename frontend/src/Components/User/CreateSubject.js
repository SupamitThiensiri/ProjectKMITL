import {
    Link
} from "react-router-dom";
import { useState } from 'react';

function AppCreateSubject(){

    const [SubjectID, setSubjectID] = useState('');
    const [SubName, setSubName] = useState('');
    const [Year, setYear] = useState('');
    const [Semester, setSemester] = useState('');

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
                            <p><Link to="/Subject">จัดการรายวิชา</Link> / สร้างรายวิชา</p>
                            <h2>สร้างรายวิชา</h2>  
                        </div>
                        <div className='bx-details light'>
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <div className="bx-input-fix">
                                        <label htmlFor="SubjectID" className="w100px">รหัสวิชา</label>
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
                                        <label htmlFor="SubName" className="w100px">ชื่อวิชา</label>
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
                                        <label htmlFor="Year" className="w100px">ปีการศึกษา</label>
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
                                    <label htmlFor="Semester" className="w100px">ภาคเรียน</label>
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
                                        <button type="reset" className='button-reset'>รีเซ็ท</button>
                                        <button type="submit"  className='button-submit'>บันทึก</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default AppCreateSubject;