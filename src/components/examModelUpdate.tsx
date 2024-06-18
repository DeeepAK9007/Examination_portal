import NavBar from "./navbar";
import ExamModelUpdateTab from "./examModelUTab";
import AddExamModelUp from "./addExamModelU";

function ExamModelUpdate() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamModelUp />
        <ExamModelUpdateTab />
      </div>
    </div>
  );
}

export default ExamModelUpdate;
