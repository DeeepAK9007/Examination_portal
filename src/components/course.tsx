import AddCourseDet from "./addCourseDet";
import CourseConf from "./courseConf";
import NavBar from "./navbar";

function Course() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddCourseDet />
        {/* Component to handle adding course details */}
        <CourseConf />
        {/* Component to handle course configuration */}
      </div>
    </div>
  );
}

export default Course;
