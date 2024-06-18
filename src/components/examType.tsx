import AddExamType from "./addExamType";
// import AddTerm from "./addTerm";
import ExamTypeConf from "./examTypeConf";
import NavBar from "./navbar";
// import TermConf from "./termConf";

function ExamType() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamType />
        <ExamTypeConf />
      </div>
    </div>
  );
}

export default ExamType;
