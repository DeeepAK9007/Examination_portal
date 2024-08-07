import AddRoomDet from "./addRoomdet";
import NavBar from "./navbar";
import RoomConf from "./roomConf";

function Room() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddRoomDet />
        {/* Render the component for adding room details */}
        <RoomConf />
        {/* Render the component for room configuration */}
      </div>
    </div>
  );
}

export default Room;
