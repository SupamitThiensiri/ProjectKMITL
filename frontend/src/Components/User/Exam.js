import {
    Link
} from "react-router-dom";

function AppExam(){

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject/SubjectNo/1"> SubjectNoxxxxxxx </Link> / <Link to="/Subject/SubjectNo/Exam/1"> Examxxxxxxx </Link></p>
                        <div className='bx-grid2-topic'>
                            <h2>การสอบครั้งที่ 1</h2>                           
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
                        ลำดับขั้นตอนการทำงาน
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppExam;