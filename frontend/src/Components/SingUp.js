import AppHeaderOutSide from "./HeaderOutSide";
import { useState,useEffect} from "react";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

// import {
//   Link
// } from "react-router-dom";
// import { faL } from "@fortawesome/free-solid-svg-icons";

function AppSingUp(){

    const [step,setstep] = useState(false);

    const handstep = (e) => {
        e.preventDefault();
        if(step === true){
            setstep(false)

        }else{
            if(validateEmail(Email) === false){
                console.log("รูปแบบ email ไม่ถูกต้อง")
            }else{
                console.log('Email:', Email);
                setstep(true)
            }
        } 
    }
    
    const [Email, SetEmail] = useState('');
    const [password, Setpassword] = useState('');
    const [Confirmpassword, setConfirmpassword] = useState('');
    // const [GoogleID, SetGoogleID] = useState('');
    const [Tel, setTel] = useState('');
    const [FullName, setFullName] = useState('');
    const [Department, SetDepartment] = useState('');
    const [Faculty, SetFaculty] = useState('');
    const [Workplace, setWorkplace] = useState('');

    const handleInputEmail = (e) => { SetEmail(e.target.value); };
    const handleInputpassword = (e) => { Setpassword(e.target.value);};
    const handleInputConfirmpassword = (e) => { setConfirmpassword(e.target.value);};
    const handleInputTel = (e) => { setTel(e.target.value); };
    const handleInputFullName = (e) => { setFullName(e.target.value);};
    const handleInputDepartment = (e) => { SetDepartment(e.target.value); };
    const handleInputFaculty = (e) => { SetFaculty(e.target.value);};
    const handleInputWorkplace = (e) => { setWorkplace(e.target.value);};

    const [allchecked, setAllChecked] = useState([]);
    
    const [agree, setagree] = useState(false);
    const handleChangeagree = (e) => {
        setagree(!agree);
        console.log(agree)
    }
    // checkbox สำหรับเลือกสิทธิ์การใช้งาน
    const handleChangeUsageformat = (e) => {
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
            if(e.target.value === ''){

            }
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
            console.log("flase")
        }
    }
    // กด submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(agree === true){
            console.log("ยินยอม")
            console.log('Email:', Email);
            console.log('password:', password);
            console.log('Confirmpassword:', Confirmpassword);
            console.log('Department:', Department);
            console.log('Faculty:', Faculty);
            console.log('Workplace:', Workplace);
            console.log('allchecked:', allchecked);
        }else{
            console.log("checkagree")
        }

    };
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const clientId ="608918814563-geifv2f4mg3c1rqivvnok1lhcphdfnlf.apps.googleusercontent.com"

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load("client:auth2", initClient)
    }, [])
    // useEffect(() => {
    //     // Load the Google API client library
    //     gapi.load('auth2', () => {
    //       gapi.auth2.init({
    //         client_id: clientId,
    //       });
    //     });
    //   }, []);

   
    
    const onSuccess = (res) => {
        console.log('success', res)
        console.log(res.profileObj.email)
        console.log(res.profileObj.givenName)
        console.log(res.profileObj.googleId)
    }

    const onFailure = (res) => {
        console.log('failed', res)
    }

    
    return(
        <div>
        <AppHeaderOutSide />
        <div>
            <div className="box-contents-SingIn">
                <div className="box-contents-form">
                    <div className="box-contents-form-view light">
                        <h3 className="center">ลงทะเบียน</h3>
                        <div>
                            <ul className="progress-bar">
                                <li id="step1" className={step ? "active":""}>บัญชี</li>
                                <li id="step2" className="">ข้อมูลผู้ใช้</li>
                            </ul>   
                        </div>
                          
                        <div className='light'>
                            <form onSubmit={handleSubmit}>
                                <div className={step ? "SingUp1 none":"SingUp1"}>
                                    <div className='center'>
                                        <GoogleLogin 
                                        clientId={clientId}
                                        buttonText="Sing in with Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={"single_host_origin"}
                                        isSignedIn={true}
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Email">อีเมล์</label>
                                        <input
                                            type="email"
                                            id="Email"
                                            name="Email"
                                            value={Email}
                                            onChange={handleInputEmail}
                                            placeholder="username@gmail.com"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="password">รหัสผ่าน</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handleInputpassword}
                                            placeholder="กรอกรหัสผ่าน"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Confirmpassword">ยืนยันรหัสผ่าน</label>
                                        <input
                                            type="password"
                                            id="Confirmpassword"
                                            name="Confirmpassword"
                                            value={Confirmpassword}
                                            onChange={handleInputConfirmpassword}
                                            placeholder="กรอกรหัสผ่าน"
                                        />
                                    </div>

                                    <div className='bx-button width100 flex-end'>
                                        <div className='button-submit' onClick={handstep}>ถัดไป</div>
                                    </div>
                                </div>
                                <div className={step ? "SingUp2":"SingUp2 none"}>
                                    
                                    <div className="bx-input-fix">
                                        <label htmlFor="FullName">ชื่อ นามสกุล</label>
                                        <input
                                            type="text"
                                            id="FullName"
                                            name="FullName"
                                            value={FullName}
                                            onChange={handleInputFullName}
                                            placeholder="กรอกชื่อ นามสกุล"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Tel">เบอร์โทรศัพท์</label>
                                        <input
                                            type="text"
                                            id="Tel"
                                            name="Tel"
                                            value={Tel}
                                            onChange={handleInputTel}
                                            placeholder="กรอกเบอร์โทรศัพท์"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <span className="flex"><input className="mgR10" value = "One" type = "checkbox" onChange = {handleChangeUsageformat} />จัดการรายวิชา </span>
                                    </div>
                                    <div className="bx-input-fix">
                                        <span className="flex"><input className="mgR10" value = "Two" type = "checkbox" onChange = {handleChangeUsageformat} />จัดการแบบสอบถาม </span>
                                    </div>
                                    <div className="bx-input-fix">
                                        <span className="flex"><input className="mgR10" value = "Tree" type = "checkbox" onChange = {handleChangeUsageformat} /> จัดการแบบสอบถาม </span>
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Department">ภาค/สาขา/สาย</label>
                                        <input
                                            type="text"
                                            id="Department"
                                            name="Department"
                                            value={Department}
                                            onChange={handleInputDepartment}
                                            placeholder="กรอกภาค/สาขา"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Faculty">สังกัด/คณะ</label>
                                        <input
                                            type="text"
                                            id="Faculty"
                                            name="Faculty"
                                            value={Faculty}
                                            onChange={handleInputFaculty}
                                            placeholder="กรอกสังกัด/คณะ"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <label htmlFor="Workplace">องค์กรการศึกษา/สถานที่ทำงาน</label>
                                        <input
                                            type="text"
                                            id="Workplace"
                                            name="Workplace"
                                            value={Workplace}
                                            onChange={handleInputWorkplace}
                                            placeholder="กรอกสถานที่ทำงาน"
                                        />
                                    </div>
                                    <div className="bx-input-fix">
                                        <span className="flex fs10"><input className="mgR10" value = "agree" type = "checkbox" onChange = {handleChangeagree} />ยินยอมให้เว็บไซต์ใช้ข้อมูลทั้งหมดที่ได้ให้ไว้ ซึ่งรวมถึงข้อมูลส่วนบุคคล และข้อมูลการใช้บริการ </span>
                                    </div>
                                    <div className='bx-button width100 flex-end'>
                                        <div className='button-reset' onClick={handstep}>ย้อนกลับ</div>
                                        <button  type="submit"  className='button-submit'>ลงทะเบียน</button>
                                    </div>
                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}

export default AppSingUp;