import {
    Link,
    useParams
} from "react-router-dom";
import React, { useState } from 'react';

function AppCreateExamAnswer(){

    const { id } = useParams();
    // สร้างคำตอบ
    const NumExam = 10;


    const [checkboxValues1, setCheckboxValues1] = useState(Array(NumExam).fill(false));//ก
    const [checkboxValues2, setCheckboxValues2] = useState(Array(NumExam).fill(false));//ข
    const [checkboxValues3, setCheckboxValues3] = useState(Array(NumExam).fill(false));//ค
    const [checkboxValues4, setCheckboxValues4] = useState(Array(NumExam).fill(false));//ง
    const [checkboxValues5, setCheckboxValues5] = useState(Array(NumExam).fill(false));//จ
    const [checkboxValues6, setCheckboxValues6] = useState(Array(NumExam).fill(false));//ฉ
    const [checkboxValues7, setCheckboxValues7] = useState(Array(NumExam).fill(false));//ช
    const [checkboxValues8, setCheckboxValues8] = useState(Array(NumExam).fill(false));//ซ
    const [inputValues1, setInputValues1] = useState(Array(NumExam).fill('1'));//คะแนนตอบถูก	
    const [inputValues2, setInputValues2] = useState(Array(NumExam).fill('0'));//คะแนนตอบผิด
    const handleCheckbox1Change = (index) => {
      const newCheckboxValues = [...checkboxValues1];
      newCheckboxValues[index] = !newCheckboxValues[index];
      setCheckboxValues1(newCheckboxValues);
    };
    const handleCheckbox2Change = (index) => {
        const newCheckboxValues = [...checkboxValues2];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues2(newCheckboxValues);
    };
    const handleCheckbox3Change = (index) => {
        const newCheckboxValues = [...checkboxValues3];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues3(newCheckboxValues);
    };
    const handleCheckbox4Change = (index) => {
        const newCheckboxValues = [...checkboxValues4];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues4(newCheckboxValues);
    };
    const handleCheckbox5Change = (index) => {
        const newCheckboxValues = [...checkboxValues5];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues5(newCheckboxValues);
    };
    const handleCheckbox6Change = (index) => {
        const newCheckboxValues = [...checkboxValues6];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues6(newCheckboxValues);
    };
    const handleCheckbox7Change = (index) => {
        const newCheckboxValues = [...checkboxValues7];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues7(newCheckboxValues);
    };
    const handleCheckbox8Change = (index) => {
        const newCheckboxValues = [...checkboxValues8];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues8(newCheckboxValues);
    };

    const handleInput1Change = (index, value) => {
        const newInputValues = [...inputValues1];
        newInputValues[index] = value;
        setInputValues1(newInputValues);
    };
    const handleInput2Change = (index, value) => {
        const newInputValues = [...inputValues2];
        newInputValues[index] = value;
        setInputValues2(newInputValues);
    };

    const ChangeAnswerFormat = (checkboxValues , index) => {
        if(index === 'A'){
            return checkboxValues.map(value => value ? 'A' : null);
        }
        else if(index === 'B'){
            return checkboxValues.map(value => value ? 'B' : null);
        }
        else if(index === 'C'){
            return checkboxValues.map(value => value ? 'C' : null);
        }
        else if(index === 'D'){
            return checkboxValues.map(value => value ? 'D' : null);
        }
        else if(index === 'E'){
            return checkboxValues.map(value => value ? 'E' : null);
        }
        else if(index === 'F'){
            return checkboxValues.map(value => value ? 'F' : null);
        }
        else if(index === 'G'){
            return checkboxValues.map(value => value ? 'G' : null);
        }
        else if(index === 'H'){
            return checkboxValues.map(value => value ? 'H' : null);
        }

       
    };
    const setChoiceAnswers = (A, B, C, D, E, F, G, H) => {
        console.log(A)
        console.log(B)
        return A.map((value1, index) => {
            const value2 = B[index];
            const value3 = C[index];
            const value4 = D[index];
            const value5 = E[index];
            const value6 = F[index];
            const value7 = G[index];
            const value8 = H[index];
            const nonNullValues = [value1, value2, value3 ,value4, value5, value6, value7, value8].filter(value => value !== null);
            return nonNullValues.join(':');
        });
    }
      

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('checkboxValues1:', checkboxValues1)
        console.log('checkboxValues2:', checkboxValues2)
        console.log('checkboxValues3:', checkboxValues3)
        console.log('checkboxValues4:', checkboxValues4)
        console.log('checkboxValues5:', checkboxValues5)
        console.log('checkboxValues6:', checkboxValues6)
        console.log('checkboxValues7:', checkboxValues7)
        console.log('checkboxValues8:', checkboxValues8)
        console.log('inputValues1:', inputValues1)
        console.log('inputValues2:', inputValues2)
        console.log('checkboxValues1:',checkboxValues1)

        const output = setChoiceAnswers(
            ChangeAnswerFormat(checkboxValues1,"A"),
            ChangeAnswerFormat(checkboxValues2,"B"),
            ChangeAnswerFormat(checkboxValues3,"C"),
            ChangeAnswerFormat(checkboxValues4,"D"),
            ChangeAnswerFormat(checkboxValues5,"E"),
            ChangeAnswerFormat(checkboxValues6,"F"),
            ChangeAnswerFormat(checkboxValues7,"G"),
            ChangeAnswerFormat(checkboxValues8,"H")
        )
        console.log(output);
    }
    return(

        <div className='content'>
        <main>
            <div className='box-content'>
                <div className='box-content-view'>
                    <div className='bx-topic light'>
                        <p><Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject">จัดการรายวิชา</Link> / <Link to="/Subject/SubjectNo/1"> SubjectNoxxxxxxx </Link> / <Link to="/Subject/SubjectNo/Exam/1"> Examxxxxxxx </Link> / <Link to=""> สร้างเฉลย </Link></p>
                        <div className='bx-grid2-topic'>
                            <h2>สร้างเฉลยด้วยตนเอง</h2>                           
                        </div> 
                    </div>
                    <div className='bx-details light'>
                        <div className="bx-grid-detail-topic">
                        
                        </div>
                        <p>ID from URL: {id}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="tableQue">
                                <table>
                                    <thead>
                                        <tr className="grey">
                                            <th className="w60px" rowSpan="2">หัวข้อ</th>
                                            <th colSpan="8">คำตอบ</th>
                                            <th colSpan="2">เกณฑ์คะแนน</th>

                                        </tr>
                                        <tr className="grey">
                                            <th className="w60px">ก</th>
                                            <th className="w60px">ข</th>
                                            <th className="w60px">ค</th>
                                            <th className="w60px">ง</th>
                                            <th className="w60px">จ</th>
                                            <th className="w60px">ฉ</th>
                                            <th className="w60px">ช</th>
                                            <th className="w60px">ซ</th>
                                            <th className="w60px">คะแนนตอบถูก</th>
                                            <th className="w60px">คะแนนตอบผิด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: NumExam }, (_, index) => (
                                            <tr key={index}>
                                                <td className="center">{index+1}</td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues1[index]}
                                                        onChange={() => handleCheckbox1Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues2[index]}
                                                        onChange={() => handleCheckbox2Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues3[index]}
                                                        onChange={() => handleCheckbox3Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues4[index]}
                                                        onChange={() => handleCheckbox4Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues5[index]}
                                                        onChange={() => handleCheckbox5Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues6[index]}
                                                        onChange={() => handleCheckbox6Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues7[index]}
                                                        onChange={() => handleCheckbox7Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flexCenter">
                                                        <input
                                                        className="mgR10"
                                                        type="checkbox"
                                                        checked={checkboxValues8[index]}
                                                        onChange={() => handleCheckbox8Change(index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <input
                                                        type="text"
                                                        id={`input-${index}`}
                                                        name={`input-${index}`}
                                                        value={inputValues1[index]}
                                                        onChange={(e) => handleInput1Change(index, e.target.value)}
                                                        placeholder=""
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <input
                                                        type="text"
                                                        id={`input-${index}`}
                                                        name={`input-${index}`}
                                                        value={inputValues2[index]}
                                                        onChange={(e) => handleInput2Change(index, e.target.value)}
                                                        placeholder=""
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='bx-button'>
                                    <div className='button-reset'>รีเซ็ท</div>
                                    <button type="submit" className='button-submit'>บันทึก</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>

    );

}

export default AppCreateExamAnswer;