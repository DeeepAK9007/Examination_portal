import NavBar from "./navbar";
import AddSched from "./addSchedule";
import Scheduler from "./sheduler";

function Schedule()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100">
                <AddSched/>
                <Scheduler/>
            </div>
        </div>
            
    );
}

export default Schedule;