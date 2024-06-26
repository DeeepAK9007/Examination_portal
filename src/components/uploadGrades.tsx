import NavBar from "./navbar"
import UploadGradesPart1 from "./uploadGradespart1";

function UploadGrade()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/> 
            <div className="d-flex flex-column w-100 justify-content-between">
                <UploadGradesPart1/>
            </div>
        </div>
    );
}

export default UploadGrade;