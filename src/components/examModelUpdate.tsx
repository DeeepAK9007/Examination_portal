import NavBar from "./navbar";
import ExamModelUpdateTab from "./examModelUTab";
import AddExamModelUp from "./addExamModelU";

function ExamModelUpdate() {
  return (
    <div className="d-flex flex-row">
      <NavBar />{/* Navigation bar component */}
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddExamModelUp />{/* Component for adding a new exam model update */}
        <ExamModelUpdateTab />{/* Component displaying the list of exam model updates */}
      </div>
    </div>
  );
}

export default ExamModelUpdate;
