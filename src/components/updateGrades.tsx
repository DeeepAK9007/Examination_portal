import NavBar from "./navbar"
import UploadGradesPart2 from "./uploadGradesprt2";

function UpdateGrade()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/> 
            <div className="d-flex flex-column w-100 justify-content-between">
                <UploadGradesPart2/>
            </div>
        </div>
    );
}

export default UpdateGrade;