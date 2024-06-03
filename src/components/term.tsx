import AddTerm from "./addTerm";
import NavBar from "./navbar"
import TermConf from "./termConf";

function Term()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100">
                <AddTerm/>
                <TermConf/>
            </div>
        </div>
    );
}

export default Term;