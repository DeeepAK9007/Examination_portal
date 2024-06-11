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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/batch" element={<Batch />} />
      <Route path="/room" element={<Room />} />
      <Route path="/term" element={<Term />} />
      <Route path="/course" element={<Course />} />
      <Route path="/progCord" element={<ProgCord />} />
      <Route path="/attend" element={<Attendance />} />
      <Route path="/incident" element={<Incident />} />
    </Routes>
  );
}

export default App;
