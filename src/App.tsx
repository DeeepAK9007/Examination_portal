import Login from "./components/login"
import Schedule from "./components/examScheduling";
import User from "./components/user";
import { Route, Routes } from "react-router-dom";
import Batch from "./components/batch";
import Room from "./components/room";
import Term from "./components/term";
import Course from "./components/course";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<User/>} />
      <Route path="/schedule" element={<Schedule/>} />
      <Route path="/batch" element={<Batch/>} />
      <Route path="/room" element={<Room/>} />
      <Route path="/term" element={<Term/>} />
      <Route path="/course" element={<Course/>} />
    </Routes>
  )
}

export default App;
