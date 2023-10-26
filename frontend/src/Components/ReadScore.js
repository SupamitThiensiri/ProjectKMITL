import AppHeaderOutSide from "./HeaderOutSide";
import { useState,} from "react";

function AppReadScore(){

  const [ActivateKey, SetActivateKey] = useState('');

  const handleInputActivateKey = (e) => { SetActivateKey(e.target.value); };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('ActivateKey:', ActivateKey);
  };


  return(
    <div>
      <AppHeaderOutSide />
      <div>
        <div className="box-contents-SingIn">
            <div className="box-contents-form">
              <div className="box-contents-form-view primary-blue">
                <div className="center"><img src='/img/logo-grade.png' alt=''/></div>
                <h1 className="center">ดูคะแนนสอบ</h1>
                <h5 className="center">กรุณาใส่ Activate Key</h5>
                <div className='bx-details primary-blue'>
                  <form onSubmit={handleSubmit}>
                      <div className="bx-input-fix">
                          {/* <label htmlFor="ActivateKey"></label> */}
                          <input
                              type="text"
                              id="ActivateKey"
                              name="ActivateKey"
                              value={ActivateKey}
                              onChange={handleInputActivateKey}
                              placeholder="กรุณากรอก Activate Key"
                          />
                      </div>
                    
                      <div className='bx-button width100'>
                          <button type="submit"  className='button-nocolor width100'>ค้นหา</button>
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

export default AppReadScore;