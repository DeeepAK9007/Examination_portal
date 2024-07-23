import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
import { roomMatchedType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteRoom } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateRoom() {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [roomCapacity, setCapacity] = useState<number | undefined>(undefined);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const roomId = new URLSearchParams(location.search).get("id");
  const roomobj = new URLSearchParams(location.search).get("room");
  console.log("Room id:", roomId);
  const [roomData, setRoomData] = useState<roomMatchedType>({
    id: "",
    room_number: "",
    block: "",
    capacity: 0,
    status: "",
  });

  useEffect(() => {
    if (roomId && roomobj) {
      const jsonobj = JSON.parse(atob(roomobj));
      setRoomNumber(jsonobj.room_number);
      setCapacity(jsonobj.capacity);
      setSelectedBlock(jsonobj.block);
      setActStat(jsonobj.status);
    } else {
      console.error("Room ID is null");
    }
  }, []);

  useEffect(() => {
    if (roomId && roomobj) {
      const jsonobj = JSON.parse(atob(roomobj));
      console.log(jsonobj);
      setRoomData({
        id: roomId,
        room_number: roomNumber ? roomNumber : jsonobj.room_number,
        block: selectedBlock ? selectedBlock : jsonobj.block,
        capacity: roomCapacity ? roomCapacity : jsonobj.capacity,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Room ID is null");
    }
  }, [roomNumber, roomCapacity, selectedBlock, actStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomId) {
      console.log("RoomData: ", roomData);
      await updateOrDeleteRoom(roomId, roomData, "MODIFY");
      setSnackbarMessage("Room updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/room");
    } else {
      console.error("Room ID is null");
      setSnackbarMessage("Failed to update Room.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    navigate("/batch");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Room Detail
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: roomNumber ? "none" : "" }}
              >
                <label htmlFor="roomno">Room Number</label>
              </div>
              <input
                id="roomno"
                type="text"
                className="form-control"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder"
                style={{ display: roomCapacity ? "none" : "" }}
              >
                <label htmlFor="capa">Capacity</label>
              </div>
              <input
                id="capa"
                type="number"
                className="form-control"
                value={roomCapacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: selectedBlock ? "none" : "" }}
              >
                <label htmlFor="file">Block</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                <option value="Ramanujan">Ramanujan</option>
                <option value="Bhaskar">Bhaskar</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: actStatus ? "none" : "" }}
              >
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={actStatus}
                onChange={(e) => setActStat(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "105px", height: "44px" }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateRoom;
