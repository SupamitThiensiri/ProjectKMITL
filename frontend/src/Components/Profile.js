import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useCallback} from "react";
import Cookies from 'js-cookie';
import {variables} from "../Variables";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2'
function AppProfile(){
    const [ClickUpdate,setClickUpdate] = useState(false);
    const handClickUpdate = () => setClickUpdate(!ClickUpdate);


    const [email, setemail] = useState('');
    const [tel, settel] = useState('');
    const [fullname,setfullname]  = useState('');
    // const [password, setpassword] = useState('');
    // const [Confirmpassword, setConfirmpassword] = useState('');
    
    const [job, setjob] = useState('');
    const [Department, setDepartment] = useState('');
    const [Faculty, setFaculty] = useState('');
    const [Workplace, setWorkplace] = useState('');

    const [usageformat1, setusageformat1] = useState('');
    const [usageformat2, setusageformat2] = useState('');

    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const [errortext,seterrortext] = useState('')

    const handleInputemail = (e) => { setemail(e.target.value); };
    const handleInputfullname = (e) => {setfullname(e.target.value);};
    const handleInputtel = (e) => { settel(e.target.value.replace(/\D/g, '')) };
    const handleInputjob = (e) => { setjob(e.target.value); };
    const handleInputDepartment = (e) => { setDepartment(e.target.value); };
    const handleInputFaculty = (e) => { setFaculty(e.target.value);};
    const handleInputWorkplace = (e) => { setWorkplace(e.target.value);};
    const handleCheckbox1 = (e) => { setCheckbox1(!checkbox1);};
    const handleCheckbox2 = (e) => { setCheckbox2(!checkbox2);};
    // const handleInputpassword = (e) => { setpassword(e.target.value); };
    // const handleInputConfirmpassword = (e) => {setConfirmpassword(e.target.value);};

    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const fetchDataUser = async () => {
        console.log(Cookies.get('userid'))
        try{
            fetch(variables.API_URL+"user/detail/"+Cookies.get('userid')+"/", {
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
                    console.log("result :",result)
                    setemail(result.email)
                    settel(result.tel)
                    setfullname(result.fullname)
                    setjob(result.job)
                    setDepartment(result.department)
                    setFaculty(result.faculty)
                    setWorkplace(result.workplace)
                    const usage_list = eval(result.usageformat)
                    setusageformat1(usage_list[0])
                    setusageformat2(usage_list[1])
                    setCheckbox1(usage_list[0])
                    setCheckbox2(usage_list[1])
                }
            )
        }catch (err) {
            // console.error(err)
            setStartError(1);
           
        }
    };

    if(Start === 0){
        fetchDataUser();
        setStart(1);
    }

    useEffect(() => {
        let errorMessage = 'กรุณากรอก';
      
        if (fullname === '') {
          if(errorMessage === 'กรุณากรอก'){errorMessage += ' ชื่อ นามสกุล\n'}else{errorMessage += ', ชื่อ นามสกุล\n'}
        }
        if (tel === '') {
          if(errorMessage === 'กรุณากรอก'){errorMessage += ' เบอร์โทรศัพท์\n'}else{errorMessage += ', เบอร์โทรศัพท์\n'}
        }
        if (job === '') {
            if(errorMessage === 'กรุณากรอก'){errorMessage += ' อาชีพ\n'}else{errorMessage += ', อาชีพ\n'}
          }
        if (Department === '') {
          if(errorMessage === 'กรุณากรอก'){errorMessage += ' ภาค\n'}else{errorMessage += ', ภาค\n'}
        }
        if (Faculty === '') {
          if(errorMessage === 'กรุณากรอก'){errorMessage += ' คณะ\n'}else{errorMessage += ', คณะ\n'}
        }
        if (Workplace === '') {
          if(errorMessage === 'กรุณากรอก'){errorMessage += ' สถานที่ทำงาน\n'}else{errorMessage += ', สถานที่ทำงาน\n'}
        }
    
        seterrortext(errorMessage);
      }, [email,tel,fullname, Department, Faculty, Workplace, job]);
      

    const handleUpdateUser = (e) => {
        e.preventDefault();
        console.log('email:', email);
        console.log('tel:', tel);
        console.log('email:', email);
        console.log('tel:', tel);
        console.log('errortext:', errortext);
        // console.log('Confirmpassword:', Confirmpassword);
    };
    const  handleResetUser = (e) => {
        e.preventDefault();
        fetchDataUser();
        // console.log('Confirmpassword:', Confirmpassword);
    };
   


    // Dropzone
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

    const handSwal = (e) => {
        Swal.fire({
            title: "",
            text: e,
            icon: "error",//error,question,warning,success
            confirmButtonColor: "#341699",
            confirmButtonText: "ยืนยัน",
        }).then((result) => {
        });
    }
    
    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">ประวัติส่วนตัว</Link></p>
                        <div className='bx-grid-topic'>
                            <div className="flex">
                                <h2>ประวัติส่วนตัว</h2><div className="hfc pdl10px"> <p className='button-update cursor-p' onClick={handClickUpdate}>แก้ไข</p></div>
                            </div>
                            {/* <div className='flex-end'  onClick={handClickUpdate}>
                                <p className='button-update'>แก้ไข</p>
                            </div> */}
                            
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        
                        <form>
                            <div className="form-set">
                                <h3>ข้อมูลผู้ใช้</h3>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="email">อีเมล์</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputemail}
                                        placeholder="e-mail"
                                        disabled={"disabled"}
                                    />                                    
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="fullname">ชื่อ</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        value={fullname}
                                        onChange={handleInputfullname}
                                        placeholder="ชื่อ"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                        {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="tel">เบอร์โทร</label>
                                    <input
                                        type="text"
                                        id="tel"
                                        name="tel"
                                        value={tel}
                                        onChange={handleInputtel}
                                        placeholder="เบอร์โทร"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                </div>
                                {/* <div className="bx-input inline-grid">
                                    <label htmlFor="password">รหัสผ่าน</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handleInputpassword}
                                        placeholder="รหัสผ่าน"
                                       
                                    />
                                    {ClickUpdate ? <FontAwesomeIcon icon={faEyeSlash} />:''}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Confirmpassword">ยืนยันรหัสผ่าน</label>
                                    <input
                                        type="password"
                                        id="Confirmpassword"
                                        name="Confirmpassword"
                                        value={Confirmpassword}
                                        onChange={handleInputConfirmpassword}
                                        placeholder="ยืนยันรหัสผ่าน"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                </div> */}
                                <div className='space10'></div>
                                <h3>ข้อมูลอาชีพ</h3>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="job">อาชีพ</label>
                                    <input
                                        type="text"
                                        id="job"
                                        name="job"
                                        value={job}
                                        onChange={handleInputjob}
                                        placeholder="อาชีพ"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Faculty">สังกัด/คณะ</label>
                                    <input
                                        type="text"
                                        id="Faculty"
                                        name="Faculty"
                                        value={Faculty}
                                        onChange={handleInputFaculty}
                                        placeholder="สังกัด/คณะ"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Department">ภาค/สาขา/สาย</label>
                                    <input
                                        type="text"
                                        id="Department"
                                        name="Department"
                                        value={Department}
                                        onChange={handleInputDepartment}
                                        placeholder="ภาค/สาขา"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Workplace">องค์กรการศึกษา/สถานที่ทำงาน</label>
                                    <input
                                        type="text"
                                        id="Workplace"
                                        name="Workplace"
                                        value={Workplace}
                                        onChange={handleInputWorkplace}
                                        placeholder="สถานที่ทำงาน"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                
                                {ClickUpdate ?  
                                    <div className={ClickUpdate ? 'bx-button':'none bx-button'}>
                                        <div onClick={handleResetUser} className='button-reset'>รีเซ็ท</div>
                                        <div onClick={handleUpdateUser} className='button-submit'>บันทึก</div>
                                    </div>
                                :
                                     <div className='space10'></div>  
                                }
                            </div>
                        </form>
                        
                        <hr></hr>
                        <div className='space10'></div>
                        เลือกประเภทสิทธิ์การใช้งานที่ต้องการในระบบ (กรณีเลือกจัดการรายวิชา ต้องทำการยืนยันตัวตน ไม่สามารถเลือกดูคะแนนได้)
                        <div className="bx-input-fix">
                            <span className="flex"><input className="mgR10" value = "0" type = "checkbox" checked={checkbox1} onChange={handleCheckbox1} />จัดการรายวิชา </span>
                        </div>
                        {checkbox1 && (usageformat1 === 0 || usageformat1 === '0') ? 
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
                        :""}
                        <div className="bx-input-fix">
                            <span className="flex"><input className="mgR10 wait" value = "1" type = "checkbox" checked={checkbox2} onChange={handleCheckbox2} />จัดการแบบสอบถาม </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppProfile;