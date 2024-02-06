import '../Style/StyleOutSide.css';
import '../Style/Style.css';

import {
    Link
} from "react-router-dom";

function AppHeaderOutSide(){

    return(
        <div className='HeadderOutSide'>
            <nav>
                <div className="logo">
                    <div className='logo-icon'><img src='/img/logo.png' alt=''/></div>
                    <div className="logo-name"><img src='/img/namelogo.png' alt=''/></div>
                </div>
                <ul className="menu">
                    <li ><Link to="/SingUp" className='light'>สมัครสมาชิก</Link></li>
                    <li ><Link to="/SingIn" className='primary-blue'>เข้าสู่ระบบ</Link></li>
                </ul>
            </nav>
        </div>
    );

}

export default AppHeaderOutSide;