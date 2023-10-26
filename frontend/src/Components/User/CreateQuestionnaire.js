import {
    Link
} from "react-router-dom";
import { useState } from 'react';

function AppCreateQuestionnaire(){

    const [QueSheetName, setQueSheetName] = useState('');
    const [QueSheetTopicName, setQueSheetTopicName] = useState('');
    const [DetailsLineOne, setDetailsLineOne] = useState('');
    const [DetailsLinetwo, setDetailsLinetwo] = useState('');
    const [Explanation, setExplanation] = useState('');
    // const [Symbolposition, setSymbolposition] = useState('');

    const handleInputQueSheetName = (e) => { setQueSheetName(e.target.value); };
    const handleInputQueSheetTopicName = (e) => {setQueSheetTopicName(e.target.value);};
    const handleInputDetailsLineOne = (e) => { setDetailsLineOne(e.target.value); };
    const handleInputDetailsLinetwo = (e) => {setDetailsLinetwo(e.target.value);};
    const handleInputExplanation = (e) => {setExplanation(e.target.value);};
    // const handleInputSymbolposition = (e) => {setSymbolposition(e.target.value);};

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('QueSheetName:', QueSheetName);
        console.log('QueSheetTopicName:', QueSheetTopicName);
        console.log('DetailsLineOne:', DetailsLineOne);
        console.log('DetailsLinetwo:', DetailsLinetwo);
        console.log('Explanation:', Explanation);
        // console.log('Symbolposition:', Symbolposition);
    };

    // const handleNext = (e) => {
    //     e.preventDefault();
    // }
    return(
        <div className='content'>
            <main>
                <div className='box-content'>
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                            <p><Link to="/Questionnaire">จัดการแบบสอบถาม</Link> / สร้างแบบสอบถาม</p>
                            <h2>สร้างแบบสอบถาม</h2>  
                        </div>
                        <div className='bx-details light'>
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <p>กรอกรายละเอียดส่วนหัวแบบสอบถาม</p>
                                    <div className="bx-input-fix">
                                        <label htmlFor="QueSheetName" className="w150px">ชื่อแบบสอบถาม</label>
                                        <input
                                            type="text"
                                            id="QueSheetName"
                                            name="QueSheetName"
                                            value={QueSheetName}
                                            onChange={handleInputQueSheetName}
                                            placeholder="กรอกชื่อแบบสอบถาม"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="QueSheetTopicName" className="w150px">ชื่อหัวข้อแบบสอบถาม</label>
                                        <input
                                            type="text"
                                            id="QueSheetTopicName"
                                            name="QueSheetTopicName"
                                            value={QueSheetTopicName}
                                            onChange={handleInputQueSheetTopicName}
                                            placeholder="กรอกชื่อหัวข้อแบบสอบถาม"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="DetailsLineOne" className="w150px">รายละเอียดบรรทัดที่ 1</label>
                                        <input
                                            type="text"
                                            id="DetailsLineOne"
                                            name="DetailsLineOne"
                                            value={DetailsLineOne}
                                            onChange={handleInputDetailsLineOne}
                                            placeholder="กรอกรายละเอียดบรรทัดที่ 1"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                    <label htmlFor="DetailsLinetwo" className="w150px">รายละเอียดบรรทัดที่ 2</label>
                                        <input
                                            type="text"
                                            id="DetailsLinetwo"
                                            name="DetailsLinetwo"
                                            value={DetailsLinetwo}
                                            onChange={handleInputDetailsLinetwo}
                                            placeholder="กรอกรายละเอียดบรรทัดที่ 2"
                                        />
                                    </div>

                                    <div className="bx-input-fix">
                                    <label htmlFor="Explanation" className="w150px">คำชี้แจง</label>
                                        <input
                                            type="text"
                                            id="Explanation"
                                            name="Explanation"
                                            value={Explanation}
                                            onChange={handleInputExplanation}
                                            placeholder="กรอกคำชี้แจง"
                                        />
                                    </div>

                                    <div className='bx-button'>
                                        <div className='button-reset'>รีเซ็ท</div>
                                        <div className='button-submit'>ถัดไป</div>
                                    </div>
                                </div>
                                <div>
                                    <p>ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม </p>
                                    
                                    <p>ส่วนที่ 2: ความคิดเห็นเกี่ยวกับแบบสอบถาม (5: มากที่สุด, 4: มาก, 3: ปานกลาง, 2: น้อย, 1: น้อยที่สุด, 0: ไม่ประเมิน)</p>
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
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default AppCreateQuestionnaire;