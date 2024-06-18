import AddExamMode from "./addExamMode";
// import AddTerm from "./addTerm";
import ExamModeConf from "./examModeConf";
import NavBar from "./navbar";
// import TermConf from "./termConf";

function ExamMode() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamMode />
        <ExamModeConf />
      </div>
    </div>
  );
}

export default ExamMode;
