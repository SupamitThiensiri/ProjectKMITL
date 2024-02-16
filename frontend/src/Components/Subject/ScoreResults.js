import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from "../../Variables";

function AppScoreResults() {
    const { id } = useParams();

    const [scoreStats, setscoreStats] = useState({ max: 0, min: 0, avg: 0 });
    const [correctStats, setcorrectStats] = useState({ max: 0, min: 0, avg: 0 });
    const [wrongStats, setwrongStats] = useState({ max: 0, min: 0, avg: 0 });
    const [unresponsiveStats, setunresponsiveStats] = useState({ max: 0, min: 0, avg: 0 });

    const [data, setdata] = useState([]);

    const [Start, setStart] = useState(0);
    const [StartError, setStartError] = useState(0);

    const calculateStatistics = (property, dataArray) => {
        const values = dataArray.map(obj => parseInt(obj[property]));
        const max = Math.max(...values);
        const min = Math.min(...values);
        const sum = values.reduce((acc, val) => acc + val, 0);
        const avg = values.length > 0 ? sum / values.length : 0; // Handle division by zero
        return { max, min, avg };
    };

    const fetchDataExaminfo = async () => {
        try {
            const response = await fetch(variables.API_URL + "examinformation/detail/exam/" + id + "/", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            });
            const result = await response.json();

            if (result.err !== undefined) {
                setStartError(1);
            } else {
                setdata(result.non_duplicate_records);
                setscoreStats(calculateStatistics('score', result.non_duplicate_records));
                setcorrectStats(calculateStatistics('correct', result.non_duplicate_records));
                setwrongStats(calculateStatistics('wrong', result.non_duplicate_records));
                setunresponsiveStats(calculateStatistics('unresponsive', result.non_duplicate_records));
            }
        } catch (err) {
            console.error(err);
            setStartError(1);
        }
    };

    useEffect(() => {
        if (Start === 0) {
            fetchDataExaminfo();
            setStart(1);
        }
    }, [Start]); // Only run once when Start changes

    useEffect(() => {
        console.log("scoreStats:", scoreStats);
        console.log("correctStats:", correctStats);
        console.log("wrongStats:", wrongStats);
        console.log("unresponsiveStats:", unresponsiveStats);
    }, [scoreStats, correctStats, wrongStats, unresponsiveStats]); // Log state values after they've been updated

    
    return (
        <div className='content'>
            <main>
                <div className='box-content'>
                    <div className='box-content-view'>
                        <div className='bx-topic light'>
                            <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">รายวิชาทั้งหมด</Link> /</p>
                            <div className='bx-grid2-topic'>
                                <h2>แสดงผลลัพธ์คะแนน</h2>
                            </div>
                        </div>
                        <div className='bx-details light'>
                            <div>แสดงผลลัพธ์คะแนน</div>
                            <div className="tableSub">
                                <table className="width100">
                                    <thead>
                                        <tr>
                                            <th>รหัสนักศึกษา</th>
                                            <th>ชื่อนักศึกษา</th>
                                            <th>กลุ่มเรียน</th>
                                            <th>ชุดข้อสอบ</th>
                                            <th>จำนวนข้อถูก</th>
                                            <th>จำนวนข้อผิด</th>
                                            <th>จำนวนข้อที่ไม่ได้ตอบ</th>
                                            <th>คะแนนทั้งหมด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.stdid}</td>
                                                <td>{item.stdname}</td>
                                                <td>{item.section}</td>
                                                <td>{item.setexaminfo}</td>
                                                <td>{item.correct}</td>
                                                <td>{item.wrong}</td>
                                                <td>{item.unresponsive}</td>
                                                <td>{item.score}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td>Max :</td>
                                            <td>{correctStats.max}</td>
                                            <td>{wrongStats.max}</td>
                                            <td>{unresponsiveStats.max}</td>
                                            <td>{scoreStats.max}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td>Min :</td>
                                            <td>{correctStats.min}</td>
                                            <td>{wrongStats.min}</td>
                                            <td>{unresponsiveStats.min}</td>
                                            <td>{scoreStats.min}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td>Average :</td>
                                            <td>{correctStats.avg}</td>
                                            <td>{wrongStats.avg}</td>
                                            <td>{unresponsiveStats.avg}</td>
                                            <td>{scoreStats.avg}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AppScoreResults;
