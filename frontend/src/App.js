import './App.css';
import './Style/StyleProperty.css'
import './Style/Style.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AppContact from './Components/Contact';
import AppHeader from './Components/Header';
import AppHome from './Components/Home';
import AppProfile from './Components/Profile';
import AppSingIn from './Components/SingIn';
import AppSingUp from './Components/SingUp';

import AppToolsDropZone from './Components/Tools/ToolsDropZone';
import AppToolsImg from './Components/Tools/ToolsImg';
import AppToolsSweetAlert from './Components/Tools/ToolsSweetAlert';

import AppSubject from './Components/Subject/Subject';
import AppCreateSubject from './Components/Subject/CreateSubject';
import AppUpdateSubject from './Components/Subject/UpdateSubject';
import AppSubjectNo from './Components/Subject/SubjectNo';
import AppCreateExam from './Components/Subject/CreateExam';
import AppUpdateExam from './Components/Subject/UpdateExam';
import AppExam from './Components/Subject/Exam';
import AppUploadStudent from './Components/Subject/UploadStudent';
import AppQuestionnaire from './Components/Questionnaire/Questionnaire';
import AppCreateQuestionnaire from './Components/Questionnaire/CreateQuestionnaire';
import AppCreateAnswerSheet from './Components/Subject/CreateAnswerSheet';
import AppExamAnswer from './Components/Subject/ExamAnswer';
import AppCreateExamAnswer from './Components/Subject/CreateExamAnswer';
import AppShowQuestionnaire from './Components/Questionnaire/ShowQuestionnaire';
import AppCheckAnswerSheet from './Components/Subject/CheckAnswerSheet';
import AppCreateType from './Components/Admin/CreateType';
import AppUploadAnswerSheet from './Components/Subject/UploadAnswerSheet';


function App() {
  return (
      <Router>
      <Routes>
        <Route path='/ToolsDropZone' element={<AppToolsDropZone />}></Route>
        <Route path='/ToolsImg' element={<AppToolsImg />}></Route>
        <Route path='/ToolsSweetAlert' element={<AppToolsSweetAlert />}></Route>

        
        <Route path='SingIn' element={<AppSingIn />}></Route>
        <Route path='SingUp' element={<AppSingUp />}></Route>
        <Route path='*' element={<AppHeader />}></Route>
      </Routes>
      <Routes>
        <Route path='/' element={<AppHome />}></Route>
        <Route path='/Home' element={<AppHome />}></Route>

        <Route path='/Subject' element={<AppSubject />}></Route>
        <Route path='/CreateSubject' element={<AppCreateSubject />}></Route>
        <Route path='/Subject/UpdateSubject/:id' element={<AppUpdateSubject />}></Route>
        <Route path='/Subject/SubjectNo/:id' element={<AppSubjectNo />}></Route>
        <Route path='/Subject/SubjectNo/CreateExam/:id' element={<AppCreateExam />}></Route>
        <Route path='/Subject/SubjectNo/UpdateExam/:id' element={<AppUpdateExam />}></Route>
        <Route path='/Subject/SubjectNo/Exam/:id' element={<AppExam />}></Route>
        <Route path='/Subject/SubjectNo/Exam/UploadStudent/:id' element={<AppUploadStudent />}></Route>
        <Route path='/Subject/SubjectNo/Exam/CreateAnswerSheet/:id' element={<AppCreateAnswerSheet />}></Route>
        <Route path='/Subject/SubjectNo/Exam/ExamAnswer/:id' element={<AppExamAnswer />}></Route>
        <Route path='/Subject/SubjectNo/Exam/ExamAnswer/CreateExamAnswer/:id' element={<AppCreateExamAnswer />}></Route>
        <Route path='/Subject/SubjectNo/Exam/UploadAnswerSheet/:id' element={<AppUploadAnswerSheet />}></Route>
        <Route path='/Subject/SubjectNo/Exam/CheckAnswerSheet/:id' element={<AppCheckAnswerSheet />}></Route>

        <Route path='/Questionnaire' element={<AppQuestionnaire />}></Route>
        <Route path='/Questionnaire/ShowQuestionnaire' element={<AppShowQuestionnaire />}></Route>
        <Route path='/CreateQuestionnaire' element={<AppCreateQuestionnaire />}></Route>


        <Route path='/Profile' element={<AppProfile />}></Route>
        <Route path='/Contact' element={<AppContact />}></Route>

        <Route path='/Admin/Type/create' element={<AppCreateType />}></Route>
        

        
      </Routes>
    </Router>

  );
}

export default App;
