import './../Style/Header.css';

import { useState  } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Link
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faCircleUser,faXmark, faHouse, faFolderPlus, faBook, faFileCirclePlus,faArrowRightFromBracket, faClipboardList, faUserShield,faBookOpenReader} from "@fortawesome/free-solid-svg-icons";


function AppHeader(){

    const [Sidebar,setSidebar] = useState(false);
    const handSidebar = () => setSidebar(!Sidebar);

    const location = useLocation();
    return(
        <>
        <div className={Sidebar ? "sidebar":"sidebar close"}>
            <Link to="Home" className="logo">
                <div className='logo-icon'><img src='/img/logo.png' alt=''/></div>
                <div className="logo-name"><img src='/img/namelogo.png' alt=''/></div>  
            </Link>
            <div className='logo-xmark' onClick={handSidebar}><FontAwesomeIcon icon={faXmark} /></div>
            <ul className="side-menu">
                <li className={location.pathname.includes("/Home") ? "active" : ""} ><Link to="/Home"><div className='iconmenu'><FontAwesomeIcon icon={faHouse} /></div>หน้าแรก</Link></li>
                <li className={location.pathname.includes("/Subject") ?"active":""}><Link to="/Subject"><div className='iconmenu'><FontAwesomeIcon icon={faBook} /></div>รายวิชาทั้งหมด</Link></li>
                <li className={location.pathname.includes("/CreateSubject") ?"active":""}><Link to="/CreateSubject"><div className='iconmenu'><FontAwesomeIcon icon={faFolderPlus} /></div>สร้างรายวิชา</Link></li>
                <li className={location.pathname.includes("/Questionnaire") ?"active":""}><Link to="Questionnaire"><div className='iconmenu'><FontAwesomeIcon icon={faClipboardList} /></div>แบบสอบถามทั้งหมด</Link></li>
                <li className={location.pathname.includes("/CreateQuestionnaire") ?"active":""}><Link to="CreateQuestionnaire"><div className='iconmenu'><FontAwesomeIcon icon={faFileCirclePlus} /></div>สร้างแบบสอบถาม</Link></li>
                <li><Link to="#"><div className='iconmenu'><FontAwesomeIcon icon={faBookOpenReader} /> </div>คู่มือการใช้งาน</Link></li>
                <li className={location.pathname.includes("/Contact") ?"active":""}><Link to="/Contact"><div className='iconmenu'><FontAwesomeIcon icon={faUserShield} /></div>ติดต่อ Admin</Link></li>
            </ul>
            <ul className="side-menu">
                <li className=''><Link to="SingIn"><div className='iconmenu danger-font'><FontAwesomeIcon icon={faArrowRightFromBracket} /></div><span className='danger-font'>Logout</span></Link></li>
            </ul>
        </div>
        <div className="content contentnavbar">
            <nav>
                <div className='bx bx-menu' onClick={handSidebar}><FontAwesomeIcon icon={faBars} /></div> 
                <form action="#">
                    <div className="form-input">
                        {/* <input type="search" placeholder="Search..." /> */}
                        {/* <button class="search-btn" type="submit"><i class='bx bx-search'></i></button> */}
                    </div>
                </form>
                {/* <input type="checkbox" id="theme-toggle" hidden/>
                <label htmlFor="theme-toggle" className="theme-toggle"></label> */}
                {/* <Link to="#" className="notif"><div className='bx bx-bell'><FontAwesomeIcon icon={faCircleUser} /></div><span className="count">1   </span></Link> */}
                <Link to="Profile" className="profile"><div className='profile-icon'><FontAwesomeIcon icon={faCircleUser} /></div></Link>
            </nav>
        </div>
        </>
    );

}

export default AppHeader;