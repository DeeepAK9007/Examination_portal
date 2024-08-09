import AddProgSched from "./addProgCordSched";
import NavBar from "./navbar";
import ProgCordSchedConf from "./progCordiSchedCOnf";
function ProgCord() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddProgSched />
        {/* Render the AddProgSched component to add program schedules */}
        <ProgCordSchedConf />
        {/* Render the ProgCordSchedConf component to configure program schedules */}
      </div>
    </div>
  );
}

export default ProgCord;
