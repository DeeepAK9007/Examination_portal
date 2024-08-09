import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
import { ExamTypeType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteExamType } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Creating a custom Alert component using forwardRef for Material-UI Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateExamType() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  // intialize states
  const [examType, setExamType] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");

  // intialize states for snack bar message
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();// Hook to access the current location
  const examTypeId = new URLSearchParams(location.search).get("id");// Extracting the exam type ID from the query parameters
  const examtypeobj = new URLSearchParams(location.search).get("examtype");// Extracting the exam type object from the query parameters
  console.log("ExamType id:", examTypeId);
  const [examTypeData, setExamTypeData] = useState<ExamTypeType>({
    id: "",
    exam_type_name: "",
    remark: "",
    status: "",
  });

  useEffect(() => {
    // Effect to populate the form fields when the component mounts
    if (examTypeId && examtypeobj) {
      const jsonobj = JSON.parse(atob(examtypeobj));// Decoding and parsing the exam type object
      setExamType(jsonobj.exam_type_name);
      setRemarks(jsonobj.remark);
      setActStat(jsonobj.status);
    } else {
      console.error("Exam Type ID is null");
    }
  }, []);

  useEffect(() => {
    // Effect to update the exam type data object when any field changes
    if (examTypeId && examtypeobj) {
      const jsonobj = JSON.parse(atob(examtypeobj));
      console.log(jsonobj);
      // updating data
      setExamTypeData({
        id: examTypeId,
        exam_type_name: examType ? examType : jsonobj.exam_type_name,
        remark: remarks ? remarks : jsonobj.remark,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Exam Type ID is null");
    }
  }, [examType, remarks, actStatus]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (examTypeId) {
      console.log("examTypeData: ", examTypeData);
      await updateOrDeleteExamType(examTypeId, examTypeData, "MODIFY");
      setSnackbarMessage("ExamType updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/examType");
    } else {
      console.error("Exam Type ID is null");
      setSnackbarMessage("Failed to update ExamType.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Function to handle Snackbar close event
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
          Update Exam Type
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          id="examtypeform"
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: examType ? "none" : "" }}
              >
                <label htmlFor="roomno">Exam Type</label>
              </div>
              <input
                id="roomno"
                type="text"
                className="form-control"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
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
              </div>
              <input
                id="capa"
                type="string"
                className="form-control"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
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

export default UpdateExamType;
