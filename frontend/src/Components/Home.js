import './../App.css';
import '../Style/Home.css';
import Cookies from 'js-cookie';

function AppHome(){
    
    return(
        <div className='content'>
            <main>
                {/* <div className='bx-img-banner'>
                    <img src='../img/bannerhome.png' alt=''/>
                </div> */}
                <div className='box-content'>
                    <div className='box-content-view light'>
                        <div className='bx-topic light'>
                            หน้าแรก
                        </div>
                        <div className='bx-details light'>
                            <p>{Cookies.get('userid')}</p>
                            <p>{Cookies.get('email')}</p>
                            <p>{Cookies.get('fullname')}</p>
                            <p>{Cookies.get('googleid')}</p>
                            <p>{Cookies.get('usageformat')}</p>
                            <p>{Cookies.get('e_kyc')}</p>
                            <p>{Cookies.get('typesid')}</p>
                            <p>{Cookies.get('clientId')}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default AppHome;