import AddAttend from "./addAttendance";
import AttendTab from "./attendTab";
import NavBar from "./navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function Attendance() {
  const location = useLocation();
  const [CourseCode, setCourseCode] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");
  const courseId = new URLSearchParams(location.search).get("id");
  const courseobj = new URLSearchParams(location.search).get("course");
  console.log("Course id:", courseId);
  console.log("Course obj", courseobj);
  useEffect(() => {
    if (courseId && courseobj) {
      const jsonobj = JSON.parse(atob(courseobj));
      setCourseCode(jsonobj.Course_Code);

      setCourseName(jsonobj.Course_Name);
    } else {
      console.error("Cousre ID is null");
    }
  }, []);
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddAttend courseCode={CourseCode} courseName={CourseName} />
        <AttendTab id={courseId} />
      </div>
    </div>
  );
}

export default Attendance;
