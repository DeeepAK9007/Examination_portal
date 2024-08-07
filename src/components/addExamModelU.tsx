import React, { useState, useEffect } from "react";
import { examModeUpdateType } from "../types/myTypes";
import { addExam_mode } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom Alert component for Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddExamModelUp() {
  // State variables for form fields and Snackbar
  const [dateTime, setDateTime] = useState<string>("");
  const [examName, setExamName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [invigilator, setInvigilator] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [supervisor, setSupervisor] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [mode, setMode] = useState<string>("");

  // State for holding the exam data object
  const [examData, setExamData] = useState<examModeUpdateType>({
    date: "",
    examination_name: "",
    course_name: "",
    room_number: "",
    invigilator: "",
    instructor: "",
    supervisor: "",
    mode: "",
    remarks: "",
    status: "",
  });

  // Snackbar state variables
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  // useEffect to update examData whenever any form field changes
  useEffect(() => {
    setExamData({
      date: dateTime,
      examination_name: examName,
      course_name: selectedCourse,
      room_number: roomNumber,
      invigilator: invigilator,
      instructor: instructor,
      supervisor: supervisor,
      mode: mode,
      remarks: remark,
      status: status,
    });
  }, [
    dateTime,
    examName,
    selectedCourse,
    roomNumber,
    invigilator,
    instructor,
    supervisor,
    remark,
    status,
  ]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if required fields are filled
    if (!mode || !status) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      console.log("examData: ", examData);
      const res = await addExam_mode(examData); // API call to add exam mode
      const jsonData = await res?.json();
      console.log("response json after submit,", jsonData);

      // Check for success response
      if (jsonData.errCode == 0) {
        setSnackbarMessage("Course added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Failed to add user.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close
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
        <h3>Update Exam Model Mode</h3>
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
              style={{ display: dateTime ? "none" : "" }}
            >
              <label htmlFor="datetime">StartDate - EndDate</label>
              <span className="star">*</span>
            </div>
            <input
              id="datetime"
              type="text"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              disabled
              required
            />
          </div>

          {/* Course selection field */}
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: selectedCourse ? "none" : "" }}
            >
              <label htmlFor="file">Select Course</label>
              <span className="star"> *</span>
            </div>
            <select
              name="Exam Role"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled
            >
              <option
                id="examrole"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              <option value="DSA">DSA</option>
              <option value="Computer Architecture">
                Computer Architecture
              </option>
              <option value="DMS">DMS</option>
            </select>
          </div>

          {/* Invigilator selection field */}
          <div className="mb-3">
            <select
              name="Assign invigilator"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={invigilator}
              onChange={(e) => setInvigilator(e.target.value)}
              disabled
            >
              <option value="" disabled selected>
                Assign Invigilator
              </option>
              <option value="Maxx">Maxx</option>
              <option value="John">John</option>
              <option value="Cipher">Cipher</option>
            </select>
          </div>

          {/* Supervisor selection field */}
          <div className="mb-3">
            <select
              name="Assign supervisor"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              disabled
            >
              <option value="" disabled selected>
                Supervisor
              </option>
              <option value="Maxx">Maxx</option>
              <option value="John">John</option>
              <option value="Cipher">Cipher</option>
            </select>
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: status ? "none" : "" }}
            >
              <label htmlFor="mode">Mode</label>
              <span className="star"> *</span>
            </div>
            <select
              name="mode"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option id="examrole" value="" disabled selected></option>
              <option value="Off-line">Off-line</option>
              <option value="On-line">On-line</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: examName ? "none" : "" }}
            >
              <label htmlFor="examname">Exam Name</label>
              <span className="star">*</span>
            </div>
            <input
              id="examname"
              type="text"
              className="form-control"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              disabled
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: roomNumber ? "none" : "" }}
            >
              <label htmlFor="loc">Location/Room</label>
              <span className="star"> *</span>
            </div>
            <select
              name="Assign invigilator"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              disabled
            >
              <option
                id="loc"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              <option value="R-203">R-203</option>
              <option value="R-200">R-200</option>
              <option value="R-400">R-400</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              name="Assign instructor"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              disabled
            >
              <option value="" disabled selected>
                Instructor
              </option>
              <option value="Andrew NG">Andrew NG</option>
              <option value="Angela Yu">Angela Yu</option>
              <option value="Harry<">Harry</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: status ? "none" : "" }}
            >
              <label htmlFor="status">Status</label>
              <span className="star"> *</span>
            </div>
            <select
              name="status"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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

export default AddExamModelUp;
