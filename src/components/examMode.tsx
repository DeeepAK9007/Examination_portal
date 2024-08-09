import AddExamMode from "./addExamMode";
import ExamModeConf from "./examModeConf";
import NavBar from "./navbar";

function ExamMode() {
  return (
    <div className="d-flex flex-row">
      <NavBar />{/* Render the navigation bar on the left side */}
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamMode />{/* Render the component to add new exam modes */}
        <ExamModeConf />{/* Render the component to configure existing exam modes */}
      </div>
    </div>
  );
}

export default ExamMode;
