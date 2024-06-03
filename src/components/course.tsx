import AddCourseDet from "./addCourseDet";
import AddTerm from "./addTerm";
import CourseConf from "./courseConf"
import NavBar from "./navbar"
import TermConf from "./termConf";

function Course()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100">
                <AddCourseDet/>
                <CourseConf/>
            </div>
        </div>
    );
}

export default Course;