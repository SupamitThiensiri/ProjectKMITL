import AppHeaderOutSide from "./HeaderOutSide";
import { useState,useEffect} from "react";

// import { useState, useEffect} from "react";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

import {
  Link
} from "react-router-dom";

function AppSingIn(){

  const [Email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');

  const handleInputEmail = (e) => { SetEmail(e.target.value); };
  const handleInputpassword = (e) => { Setpassword(e.target.value);};

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', Email);
      console.log('password:', password);
  };


  const clientId ="608918814563-geifv2f4mg3c1rqivvnok1lhcphdfnlf.apps.googleusercontent.com"

  // const [count, setCount] = useState(null)

  useEffect(() => {
    const initClient = () => {

    gapi.client.init({
      clientId: clientId,
      scope: ''
    })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  
  const onSuccess = (res) => {
    console.log('success', res)
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
                <h3 className="center">เข้าสู่ระบบ</h3>
                <div className='light'>
                  <form onSubmit={handleSubmit}>
                      <div className="bx-input-fix">
                          <label htmlFor="Email">อีเมล์</label>
                          <input
                              type="email"
                              id="Email"
                              name="Email"
                              value={Email}
                              onChange={handleInputEmail}
                              placeholder="example@mail.com"
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

                    
                      <div className='bx-button width100'>
                          {/* <button type="reset" className='button-cancel'>รีเซ็ท</button> */}
                          <button type="submit"  className='button-submit width100'>ยืนยัน</button>
                      </div>
                  </form>
                  <div className="center">สร้างบัญชีใหม่ได้ที่นี่ <Link to="/SingUp">สมัครสมาชิก</Link></div>
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
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );

}

export default AppSingIn;