import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
// import { batchMappedType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteBatch } from "../apis/backend";
import { batchType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom Alert component with ref forwarding for Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateBatch() {
  const navigate = useNavigate(); // Hook for navigation
  const [batchName, setBatchName] = useState<string>(""); // State to store batch name
  const [actStatus, setActStatus] = useState<string>(""); // State to store batch status

  const location = useLocation(); // Hook to access location object
  const batchId = new URLSearchParams(location.search).get("id"); // Extract batch ID from URL
  const batchobj = new URLSearchParams(location.search).get("batch"); // Extract batch object from URL

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState<string>(""); // State to store Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success" // State to store Snackbar severity
  );

  console.log("Batch id:", batchId);
  const [batchData, setBatchData] = useState<batchType>({
    id: "",
    batch_name: "",
    status: "",
  });

  // useEffect to initialize form fields based on batch data
  useEffect(() => {
    if (batchId && batchobj) {
      const jsonobj = JSON.parse(atob(batchobj)); // Decode and parse batch object
      setBatchName(jsonobj.batch_name);
      setActStatus(jsonobj.status);
    } else {
      console.error("Batch ID is null");
    }
  }, []);

  // useEffect to update batch data when batchId, batchName, or actStatus change
  useEffect(() => {
    if (batchId && batchobj) {
      const jsonobj = JSON.parse(atob(batchobj));
      setBatchData({
        id: batchId,
        batch_name: batchName ? batchName : jsonobj.batch_name,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Batch ID is null");
    }
  }, [batchId, batchName, actStatus]);

  // Function to handle form submission for batch updates
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (batchId) {
      console.log("batchData: ", batchData);
      await updateOrDeleteBatch(batchId, batchData, "MODIFY");
      setSnackbarMessage("Batch updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.error("Batch ID is null");
      setSnackbarMessage("Failed to update Batch.");
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
          Update Batch Detail
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: batchName ? "none" : "" }}
              >
                <label htmlFor="name">Enter Batch Name</label>
              </div>
              <input
                id="name"
                type="text"
                className="form-control"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div className="palceholder ms-1" style={{ display: "none" }}>
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={actStatus}
                onChange={(e) => setActStatus(e.target.value)}
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

export default UpdateBatch;
