import NavBar from "./navbar";
import AddSched from "./addSchedule";
import Scheduler from "./sheduler";

function Schedule() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100">
        <AddSched />
        {/* Component to add a new schedule */}
        <Scheduler />
        {/* Component to display existing schedules */}
      </div>
    </div>
  );
}

export default Schedule;
