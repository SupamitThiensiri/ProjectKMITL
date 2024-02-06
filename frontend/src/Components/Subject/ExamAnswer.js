import {
    Link
} from "react-router-dom";
import React, { useMemo } from 'react';
import TableExamAnswer from "../Tools/ToolTableExamAnswer";

function AppExamAnswer(){

    const columns = useMemo(
        () => [
            {
                Header: 'subid',
                accessor: 'subid', // Replace with your data key
            },
            {
                Header: 'ชุดข้อสอบ',
                accessor: 'subjectid', // Replace with your data key
            },
            {
                Header: 'จำนวนข้อสอบ',
                accessor: 'subname', // Replace with your data key
            },
            {
                Header: 'สร้างเฉลยโดย',
                accessor: '', // Replace with your data key
            },
            {
                Header: 'สถานะ',
                accessor: '', // Replace with your data key
            },
            // Add more columns as needed
        ],
        []
        );
    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject/SubjectNo/1"> SubjectNoxxxxxxx </Link> / <Link to="/Subject/SubjectNo/Exam/1"> Examxxxxxxx </Link> / <Link to=""> สร้างเฉลย </Link></p>
                        <div className='bx-grid2-topic'>
                            <h2>สร้างเฉลย</h2>                           
                        </div> 
                    </div>
                    <div className='bx-details light'>
                    <div className="bx-grid-detail-topic">
                        <div className="bx-details-items">
                            <div className="bx-bx-topic">
                                ข้อมูลการสอบ
                            </div>
                            <div className="bx-bx-details">
                                <div className="bx-details-box inline-grid"><p className="text-overflow">การสอบครั้งที่ : xxxxxxx</p></div>
                                <div className="bx-details-box inline-grid "><p className="text-overflow">ชื่อการสอบ : xxxxxxxxxxxxxxxxxxxxxx</p></div>
                                <div className="bx-details-box inline-grid"><p className="text-overflow">จำนวนข้อสอบ : xxxx</p></div>
                                <div className="bx-details-box inline-grid"><p className="text-overflow">จำนวนชุดข้อสอบ : xxxxxx</p></div>
                            </div>
                        </div> 
                    </div>
                        <div className="space10"></div>
                        <div className="fb">รูปแบบการสร้างเฉลยคำตอบ</div>
                        <div className="bx-step-content">
                            <div className="bx-show"><Link to=""><div className="box"><div className="box-img"><img src='/img/AnsScan.png' alt='' /><p className="grid">สแกนไฟล์เฉลย</p></div></div></Link></div>
                            <div className="bx-show"><Link to="/Subject/SubjectNo/Exam/ExamAnswer/CreateExamAnswer/1"><div className="box"><div className="box-img"><img src='/img/AnsCustomized.png' alt='' /><p className="grid">กำหนดเอง</p></div></div></Link></div>
                        </div>
                        <TableExamAnswer columns={columns}/>
                      
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppExamAnswer;