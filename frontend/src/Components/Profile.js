import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEyeSlash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function AppProfile(){
    const [ClickUpdate,setClickUpdate] = useState(false);
    const handClickUpdate = () => setClickUpdate(!ClickUpdate);


    const [Email, setEmail] = useState('64015142@kmitl.ac.th');
    const [Tel, setTel] = useState('0863004596');
    const [password, setpassword] = useState('64015142');
    const [Confirmpassword, setConfirmpassword] = useState('64015142');

    const handleInputEmail = (e) => { setEmail(e.target.value); };
    const handleInputTel = (e) => {setTel(e.target.value);};
    const handleInputpassword = (e) => { setpassword(e.target.value); };
    const handleInputConfirmpassword = (e) => {setConfirmpassword(e.target.value);};

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', Email);
        console.log('Tel:', Tel);
        console.log('password:', password);
        console.log('Confirmpassword:', Confirmpassword);
    };
    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">ประวัติส่วนตัว</Link>/</p>
                        <div className='bx-grid2-topic'>
                            <h2>ประวัติส่วนตัว</h2>
                            
                            <div className='flex-end'  onClick={handClickUpdate}>
                                <p className='button-update'>แก้ไข</p>
                            </div>
                            
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-set">
                                <h3>ข้อมูลผู้ใช้</h3>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Email">อีเมล์</label>
                                    <input
                                        type="text"
                                        id="Email"
                                        name="Email"
                                        value={Email}
                                        onChange={handleInputEmail}
                                        placeholder="e-mail"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                    {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''}
                                    
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Tel">เบอร์โทร</label>
                                    <input
                                        type="text"
                                        id="Tel"
                                        name="Tel"
                                        value={Tel}
                                        onChange={handleInputTel}
                                        placeholder="เบอร์โทร"
                                        disabled={ClickUpdate ? '':"disabled"}
                                    />
                                        {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''}
                                </div>
                                <div className="bx-input inline-grid">
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
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faEyeSlash} />:''} */}
                                </div>
                                <div className='space10'></div>
                                <h3>ข้อมูลอาชีพ</h3>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="job">อาชีพ</label>
                                    <input
                                        type="text"
                                        id="job"
                                        name="job"
                                        value={this}
                                        onChange={this}
                                        placeholder="อาชีพ"
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Department">ภาค/สาขา/สาย</label>
                                    <input
                                        type="text"
                                        id="Department"
                                        name="Department"
                                        value={this}
                                        onChange={this}
                                        placeholder="ภาค/สาขา"
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Faculty">สังกัด/คณะ</label>
                                    <input
                                        type="text"
                                        id="Faculty"
                                        name="Faculty"
                                        value={this}
                                        onChange={this}
                                        placeholder="สังกัด/คณะ"
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className="bx-input inline-grid">
                                    <label htmlFor="Workplace">องค์กรการศึกษา/สถานที่ทำงาน</label>
                                    <input
                                        type="text"
                                        id="Workplace"
                                        name="Workplace"
                                        value={this}
                                        onChange={this}
                                        placeholder="สถานที่ทำงาน"
                                    />
                                    {/* {ClickUpdate ? <FontAwesomeIcon icon={faPenToSquare} />:''} */}
                                </div>
                                <div className={ClickUpdate ? 'bx-button':'none bx-button'}>
                                    <button type="reset" className='button-reset'>รีเซ็ท</button>
                                    <button type="submit"  className='button-submit'>อัปเดตข้อมูล</button>
                                </div>
                            </div>
                        </form>
                        {ClickUpdate ? '' :<div className='space10'></div>}
                        <hr></hr>
                        <div className='space10'></div>
                        เลือกประเภทสิทธิ์การใช้งานที่ต้องการในระบบ (กรณีเลือกจัดการรายวิชา ต้องทำการยืนยันตัวตน ไม่สามารถเลือกดูคะแนนได้)
                       
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppProfile;