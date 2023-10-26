import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

function AppSubject(){

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / รายวิชาทั้งหมด</p>
                        <div className='bx-grid2-topic'>
                            <h2>รายวิชาทั้งหมด</h2>
                            <div className='flex-end'>
                                <Link to="/CreateSubject">
                                    <p className='button-create'><FontAwesomeIcon icon={faSquarePlus} />สร้างรายวิชา</p>
                                </Link>
                            </div>
                           
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <Link to="/Subject/SubjectNo/1">table to Subject No</Link>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppSubject;