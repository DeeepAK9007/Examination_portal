import AddIncident from "./addIncident";
import IncidentTab from "./incidentTab";
import NavBar from "./navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IncidentProvider } from "../context/IncidentContext";

function Incident() {
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
        <IncidentProvider>
          <AddIncident courseCode={CourseCode} courseName={CourseName} />
          <IncidentTab id={courseId} />
        </IncidentProvider>
      </div>
    </div>
  );
}

export default Incident;
