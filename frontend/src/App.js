import './App.css';
import './Style/Style.css'
import './Style/StyleProperty.css'
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
import AppReadScore from './Components/ReadScore';
import AppSingIn from './Components/SingIn';
import AppSingUp from './Components/SingUp';
import AppToolsDropZone from './Components/Tools/ToolsDropZone';
import AppToolsImg from './Components/Tools/ToolsImg';
import AppCreateExam from './Components/User/CreateExam';
import AppCreateQuestionnaire from './Components/User/CreateQuestionnaire';
import AppCreateSubject from './Components/User/CreateSubject';
import AppExam from './Components/User/Exam';
import AppQuestionnaire from './Components/User/Questionnaire';
import AppSubject from './Components/User/Subject';
import AppSubjectNo from './Components/User/SubjectNo';
import AppUpdateExam from './Components/User/UpdateExam';
import AppUpdateSubject from './Components/User/UpdateSubject';
import AppUploadStudent from './Components/User/UploadStudent';
import AppToolsSweetAlert from './Components/Tools/ToolsSweetAlert';


function App() {
  return (
      <Router>
      <Routes>
        <Route path='/ToolsDropZone' element={<AppToolsDropZone />}></Route>
        <Route path='/ToolsImg' element={<AppToolsImg />}></Route>
        <Route path='/ToolsSweetAlert' element={<AppToolsSweetAlert />}></Route>

        
        <Route path='SingIn' element={<AppSingIn />}></Route>
        <Route path='SingUp' element={<AppSingUp />}></Route>
        <Route path='ReadScore' element={<AppReadScore />}></Route>
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

        <Route path='/Questionnaire' element={<AppQuestionnaire />}></Route>
        <Route path='/CreateQuestionnaire' element={<AppCreateQuestionnaire />}></Route>


        <Route path='/Profile' element={<AppProfile />}></Route>
        <Route path='/Contact' element={<AppContact />}></Route>
        

        
      </Routes>
    </Router>

  );
}

export default App;
