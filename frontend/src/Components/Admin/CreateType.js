
import { useState, useEffect } from 'react';
import {variables} from "../../Variables";
import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen} from "@fortawesome/free-solid-svg-icons";


function AppCreateType(){
    const [DataType, setDataType] = useState([]);

    const [typesname, setTypesName] = useState("");
    const [limitsubject, setLimitSubject] = useState("");
    const [limitexam, setLimitExam] = useState("");
    const [limitque, setLimitQue] = useState("");

    const handleTypesName = (e) => { setTypesName(e.target.value); };
    const handleLimitSubject = (e) => { setLimitSubject(e.target.value); };
    const handleLimitExam = (e) => { setLimitExam(e.target.value); };
    const handleLimitQue = (e) => { setLimitQue(e.target.value); };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(variables.API_URL + "type/create/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    typesname: typesname,
                    limitsubject: limitsubject,
                    limitexam: limitexam,
                    limitque: limitque,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle success case
                console.log('Type created successfully:', result);
                fetchDataType();
            } else {
                // Handle error case
                console.error('Failed to create Type:', result.msg || response.statusText);
            }
        } catch (err) {
            console.error('Error submitting data:', err);
        }
    }

    const fetchDataType = async () => {
        try{
            fetch(variables.API_URL+"type/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setDataType(result);
                }
            )
        }catch (err) {
            console.error('ไม่พบข้อมูล:', err);
            setDataType([]);
        }
        
    };

    useEffect(() => {
        fetchDataType();
    }, []);

    return (
        <div className='content'>
            <main>
                <div className='box-content'>
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                            <p>ประเภทผู้ใช้งาน</p>
                            <h2>ประเภทผู้ใช้งาน</h2>
                        </div>
                        <div className='bx-details light'>
                            <form onSubmit={handleSubmit}>
                                <div className="bx-input-fix">
                                    <label htmlFor="NameExam" className="w140px">ชื่อประเภทของผู้ใช้</label>
                                    <input className="mw300px"
                                        type="text"
                                        id="typesname"
                                        name="typesname"
                                        value={typesname}
                                        onChange={handleTypesName}
                                        placeholder="ชื่อประเภทของผู้ใช้"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="NameExam" className="w140px">จำนวนรายวิชา</label>
                                    <input className="mw300px"
                                        type="text"
                                        id="limitsubject"
                                        name="limitsubject"
                                        value={limitsubject}
                                        onChange={handleLimitSubject}
                                        placeholder="จำนวนรายวิชา เป็นตัวเลข เช่น 1 หรือ 20"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="NameExam" className="w140px">จำนวนรายวิชา</label>
                                    <input className="mw300px"
                                        type="text"
                                        id="limitexam"
                                        name="limitexam"
                                        value={limitexam}
                                        onChange={handleLimitExam}
                                        placeholder="จำนวนการสอบครั้งที่ เป็นตัวเลข เช่น 1 หรือ 20"
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="NameExam" className="w140px">จำนวนแบบสอบถาม</label>
                                    <input className="mw300px"
                                        type="text"
                                        id="limitque"
                                        name="limitque"
                                        value={limitque}
                                        onChange={handleLimitQue}
                                        placeholder="จำนวนแบบสอบถาม เป็นตัวเลข เช่น 1 หรือ 20"
                                    />
                                </div>
                                <div className='bx-button'>
                                    {/* <button type="reset" className='button-reset'>รีเซ็ท</button> */}
                                    <button type="submit"  className='button-submit'>บันทึก</button>
                                </div>
                            </form>
                            <div className="tableSub">
                                <table>
                                    <thead>
                                        <tr >
                                            {/* <th >ลำดับ</th> */}
                                            <th >ID</th>
                                            <th >ชื่อประเภทของผู้ใช้</th>
                                            <th >จำนวนรายวิชา</th>
                                            <th >จำนวนการสอบครั้งที่</th>
                                            <th >จำนวนแบบสอบถาม</th>
                                            <th >การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {DataType.length !== 0 && !DataType.error ? (
                                        DataType.map((item) => (
                                            <tr key={item.typesid}>
                                                <td>{item.typesid}</td>
                                                <td>{item.typesname}</td>
                                                <td>{item.limitsubject}</td>
                                                <td>{item.limitexam}</td>
                                                <td>{item.limitque}</td>
                                                <td className='center mw80px' ><Link to={"/Admin/Type/update/"+item.typesid} className='' style={{ display: 'contents' }}><span className=''><FontAwesomeIcon icon={faPen} /></span></Link><span className='danger light-font' onClick={this    }><FontAwesomeIcon icon={faTrashCan} /></span> </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className='center'>ไม่พบข้อมูล...</td>
                                        </tr>
                                    )}
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

export default AppCreateType;