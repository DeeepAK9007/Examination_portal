import AddRoomDet from "./addRoomdet";
import NavBar from "./navbar"
import RoomConf from "./roomConf";

function Room()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100">
                <AddRoomDet/>
                <RoomConf/>
            </div>
        </div>
    );
}

export default Room;