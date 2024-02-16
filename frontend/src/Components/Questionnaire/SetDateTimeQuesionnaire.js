import {
    Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
function AppSetDateTimeQuesionnaire(){
    const { id } = useParams();

    const [QueSheetName, setQueSheetName] = useState('');
    //OnlineQuestionnaire
    const [URLOnline, setURLOnline] = useState(window.location.host+"/OnlineQuestionnaire/"+id);
    const [dateTime, setDateTime] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const handleCheckboxChange = () => {setIsChecked(!isChecked);};

    const fetchDataquesheet = async () => {
        try{
            fetch(variables.API_URL+"quesheet/detail/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    if(result.err !== undefined){
                        setStartError(1);
                    }
                    console.log("quesheet :",result)
                    setQueSheetName(result.quesheetname)
                   
                }
            )
            fetch(variables.API_URL+"queheaddetails/detail/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    if(result.err !== undefined){
                        setStartError(1);
                    }
                    console.log(result)
                }
            )
            fetch(variables.API_URL+"quetopicdetails/detail/"+id+"/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    if(result.err !== undefined){
                        setStartError(1);
                    }
                    console.log(result)
                }
            )
            
        }catch (err) {
            console.error(err)
            setStartError(1);
           
        }
    };
    if(Start === 0){
        fetchDataquesheet();
        setStart(1);
    }

    useEffect(() => {
        setTimeout(() => {
            if(StartError !== 1){
                setStartError(2);
            }
        }, 500); 
    }, []);

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(URLOnline)
          .then(() => {
            Swal.fire({
                title: "",
                text: URLOnline+"\n คัดลอก LINK สำหรับทำแบบสอบถามออนไลน์แล้ว สามารถส่ง LINK ไปให้ผู้ใช้เพื่อทำแบบสอบถามออนไลน์ได้",
                icon: "success",
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",  
            }).then((result) => {
            });
        })
          .catch((error) => {
            Swal.fire('เกิดข้อผิดพลาด');
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("dateTime :",dateTime)
    }
    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                    <p><Link to="/Questionnaire">จัดการแบบสอบถาม</Link> / <Link to={"/Questionnaire/"}>แบบสอบถามทั้งหมด</Link> / <Link to={"/Questionnaire/QuestionnaireNo/"+id}>{QueSheetName}</Link> / ตั้งค่าแบบสอบถามออนไลน์</p>
                        <div className='bx-grid-topic'>
                            <h2>ตั้งค่าแบบสอบถามออนไลน์</h2>  
                        </div> 
                    </div>
                    
                    <div className='bx-details light'>
                        <div className="bx-details-items-small">
                            <div className="bx-bx-topic">
                                URL สำหรับเข้าทำแบบสอบถาม Online
                            </div>
                            <div className="bx-bx-details flexCenter">
                                <p className="text-nowrap">{URLOnline}</p>
                            </div>
                            <div className="bx-bx-details flexCenter">
                                <div className="button-submit center w200px" onClick={handleCopyClick}>URL แบบสอบถามออนไลน์</div>
                            </div>
                        </div> 
                        <form>
                            <div className="">
                                <div className="bx-input-fix flex ">
                                    <label htmlFor="datetime" className="pdr10px">ใช้งานแบบสอบถามออนไลน์</label>
                                    <input className=""
                                        type="checkbox"
                                        id="myCheckbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="datetime" className="w100px">เวลาเปิด</label>
                                    <input className="mw300px"
                                        type="datetime-local"
                                        id="datetime"
                                        name="datetime"
                                        value={dateTime}
                                        onChange={handleDateTimeChange}
                                    />
                                </div>
                                <div className="bx-input-fix">
                                    <label htmlFor="datetime" className="w100px">เวลาเปิด</label>
                                    <input className="mw300px"
                                        type="datetime-local"
                                        id="datetime"
                                        name="datetime"
                                        value={dateTime}
                                        onChange={handleDateTimeChange}
                                    />      
                                </div>
                                <div className="bx-button"><button type="reset" className="button-reset">รีเซ็ท</button>
                                <button type="submit" className="button-submit" onClick={handleSubmit}>บันทึก</button></div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppSetDateTimeQuesionnaire;