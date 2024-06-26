import Login from "./components/login";
import Schedule from "./components/examScheduling";
import User from "./components/user";
import { Route, Routes } from "react-router-dom";
import Batch from "./components/batch";
import Room from "./components/room";
import Term from "./components/term";
import Course from "./components/course";
import ProgCord from "./components/progCordi";
import Attendance from "./components/attendance";
import Incident from "./components/incident";
import ExamType from "./components/examType";
import ExamMode from "./components/examMode";
import ExamModelUpdate from "./components/examModelUpdate";
import IssueReporting from "./components/issueReporting";
import AddResource from "./components/updateTerm";
import UpdateCourse from "./components/updateCourse";
import UpdateBatch from "./components/updateBatch";
import UpdateExamMode from "./components/updateExamMode";
import UpdateExamType from "./components/updateExamType";
import UpdateRoom from "./components/updateRoom";
import UpdateUser from "./components/updateUser";
import { useContext } from "react";
import { LoginContext } from "./context/loginContext";
import UploadGrade from "./components/uploadGrades";

function App() {

  const logstat=useContext(LoginContext);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {logstat.isLoggedIn}?
      <>
        <Route path="/user" element={<User />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/room" element={<Room />} />
        <Route path="/term" element={<Term />} />
        <Route path="/course" element={<Course />} />
        <Route path="/progCord" element={<ProgCord />} />
        <Route path="/attend" element={<Attendance />} />
        <Route path="/incident" element={<Incident />} />
        <Route path="/examType" element={<ExamType />} />
        <Route path="/examMode" element={<ExamMode />} />
        <Route path="/examModelupdate" element={<ExamModelUpdate />} />
        <Route path="/issuereporting" element={<IssueReporting />} />
        <Route path="/editTerm" element={<AddResource />} />
        <Route path="/editCourse" element={<UpdateCourse />} />
        <Route path="/editBatch" element={<UpdateBatch />} />
        <Route path="/editExamMode" element={<UpdateExamMode />} />
        <Route path="/editExamType" element={<UpdateExamType />} />
        <Route path="/editRoom" element={<UpdateRoom />} />
        <Route path="/editUser" element={<UpdateUser />} />
        <Route path="/uploadGrade" element={<UploadGrade/>}/>
      </>:
      <></>
    
    </Routes>
  );
}

export default App;
