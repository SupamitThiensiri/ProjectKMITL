import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const AppHome = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    };

    fetchData();
  }, []);

  return (
    <div className='content'>
            <main>
                <div className='box-content'>
                    {isLoading ?
                        <div className='box-content-view'>
                            <div className='bx-topic light '>
                                <div className='skeleton-loading'>
                                    <div className='skeleton-loading-topic'></div>
                                </div> 
                            </div>
                            <div className='bx-details light '>
                            <div className='skeleton-loading'>
                                    <div className='skeleton-loading-content'></div>
                                </div> 
                            </div>
                        </div>
                    :
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
                    }
                </div>
            </main>
        </div>
  );
}

export default AppHome;
