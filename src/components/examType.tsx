import AddExamType from "./addExamType";
import ExamTypeConf from "./examTypeConf";
import NavBar from "./navbar";

function ExamType() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamType />{/* Component to add a new exam type */}
        <ExamTypeConf />{/* Component to configure existing exam types */}
      </div>
    </div>
  );
}

export default ExamType;
