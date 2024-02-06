import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

function AppShowQuestionnaire(){
   

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Questionnaire">จัดการแบบสอบถาม</Link> / แบบสอบถามทั้งหมด</p>
                        <div className='bx-grid2-topic'>
                            <h2>แบบสอบถามทั้งหมด</h2>
                            <div className='flex-end'>
                                <Link to="/CreateQuestionnaire">
                                    <p className='button-create'><FontAwesomeIcon icon={faSquarePlus} />สร้างแบบสอบถาม</p>
                                </Link>
                            </div>
                           
                        </div> 
                    </div>
                    <div className='bx-details light'> 
                   
                        
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppShowQuestionnaire;