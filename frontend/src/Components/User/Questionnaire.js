import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

function AppQuestionnaire(){

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
                        <Link to="#">table to Que</Link>
                        <div className="tableQue">
                            <table>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">หัวข้อ</th>
                                        <th colSpan="5">ความคิดเห็น</th>
                                    </tr>
                                    <tr>
                                        <th>5</th>
                                        <th>4</th>
                                        <th>3</th>
                                        <th>2</th>
                                        <th>1</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >1</td>
                                        <td className="w80px">2</td>
                                        <td className="w80px">3</td>
                                        <td className="w80px">4</td>
                                        <td className="w80px">5</td>
                                        <td className="w80px">6</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>6</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppQuestionnaire;