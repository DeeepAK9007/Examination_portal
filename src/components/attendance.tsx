import AddAttend from "./addAttendance";
import AttendTab from "./attendTab";
import NavBar from "./navbar"

function Attendance()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100 justify-content-between">
                <AddAttend/>
                <AttendTab/>
            </div>
        </div>
    );
}

export default Attendance;