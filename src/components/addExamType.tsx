import React, { useState } from "react";
import "./styles.css";
import { ExamTypeType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom alert component for Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddRoomDet() {
  // State variables to manage form inputs and Snackbar
  const [examType, setExamType] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  // Function to handle form submission
  async function addExamType(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    // Check if all required fields are filled
    if (!examType || !remarks || !actStatus) {
      setSnackbarMessage("Please fill all the required fields!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      const newExamType: ExamTypeType = {
        exam_type_name: examType,
        remark: remarks,
        status: actStatus,
      };

      console.log(newExamType);

      const jsonobj = JSON.stringify(newExamType);
      console.log(jsonobj);
      const encode = btoa(jsonobj);
      console.log(encode);
      const seshID = sessionStorage.getItem("key");
      console.log(seshID);

      // Send a POST request to add the new exam type
      const response = await fetch(
        "http://localhost:8081/api/exam_type?session_id=" +
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

      // Check response and set appropriate Snackbar message and severity
      if (jsonData.errCode == 0) {
        setSnackbarMessage("ExamType added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to add ExamType");
      }
    } catch (error) {
      setSnackbarMessage("Failed to add ExamType.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  // Function to handle Snackbar close event
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
        <h3>Exam Type</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form
        id="examtypeform"
        className="d-flex flex-row jutify-content-evenly w-100"
      >
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: examType ? "none" : "" }}
            >
              <label htmlFor="roomno">Exam Type</label>
              <span className="star">*</span>
            </div>
            <input
              id="roomno"
              type="text"
              className="form-control"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: remarks ? "none" : "" }}
            >
              <label htmlFor="capa">Remarks</label>
              <span className="star">*</span>
            </div>
            <input
              id="capa"
              type="string"
              className="form-control"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />
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
              onClick={addExamType}
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
