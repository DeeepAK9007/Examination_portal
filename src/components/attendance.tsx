import AddAttend from "./addAttendance";
import AttendTab from "./attendTab";
import NavBar from "./navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AttendanceProvider } from "../context/AuthContext";

function Attendance() {
  // Get the current location from the router
  const location = useLocation();

  // State hooks for course details
  const [CourseCode, setCourseCode] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");

  // Extract course ID and course object from URL query parameters
  const courseId = new URLSearchParams(location.search).get("id");
  const courseobj = new URLSearchParams(location.search).get("course");
  console.log("Course id:", courseId);
  console.log("Course obj", courseobj);

  // Effect hook to parse course details when component mounts
  useEffect(() => {
    if (courseId && courseobj) {
      // Decode and parse the course object from base64
      const jsonobj = JSON.parse(atob(courseobj));
      setCourseCode(jsonobj.Course_Code);

      setCourseName(jsonobj.Course_Name);
    } else {
      console.error("Cousre ID is null");
    }
  }, []);
  return (
    <div className="d-flex flex-row">
      {/* Render the navigation bar */}
      <NavBar />

      {/* Main content area */}
      <div className="d-flex flex-column w-100 justify-content-between">
        {/* Wrap attendance components in a context provider */}
        <AttendanceProvider>
          {/* Component to add attendance, passing course details as props */}
          <AddAttend courseCode={CourseCode} courseName={CourseName} />
          {/* Component to display attendance tab, passing course ID as prop */}
          <AttendTab id={courseId} />
        </AttendanceProvider>
      </div>
    </div>
  );
}

export default Attendance;
