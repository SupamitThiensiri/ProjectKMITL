import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faPen} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function AppCheckAnswerSheet(){

    const data = [
        { id: 1, studentId: '', courseId: '1', examSet: '1', result: '1', reason: 'Good', fileName: 'file1.txt' },
        { id: 2, studentId: '1', courseId: '1', examSet: '1', result: '1', reason: 'Incomplete', fileName: 'file2.txt' },
        { id: 3, studentId: '1', courseId: '1', examSet: '1', result: '1', reason: 'Excellent', fileName: 'file3.txt' },
    ];
    const showCustomAlert = (e) => {
        const isMobile = window.innerWidth < 780;
        Swal.fire({
          title: 'แก้ไขข้อผิดพลาด  ',
          html: `
            <div class='test' style="display: ${isMobile ? 'grid' : 'flex'}; ${isMobile ? 'grid-template-columns: 1fr;' : 'justify-content: center; align-items: center;'} width: 100%;">
                <div style="flex: 1; text-align: center;">
                    <img src="/img/answersheet_eng.jpg" alt="Image" style="width: 584px; height: 413px;">
                </div>
                <div style="flex: 1; margin-left: 20px; text-align: left;">
                    <div>
                        <label for="input1">รหัสนักศึกษา :</label>
                    </div>
                    <div>
                        <input type="text" id="input1" class="swal2-input" style="width: 250px; margin:0px;">
                        <FontAwesomeIcon className="green-font" icon={faCircleCheck} />
                        <FontAwesomeIcon className="green-font" icon={faCircleCheck} />
                        
                    </div>
                    <div>
                        <label for="input2">รหัสวิชา:</label>
                    </div>
                    <div>
                        <input type="text" id="input2" class="swal2-input" style="width: 250px;margin:0px;">
                    </div>
                    <div>
                        <label for="input3">ชุดข้อสอบ:</label>
                    </div>
                    <div>
                        <input type="text" id="input3" class="swal2-input" style="width: 250px;margin:0px;">
                    </div>
              </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'แก้ไข',
            cancelButtonText: 'ยกเลิก',
            customClass: {
            popup: 'custom-alert-popup',
            },
            preConfirm: () => {
                const input1Value = document.getElementById('input1').value;
                const input2Value = document.getElementById('input2').value;
                const input3Value = document.getElementById('input3').value;

                if (input1Value === '' || input2Value === '' || input3Value === '') {
                    Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                    return false;
                }
            }
        }).then((result) => {

            const input1Value = document.getElementById('input1').value;
            const input2Value = document.getElementById('input2').value;
            const input3Value = document.getElementById('input3').value;
            
            console.log('Input 1:', input1Value);
            console.log('Input 2:', input2Value);
            console.log('Input 3:', input3Value);

            if (input1Value === '' || input2Value === '' || input3Value === '') {
                Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                console.log('tt')
                return; // Prevent closing the alert
            }

            // if (input1Value === "" || input2Value === null || input3Value === null) {
            //     // Optionally, show an alert or take other action
            //     Swal.fire({
            //       icon: 'error',
            //       title: 'กรุณากรอกข้อมูลให้ครบ',
            //       text: '',
            //     });
            //     return; // Prevent closing the alert
            // }

            if (result.isConfirmed) {
                Swal.fire({
                icon: 'success',
                title: 'อัปเดทข้อมูลเสร็จสิ้น',
                text: '',
                });
            }
           
        });
    };
      
      

    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / รายวิชาทั้งหมด</p>
                        <div className='bx-grid2-topic'>
                            <h2>ตรวจความถูกต้องกระดาษคำตอบ</h2>
                            <div className='flex-end'>
                                <Link to="#">
                                    <p className='button-process'>วิเคราะห์ผล</p>
                                </Link>
                            </div>
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <div>
                            <div className="space10"></div>
                            <div className="fb">ตารางแสดงความถูกต้องของไฟล์กระดาษคำตอบ</div>
                            <div className="tableSub">
                                <table className="width100">
                                    <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>รหัสนักศึกษา</th>
                                        <th>รหัสวิชา</th>
                                        <th>ชุดข้อสอบ</th>
                                        <th>การตรวจคำตอบ</th>
                                        <th>สาเหตุ</th>
                                        <th>ชื่อไฟล์</th>
                                        <th>การจัดการ</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                        <td className="center">{item.id}</td>
                                        <td className="center">{item.studentId !== "" ?<FontAwesomeIcon  className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                        <td className="center">{item.courseId !== "" ?<FontAwesomeIcon  className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                        <td className="center">{item.examSet !== "" ?<FontAwesomeIcon  className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                        <td className="center">{item.result !== "" ?<FontAwesomeIcon  className="green-font" icon={faCircleCheck} />:<FontAwesomeIcon  className="danger-font" icon={faCircleXmark} />}</td>
                                        <td className="center">{item.reason }</td>
                                        <td className="center">{item.fileName }</td>
                                        <td className="center"> {<div onClick={showCustomAlert}><FontAwesomeIcon icon={faPen} /></div>}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* <td className="center">{ true ?<FontAwesomeIcon icon={faCircleCheck} />:<FontAwesomeIcon icon={faCircleXmark} />}</td> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppCheckAnswerSheet;