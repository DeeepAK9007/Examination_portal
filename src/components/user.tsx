import NavBar from "./navbar";
import AddUser from "./addUserDetail";
import UserCourseConf from "./userCourseConf";

function User()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100">
              <AddUser/>  
              <UserCourseConf/>
            </div>
        </div>
            
    );
}

export default User;