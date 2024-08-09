import AddIncident from "./addIncident";
import IncidentTab from "./incidentTab";
import NavBar from "./navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IncidentProvider } from "../context/IncidentContext";

function Incident() {
  // Hook to get the current location object
  const location = useLocation();

  // State variables for course code and course name
  const [CourseCode, setCourseCode] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");

  // Get the course ID and course object from the URL search parameters
  const courseId = new URLSearchParams(location.search).get("id");
  const courseobj = new URLSearchParams(location.search).get("course");
  console.log("Course id:", courseId);
  console.log("Course obj", courseobj);

  // Effect to run when the component mounts
  useEffect(() => {
    if (courseId && courseobj) {
      // Decode and parse the course object from base64
      const jsonobj = JSON.parse(atob(courseobj));

      // Set the course code and name from the parsed object
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
        {/* Context provider to pass incident-related context to child components */}
        <IncidentProvider>
          {/* AddIncident component for adding new incidents, passing course code and name as props */}
          <AddIncident courseCode={CourseCode} courseName={CourseName} />
          {/* IncidentTab component for displaying incidents related to the course */}
          <IncidentTab id={courseId} />
        </IncidentProvider>
      </div>
    </div>
  );
}

export default Incident;
