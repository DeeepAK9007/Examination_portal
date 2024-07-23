import React, { useState } from "react";
import "./styles.css";
import { RoomType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddRoomDet() {
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [roomCapacity, setCapacity] = useState<number | undefined>(undefined);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning">(
    "success"
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlock(event.target.value);
    console.log(event.target.value);
  };

  async function addSingRoom(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(!roomNumber || !selectedBlock || !roomCapacity || !actStatus){
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      const newRoom: RoomType = {
        room_number: roomNumber,
        block: selectedBlock,
        capacity: roomCapacity,
        status: actStatus,
      };

      console.log(newRoom);

      const jsonobj = JSON.stringify(newRoom);
      console.log(jsonobj);
      const encode = btoa(jsonobj);
      console.log(encode);
      const seshID = sessionStorage.getItem("key");
      console.log(seshID);

      const response = await fetch(
        "http://localhost:8081/api/room?session_id=" +
          seshID +
          "&resource=" +
          encode,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          mode: "cors",
        }
      );
      console.log(response);
      const jsonData = await response?.json();
      console.log("response json after submit,", jsonData);
      if (jsonData.errCode == 0) {
        setSnackbarMessage("Room added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to add Room");
      }
    } catch (error) {
      setSnackbarMessage("Failed to add Room.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>Add Room Detail</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: roomNumber ? "none" : "" }}
            >
              <label htmlFor="roomno">Room Number</label>
              <span className="star">*</span>
            </div>
            <input
              id="roomno"
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder"
              style={{ display: roomCapacity ? "none" : "" }}
            >
              <label htmlFor="capa">Capacity</label>
              <span className="star">*</span>
            </div>
            <input
              id="capa"
              type="number"
              className="form-control"
              value={roomCapacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              required
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
              <span className="star"> *</span>
            </div>
            <select
              name="block"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={selectedBlock}
              onChange={handleSelectChange}
            >
              <option id="examrole" value="" disabled selected></option>
              <option value="Ramanujan">Ramanujan</option>
              <option value="Bhaskar">Bhaskar</option>
              <option value="Lilawati">Lilawati</option>
            </select>
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: actStatus ? "none" : "" }}
            >
              <label htmlFor="file">Status</label>
              <span className="star"> *</span>
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
              onClick={addSingRoom}
            >
              Save
            </button>
          </div>
        </div>
      </form>
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

export default AddRoomDet;
