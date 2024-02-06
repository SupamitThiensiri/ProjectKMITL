import {
    Link
} from "react-router-dom";
import React, { useState,useCallback,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

function AppCreateQuestionnaire(){
    const [step,setstep] = useState(true);
    const handstep = (e) => {
        e.preventDefault();
        if(step === true){
            setstep(false)
        }else{
            setstep(true)
        }
    }

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


    //QueHeadDetails
    const [QH1C1, setQH1C1] = useState('');
    const [QH1C2, setQH1C2] = useState('');
    const [QH1C3, setQH1C3] = useState('');
    const [QH1C4, setQH1C4] = useState('');
    const [QH1C5, setQH1C5] = useState('');
    const handleQH1C1 = (e) => { setQH1C1(e.target.value); };
    const handleQH1C2 = (e) => { setQH1C2(e.target.value); };
    const handleQH1C3 = (e) => { setQH1C3(e.target.value); };
    const handleQH1C4 = (e) => { setQH1C4(e.target.value); };
    const handleQH1C5 = (e) => { setQH1C5(e.target.value); };
    const [QH1, setQH1] = useState([QH1C1,QH1C2,QH1C3,QH1C4,QH1C5]);
    const [QH2C1, setQH2C1] = useState('');
    const [QH2C2, setQH2C2] = useState('');
    const [QH2C3, setQH2C3] = useState('');
    const [QH2C4, setQH2C4] = useState('');
    const [QH2C5, setQH2C5] = useState('');
    const handleQH2C1 = (e) => { setQH2C1(e.target.value); };
    const handleQH2C2 = (e) => { setQH2C2(e.target.value); };
    const handleQH2C3 = (e) => { setQH2C3(e.target.value); };
    const handleQH2C4 = (e) => { setQH2C4(e.target.value); };
    const handleQH2C5 = (e) => { setQH2C5(e.target.value); };
    const [QH2, setQH2] = useState([QH2C1,QH2C2,QH2C3,QH2C4,QH2C5]);
    const [QH3C1, setQH3C1] = useState('');
    const [QH3C2, setQH3C2] = useState('');
    const [QH3C3, setQH3C3] = useState('');
    const [QH3C4, setQH3C4] = useState('');
    const [QH3C5, setQH3C5] = useState('');
    const handleQH3C1 = (e) => { setQH3C1(e.target.value); };
    const handleQH3C2 = (e) => { setQH3C2(e.target.value); };
    const handleQH3C3 = (e) => { setQH3C3(e.target.value); };
    const handleQH3C4 = (e) => { setQH3C4(e.target.value); };
    const handleQH3C5 = (e) => { setQH3C5(e.target.value); };
    const [QH3, setQH3] = useState([QH3C1,QH3C2,QH3C3,QH3C4,QH3C5]);
    const [QH4C1, setQH4C1] = useState('');
    const [QH4C2, setQH4C2] = useState('');
    const [QH4C3, setQH4C3] = useState('');
    const [QH4C4, setQH4C4] = useState('');
    const [QH4C5, setQH4C5] = useState('');
    const handleQH4C1 = (e) => { setQH4C1(e.target.value); };
    const handleQH4C2 = (e) => { setQH4C2(e.target.value); };
    const handleQH4C3 = (e) => { setQH4C3(e.target.value); };
    const handleQH4C4 = (e) => { setQH4C4(e.target.value); };
    const handleQH4C5 = (e) => { setQH4C5(e.target.value); };
    const [QH4, setQH4] = useState([QH4C1,QH4C2,QH4C3,QH4C4,QH4C5]);
    const [QH5C1, setQH5C1] = useState('');
    const [QH5C2, setQH5C2] = useState('');
    const [QH5C3, setQH5C3] = useState('');
    const [QH5C4, setQH5C4] = useState('');
    const [QH5C5, setQH5C5] = useState('');
    const handleQH5C1 = (e) => { setQH5C1(e.target.value); };
    const handleQH5C2 = (e) => { setQH5C2(e.target.value); };
    const handleQH5C3 = (e) => { setQH5C3(e.target.value); };
    const handleQH5C4 = (e) => { setQH5C4(e.target.value); };
    const handleQH5C5 = (e) => { setQH5C5(e.target.value); };
    const [QH5, setQH5] = useState([QH5C1,QH5C2,QH5C3,QH5C4,QH5C5]);

    useEffect(() => {
        setQH1([QH1C1, QH1C2, QH1C3, QH1C4, QH1C5]);
    }, [QH1C1, QH1C2, QH1C3, QH1C4, QH1C5]);

    useEffect(() => {
        setQH2([QH2C1, QH2C2, QH2C3, QH2C4, QH2C5]);
    }, [QH2C1, QH2C2, QH2C3, QH2C4, QH2C5]);

    useEffect(() => {
        setQH3([QH3C1, QH3C2, QH3C3, QH3C4, QH3C5]);
    }, [QH3C1, QH3C2, QH3C3, QH3C4, QH3C5]);

    useEffect(() => {
        setQH4([QH4C1, QH4C2, QH4C3, QH4C4, QH4C5]);
    }, [QH4C1, QH4C2, QH4C3, QH4C4, QH4C5]);
    
    useEffect(() => {
        setQH5([QH5C1, QH5C2, QH5C3, QH5C4, QH5C5]);
    }, [QH5C1, QH5C2, QH5C3, QH5C4, QH5C5]);

    //QueTopicDetails
    const [inputValues, setInputValues] = useState(Array(20).fill(''));
    const [checkboxValues, setCheckboxValues] = useState(Array(20).fill(false));
  
    const handleInputChange = (index, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
    };
  
    const handleCheckboxChange = (index) => {
      const newCheckboxValues = [...checkboxValues];
      newCheckboxValues[index] = !newCheckboxValues[index];
      setCheckboxValues(newCheckboxValues);
    };
    // FORM Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setQH5([QH5C1, QH5C2, QH5C3, QH5C4, QH5C5]);
        console.log('QueSheetName:', QueSheetName);
        console.log('QueSheetTopicName:', QueSheetTopicName);
        console.log('DetailsLineOne:', DetailsLineOne);
        console.log('DetailsLinetwo:', DetailsLinetwo);
        console.log('Explanation:', Explanation);
        
        console.log('QH1:', QH1.join(','));
        console.log('QH2:', QH2.join(','));
        console.log('QH3:', QH3.join(','));
        console.log('QH4:', QH4.join(','));
        console.log('QH5:', QH5.join(','));
        
        console.log('inputValues:', inputValues)
        console.log('checkboxValues:', checkboxValues)
    };
    // DropZone
    const [File, setFile] = useState(''); // สำหรับเก็บไฟล์
    const [statusitem, setStatusItem] = useState(false); // สำหรับเปิด box แสดงชื่อไฟล์และลบลบไฟล์ box item
    const [namefileupload, setNameFileUpload] = useState(''); // สำหรับชื่อไฟล์อัปโหลด

    const onDrop = useCallback((acceptedFiles) => {
        console.log("OnDrop");
        console.log(acceptedFiles);
        console.log(acceptedFiles[0].type);
        if(acceptedFiles[0].type === "image/png" ||acceptedFiles[0].type === "image/jpeg" ||acceptedFiles[0].type === "image/jpg"){
            handleFileInputChange(acceptedFiles[0]);
        }else{
            console.log("รองรับเฉพาะไฟล์ .PNG .JPG และ .JPGE");
            Swal.fire({
                title: "",
                text: `รองรับเฉพาะไฟล์ .PNG .JPG และ .JPGE`,
                icon: "error",//error,question,warning,success
                confirmButtonColor: "#341699",
                confirmButtonText: "ยืนยัน",
            }).then((result) => {
            });
        }
       
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: false,
    })

    const handleFileInputChange = (e) => {
        const file = e;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(reader.result);
        }

        setStatusItem(true);
        setNameFileUpload(file.path);

    }
    const handleDelFileUpload = (e) => {
        Swal.fire({
            title: "",
            text: `คุณต้องการลบไฟล์ออกใช่หรือไม่`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#341699",
            confirmButtonText: "ยืนยัน",
            cancelButtonColor: "#d33",
            cancelButtonText:"ยกเลิก"
        }).then((result) => {
        if (result.isConfirmed) {
            setNameFileUpload('');
            setFile('');
            setStatusItem(false);
            console.log("File",File);
        }
        });
    }
    
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
                                {step ?
                                    <div className="">
                                        <div className="fb">กรอกรายละเอียดส่วนหัวแบบสอบถาม</div>
                                        <div className="bx-input-fix">
                                            <label htmlFor="QueSheetName" className="w150px">ชื่อแบบสอบถาม</label>
                                            <input className="mw300px"
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
                                            <input className="mw300px"
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
                                            <input className="mw300px"
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
                                            <input className="mw300px"
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
                                            <input className="mw300px"
                                                type="text"
                                                id="Explanation"
                                                name="Explanation"
                                                value={Explanation}
                                                onChange={handleInputExplanation}
                                                placeholder="กรอกคำชี้แจง"
                                            />
                                        </div>
                                        <div className="fb">ปรับแต่งตราสัญลักษณ์</div>
                                        <div className="mw300px">
                                            <div className="dropzone">
                                                <div className="dz-box"{...getRootProps()}>
                                                    <input className="test" {...getInputProps()} />
                                                    <div className="dz-icon blue-font"><FontAwesomeIcon icon={faCloudArrowUp} /></div>
                                                    { isDragActive ?
                                                        <div>วางไฟล์ที่นี่ ...</div>:
                                                        <div>ลากไฟล์มาที่นี่หรืออัปโหลด<p className="">รองรับ .PNG .JPG และ JPEG</p></div>  
                                                    }
                                                </div>
                                            </div>
                                            {
                                                statusitem?
                                                <div className="box-item-name-trash space-between">
                                                    <div>{namefileupload}</div>
                                                    <div onClick={handleDelFileUpload} className="icon-Trash danger-font"><FontAwesomeIcon icon={faTrashCan} /></div>
                                                </div>
                                                :
                                                ''
                                            }
                                            
                                        
                                        
                                        </div>
                                        <div className="fb">แสดงตัวอย่างส่วนหัวแบบสอบถาม</div>

                                        <div className='bx-button'>
                                            <div className='button-reset'>รีเซ็ท</div>
                                            <div className='button-submit' onClick={handstep}>ถัดไป</div>
                                        </div>
                                    </div>
                                :
                                <div>
                                    <div>
                                        <p>ส่วนที่ 1 : ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม </p>
                                        <div className="tableQue ">
                                        <table className="">
                                                <thead>
                                                    <tr>
                                                        <th className="grey">หัวข้อ</th>
                                                        <th className="grey">ตัวเลือกที่ 1</th>
                                                        <th className="grey">ตัวเลือกที่ 2</th>
                                                        <th className="grey">ตัวเลือกที่ 3</th>
                                                        <th className="grey">ตัวเลือกที่ 4</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td className="w150px"><input type="text" id="" name="" value={QH1C1} onChange={handleQH1C1} placeholder="" /></td>
                                                        <td className="w150px"><input type="text" id="" name="" value={QH1C2} onChange={handleQH1C2} placeholder="" /></td>
                                                        <td className="w150px"><input type="text" id="" name="" value={QH1C3} onChange={handleQH1C3} placeholder="" /></td>
                                                        <td className="w150px"><input type="text" id="" name="" value={QH1C4} onChange={handleQH1C4} placeholder="" /></td>
                                                        <td className="w150px"><input type="text" id="" name="" value={QH1C5} onChange={handleQH1C5} placeholder="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" id="" name="" value={QH2C1} onChange={handleQH2C1} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH2C2} onChange={handleQH2C2} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH2C3} onChange={handleQH2C3} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH2C4} onChange={handleQH2C4} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH2C5} onChange={handleQH2C5} placeholder="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" id="" name="" value={QH3C1} onChange={handleQH3C1} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH3C2} onChange={handleQH3C2} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH3C3} onChange={handleQH3C3} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH3C4} onChange={handleQH3C4} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH3C5} onChange={handleQH3C5} placeholder="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" id="" name="" value={QH4C1} onChange={handleQH4C1} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH4C2} onChange={handleQH4C2} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH4C3} onChange={handleQH4C3} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH4C4} onChange={handleQH4C4} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH4C5} onChange={handleQH4C5} placeholder="" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" id="" name="" value={QH5C1} onChange={handleQH5C1} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH5C2} onChange={handleQH5C2} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH5C3} onChange={handleQH5C3} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH5C4} onChange={handleQH5C4} placeholder="" /></td>
                                                        <td><input type="text" id="" name="" value={QH5C5} onChange={handleQH5C5} placeholder="" /></td>
                                                    </tr>
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* display: grid;
                                        width: fit-content;
                                        overflow: auto;
                                        min-width: 790px; */}
                                        <p>ส่วนที่ 2: ความคิดเห็นเกี่ยวกับแบบสอบถาม (5: มากที่สุด, 4: มาก, 3: ปานกลาง, 2: น้อย, 1: น้อยที่สุด, 0: ไม่ประเมิน)</p>
                                        <div className="tableQue">
                                            <table className="">
                                                <thead>
                                                    <tr>
                                                        <th>หัวข้อ</th>
                                                        <th>หัวข้อใหญ่</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <tr>
                                                        <td><div><input type="text" id="" name="" value={this} onChange={null} placeholder="" /></div></td>
                                                        <td><div className="flexCenter"><input className="mgR10" value = "two" type = "checkbox" onChange = {null} /></div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div><input type="text" id="" name="" value={this} onChange={null} placeholder="" /></div></td>
                                                        <td><div className="flexCenter"><input className="mgR10" value = "two" type = "checkbox" onChange = {null} /></div></td>
                                                    </tr> */}
                                                        {Array.from({ length: 20 }, (_, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div>
                                                                        <input
                                                                        type="text"
                                                                        id={`input-${index}`}
                                                                        name={`input-${index}`}
                                                                        value={inputValues[index]}
                                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                                        placeholder=""
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="flexCenter">
                                                                        <input
                                                                        className="mgR10"
                                                                        type="checkbox"
                                                                        checked={checkboxValues[index]}
                                                                        onChange={() => handleCheckboxChange(index)}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            
                                            </table>
                                            <div className='bx-button'>
                                                <div className='button-reset'>รีเซ็ท</div>
                                                <div className='button-cancel' onClick={handstep}>ย้อนกลับ</div>
                                                <button type="submit" className='button-submit'>บันทึก</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default AppCreateQuestionnaire;