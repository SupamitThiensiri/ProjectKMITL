import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

function AppSubjectNo(){

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">รายวิชาทั้งหมด</Link> / xxxxxxxxxxxx</p>
                        <div className='bx-grid2-topic'>
                            <h2>วิชา Computer</h2>
                        </div> 
                    </div>
                    <div className='bx-details light'>
                       
                        <div className="bx-grid2-detail-topic">
                            <div className="bx-details-items">
                                <div className="bx-bx-topic">
                                    ข้อมูลรายวิชา
                                </div>
                                <div className="bx-bx-details">
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">รหัสวิชา : xxxxxxx</p></div>
                                    <div className="bx-details-box inline-grid "><p className="text-overflow">วิชา : xxxxxxxxxxxxxxxxxxxxxx</p></div>
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">ปีการศึกษา : xxxx</p></div>
                                    <div className="bx-details-box inline-grid"><p className="text-overflow">ภาคเรียน : </p></div>
                                </div>
                            </div>
                            
                            <div className='bx-item-bottom'>
                                <Link to="/Subject/SubjectNo/CreateExam/1">
                                <p className='button-create'><FontAwesomeIcon icon={faSquarePlus} />สร้างการสอบ</p>
                                </Link>
                            </div>
                            
                        </div>
                        <Link to="/Subject/SubjectNo/Exam/1">table to Exam No</Link>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppSubjectNo;