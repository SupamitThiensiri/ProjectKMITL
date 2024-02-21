import Cookies, { set } from 'js-cookie';
import AppHeaderOutSide from '../HeaderOutSide';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import React, { useState,useEffect } from 'react';
const AppOnlineQuestionnaire = () => {
  const { id } = useParams(); 

  const [QueSheetName, setQueSheetName] = useState('');
  const [QueSheetTopicName, setQueSheetTopicName] = useState('');
  const [DetailsLineOne, setDetailsLineOne] = useState('');
  const [DetailsLinetwo, setDetailsLinetwo] = useState('');
  const [imgquesheet_path, setimgquesheet_path] = useState('');

  const [dateTimeStart, setDateTimeStart] = useState('');
  const [dateTimeend, setDateTimeend] = useState('');
  const currenttime = new Date();

  const [quetopicdetails, setquetopicdetails] = useState(Array(18).fill(''));
  const [quetopicformat, setquetopicformat] = useState(Array(18).fill(''));
  

  const [quehead1, setquehead1] = useState(Array(5).fill(''));
  const [quehead2, setquehead2] = useState(Array(5).fill(''));
  const [quehead3, setquehead3] = useState(Array(5).fill(''));
  const [quehead4, setquehead4] = useState(Array(5).fill(''));
  const [quehead5, setquehead5] = useState(Array(5).fill(''));

  const [path3, setpath3] = useState('');;
  const handlepath3 = (event) => {
    setpath3(event.target.value);
  };
  const [Step,setStep] = useState(0);
  const [Start, setStart] = useState(0);
  const [StartError, setStartError] = useState(0);

  const fetchDataQuesheet = async () => {
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
              }else{
                console.log(result)
                setQueSheetName(result.quesheetname)
                setQueSheetTopicName(result.quesheettopicname)
                setDetailsLineOne(result.detailslineone)
                setDetailsLinetwo(result.detailslinetwo)
                setimgquesheet_path(result.imgquesheet_path)
                if(result.datetimestart === null){

                }else{
                    setDateTimeStart(new Date(result.datetimestart))

                }
                if(result.datetimeend === null){

                }else{
                    setDateTimeend(new Date(result.datetimeend))
                }
              }
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
              }else{
                console.log(result)
                setquehead1(result.quehead1.split(','))
                setquehead2(result.quehead2.split(','))
                setquehead3(result.quehead3.split(','))
                setquehead4(result.quehead4.split(','))
                setquehead5(result.quehead5.split(','))
              }
              
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
              }else{
                console.log(result)
                setquetopicdetails(result.quetopicdetails.split(','))
                setquetopicformat(result.quetopicformat.split(','))

              }
              
            }
        )
        
    }catch (err) {
        console.error(err)
        setStartError(1);
       
    }
  };

  if(Start === 0){
    fetchDataQuesheet();
    setStart(1);
  }
  const [AnsOther, setAnsOther] = useState(Array(5).fill(''));
  const [AnsQueHead, setAnsQueHead] = useState(Array(5).fill(''));
  const [AnsQueTopic, setSelectedOptions] = useState(Array(18).fill(''));
  const choices = [
    { label: 'มากที่สุด', value: "5" },
    { label: 'มาก', value: "4" },
    { label: 'ปลานกลาง', value: "3" },
    { label: 'น้อย', value: "2" },
    { label: 'น้อยที่สุด', value: "1" },
    { label: 'ไม่ประเมิน', value: "0" }
  ];
  const handleOtherInputChange = (event, index) => {
    const newValue = event.target.value;
    const newAnsQueHead = [...AnsOther];
    newAnsQueHead[index] = newValue;
    setAnsOther(newAnsQueHead);
  };
  const handleAnsQueHead = (event, setIndex ,value) => {
    if(setIndex === 0 && value !== "อื่นๆ"){
      AnsOther[setIndex] = ''
    }
    if(setIndex === 1 && value !== "อื่นๆ"){
      AnsOther[setIndex] = ''
    }
    if(setIndex === 2 && value !== "อื่นๆ"){
      AnsOther[setIndex] = ''
    }
    if(setIndex === 3 && value !== "อื่นๆ"){
      AnsOther[setIndex] = ''
    }
    if(setIndex === 4 && value !== "อื่นๆ"){
      AnsOther[setIndex] = ''
    }
    const newSelectedOptionsHead = [...AnsQueHead]; 
    newSelectedOptionsHead[setIndex] = event.target.value; 
    setAnsQueHead(newSelectedOptionsHead); // Update the state

  };
  const handleAnsQueTopic = (event, setIndex) => {
    const newSelectedOptions = [...AnsQueTopic]; 
    newSelectedOptions[setIndex] = event.target.value; 
    setSelectedOptions(newSelectedOptions); 
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    console.log("AnsOther",AnsOther)
    console.log("AnsQueHead",AnsQueHead)
    console.log("AnsQueTopic",AnsQueTopic)
    console.log("path3",path3)
  };
  const handleStep = (e) => {
    if(Step === 0){
      setStep(1)
    }else if(Step ===1){
      setStep(0)
    }
    console.log(Step)
  }
  return (
    <div>
        <AppHeaderOutSide />
        <div className='box-contents-que'>
          <h2>แบบสอบถามออนไลน์</h2>
            <div>{dateTimeStart === null ? 'ไม่พบแบบสอบถาม': currenttime < dateTimeStart ? 'ไม่พบแบบสอบถาม': ''}</div>
            <div>{currenttime < dateTimeend ? '': 'หมดเวลาทำแบบสอบถามหมดเวลา'}</div>
            <div className='box-que'>
              {console.log(currenttime < dateTimeStart) }
              {console.log(currenttime < dateTimeend) }
            {/* <div className="image-container">
            <img
              src={imgquesheet_path}
              alt="Your Image"
              className="focused-image"
            />
          </div>   */}
            <div className='box-que-topicname'>
              <h3 className='center'>{QueSheetTopicName}</h3>
              <p className='center'>{DetailsLineOne}</p>
              <p className='center'>{DetailsLinetwo}</p>
            </div>
            <div className={Step === 0 ?'':'none'}>
              <h3>ส่วนที่ 1 : ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม</h3>
              {console.log("AnsQueTopic : ",AnsQueTopic)}
              {console.log("AnsOther : ",AnsOther)}
              {console.log("AnsQueHead : ",AnsQueHead)}
              {quehead1.map((value, index) => (
                <div key={"1" + index} className={value !== '' ?"choice":""}>
                  {index === 0 ? <p className=''>{value}</p> : (
                    value === "อื่นๆ" ? (
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option1${index}`}
                          name="options1"
                          value={index}
                          checked={AnsQueHead[0].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 0 ,value)}
                        />
                        <label htmlFor={`option1${index}`}>{value}</label>
                        <input
                          // type={AnsQueHead[0] === "อื่นๆ" ? "text" : "hidden"}
                          type={quehead1[AnsQueHead[0]] === "อื่นๆ" ? "text" : "hidden"}
                          id={`otherOption1${index}`}
                          name={`otherOption1${index}`}
                          value={AnsOther[0]}
                          onChange={(event) => handleOtherInputChange(event, 0 )}
                          disabled={quehead1[AnsQueHead[0]] === "อื่นๆ" ? false : true}
                        />
                      </React.Fragment>
                    ) : (
                      quehead1[index] !== '' ?
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option1${index}`}
                          name="options1"
                          value={index}
                          checked={AnsQueHead[0].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 0, value)}
                        />
                        <label htmlFor={`option1${index}`}><p>{value}</p></label>
                      </React.Fragment>
                      : ''
                    )
                  )}
                </div>
              ))}


              {quehead2.map((value, index) => (
                <div key={"2" + index} className={value !== '' ?"choice":""}>
                  {index === 0 ? <p className=''>{value}</p> : (
                    value === "อื่นๆ" ? (
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option2${index}`}
                          name="options2"
                          value={index}
                          checked={AnsQueHead[1].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 1 ,value)}
                        />
                        <label htmlFor={`option1${index}`}>{value}</label>
                        <input  className='other_input'
                          type={quehead2[AnsQueHead[1]] ? "text" : "hidden"}
                          id={`otherOption2${index}`}
                          name={`otherOption2${index}`}
                          value={AnsOther[1]}
                          onChange={(event) => handleOtherInputChange(event, 1)}
                          disabled={quehead2[AnsQueHead[1]] === "อื่นๆ" ? false : true}
                        />
                      </React.Fragment>
                    ) : (
                      quehead2[index] !== '' ?
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option2${index}`}
                          name="options2"
                          value={index}
                          checked={AnsQueHead[1].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 1 ,value)}
                        />
                        <label htmlFor={`option2${index}`}>{value}</label>
                      </React.Fragment>
                      : ''
                    )
                  )}
                </div>
              ))}

              {quehead3.map((value, index) => (
                <div key={"3" + index} className={value !== '' ?"choice":""}>
                  {index === 0 ? <p className=''>{value}</p> : (
                    value === "อื่นๆ" ? (
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option3${index}`}
                          name="options3"
                          value={index}
                          checked={AnsQueHead[2].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event,2 ,value)}
                        />
                        <label htmlFor={`option3${index}`}>{value}</label>
                        <input  className='other_input'
                          type={quehead3[AnsQueHead[2]] === "อื่นๆ" ? "text" : "hidden"}
                          id={`otherOption3${index}`}
                          name={`otherOption3${index}`}
                          value={AnsOther[2]}
                          onChange={(event) => handleOtherInputChange(event, 2)}
                          disabled={quehead3[AnsQueHead[2]] === "อื่นๆ" ? false : true}
                        />
                      </React.Fragment>
                    ) : (
                      quehead3[index] !== '' ?
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option3${index}`}
                          name="options3"
                          value={index}
                          checked={AnsQueHead[2].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 2 ,value)}
                        />
                        <label htmlFor={`option3${index}`}>{value}</label>
                      </React.Fragment>
                      : ''
                    )
                  )}
                </div>
              ))}

              {quehead4.map((value, index) => (
                <div key={"4" + index} className={value !== '' ?"choice":""}>
                  {index === 0 ? <p className=''>{value}</p> : (
                    value === "อื่นๆ" ? (
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option4${index}`}
                          name="options4"
                          value={index}
                          checked={AnsQueHead[3].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event,3 ,value)}
                        />
                        <label htmlFor={`option4${index}`}>{value}</label>
                        <input  className='other_input'
                          type={quehead4[AnsQueHead[3]] === "อื่นๆ" ? "text" : "hidden"}
                          id={`otherOption4${index}`}
                          name={`otherOption4${index}`}
                          value={AnsOther[3]}
                          onChange={(event) => handleOtherInputChange(event, 3)}
                          disabled={quehead4[AnsQueHead[3]]  === "อื่นๆ" ? false : true}
                        />
                      </React.Fragment>
                    ) : (
                      quehead4[index] !== '' ?
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option4${index}`}
                          name="options4"
                          value={index}
                          checked={AnsQueHead[3].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 3 ,value)}
                        />
                        <label htmlFor={`option4${index}`}>{value}</label>
                      </React.Fragment>
                      : ''
                    )
                  )}
                </div>
              ))}

              {quehead5.map((value, index) => (
                <div key={"5" + index} className={value !== '' ?"choice":""}>
                  {index === 0 ? <p className=''>{value}</p> : (
                    value === "อื่นๆ" ? (
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option5${index}`}
                          name="options5"
                          value={index}
                          checked={AnsQueHead[3].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event,4 ,value)}
                        />
                        <label htmlFor={`option5${index}`}>{value}</label>
                        <input className='other_input'
                          type={quehead5[AnsQueHead[4]] === "อื่นๆ" ? "text" : "hidden"}
                          id={`otherOption5${index}`}
                          name={`otherOption5${index}`}
                          value={AnsOther[4]}
                          onChange={(event) => handleOtherInputChange(event, 4)}
                          disabled={quehead5[AnsQueHead[4]] === "อื่นๆ" ? false : true}
                        />
                      </React.Fragment>
                    ) : (
                      quehead5[index] !== '' ?
                      <React.Fragment>
                        <input
                          type="radio"
                          id={`option5${index}`}
                          name="options5"
                          value={index}
                          checked={AnsQueHead[4].includes(index)} 
                          onChange={(event) => handleAnsQueHead(event, 4,value)}
                        />
                        <label htmlFor={`option5${index}`}>{value}</label>
                      </React.Fragment>
                      : ''
                    )
                  )}
                </div>
              ))}
              <div className="bx-button que-bx-button-flex-center">
                  <button type="submit" className="button-submit" onClick={handleStep}>ถัดไป</button>
              </div>
            </div>
              <div className={Step === 1 ?'':'none'}>
                <h3>ส่วนที่ 2 : ความคิดเห็นเกี่ยวกับแบบสอบถาม</h3>
                {quetopicformat.map((selectedOption, setIndex) => (
                  <div key={"s2"+setIndex}>
                    {quetopicformat[setIndex] === 1 || quetopicformat[setIndex] === '1'? (
                      <p className='fb box-que-topic'>หัวข้อ : {quetopicdetails[setIndex]}</p>
                    ) : (
                      quetopicdetails[setIndex] !== '' ? (
                        <React.Fragment>
                          <div className='box-que-show'>
                            <p className='box-que-detail que-wordwrap'>{quetopicdetails[setIndex]}</p>
                            {choices.map((choice, index) => (
                              <div key={index} className='choice'>
                                <input
                                  type="radio"
                                  id={`options2${setIndex}-${index}`}
                                  name={`options2${setIndex}`}
                                  value={choice.value}
                                  checked={AnsQueTopic[setIndex] === choice.value}
                                  onChange={(event) => handleAnsQueTopic(event, setIndex)}
                                />
                                <label htmlFor={`options2${setIndex}-${index}`}>{choice.label}</label>
                              </div>
                            ))}
                          </div>
                        </React.Fragment>
                      ) : ''
                    )}
                  </div>
                ))}
                <h3>ส่วนที่ 3 : ข้อมูลเสนอแนะเพิ่มเติมเพื่อการปรับปรุงแก้ไขครั้งต่อไป</h3>
                <textarea
                  value={path3} // Bind the value of the textarea to the state
                  onChange={handlepath3} // Handle changes in the textarea
                  rows={5} // Number of visible text lines
                  cols={50} // Number of visible text columns
                  placeholder="ข้อมูลเสนอแนะเพิ่มเติมเพื่อการปรับปรุงแก้ไขครั้งต่อไป..."
                />
                <div className="bx-button que-bx-button-flex-center">
                    <div onClick={handleStep} className='button-cancel'>ย้อนกลับ</div>
                    <button type="submit" className="button-submit" onClick={handleSubmit}>ส่งคำตอบ</button>
                </div>
              </div>
           </div>
        </div>
    </div>
  );
}

export default AppOnlineQuestionnaire;
