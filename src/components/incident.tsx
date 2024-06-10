import AddIncident from "./addIncident";
import IncidentTab from "./incidentTab";
import NavBar from "./navbar"

function Incident()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100 justify-content-between">
                <AddIncident/>
                <IncidentTab/>
            </div>
        </div>
    );
}

export default Incident;