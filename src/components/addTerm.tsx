import React, { useEffect, useState } from "react";
import { termType } from "../types/myTypes";
import { addOneTerm } from "../apis/backend";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom alert component for Snackbar notifications
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddTerm() {
  // State to manage the date range selected by the user
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  // Handler to update the date range state
  const handleDateRangeChange = (value: [Date | null, Date | null] | null) => {
    if (value) {
      setDateRange(value);
    } else {
      setDateRange([null, null]);
    }
  };

  // State to manage the term name, date time, and status
  const [termName, setTermName] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // State to manage Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  console.log(status);

  const dates = dateTime.split("-");

  // State to store term data for submission
  const [termData, setTermData] = useState<termType>({
    term_name: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  // Effect to update termData state whenever the termName, dateTime, or status changes
  useEffect(() => {
    setTermData({
      term_name: termName,
      start_date: dateRange[0],
      end_date: dateRange[1],
      status: status,
    });
  }, [termName, dateTime, status]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate required fields
    if (!termName || !dateRange || !status) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      // Send term data to the server
      console.log("termData: ", termData);
      const response = await addOneTerm(termData);
      console.log("response after submit,", response);

      const jsonData = await response?.json();
      console.log("response json after submit,", jsonData);

      if (jsonData.errCode === 0 || jsonData.message === "Success") {
        setSnackbarMessage("Term added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log("error ", error);
      setSnackbarMessage("Failed to add Term.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handler to close the Snackbar
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    window.location.reload(); // Reload the page after closing Snackbar
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>Add Term Detail</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      {/* Form for adding a new term */}
      <form
        className="d-flex flex-row jutify-content-evenly w-100"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column ms-5 w-50">
          {/* Input for term name */}
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: termName ? "none" : "" }}
            >
              <label htmlFor="name">Name</label>
              <span className="star">*</span>
            </div>
            <input
              id="name"
              type="text"
              className="form-control"
              value={termName}
              onChange={(e) => setTermName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          {/* Date range picker for term dates */}
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: dateTime ? "none" : "" }}
            >
              <label htmlFor="datetime">StartDate - EndDate</label>
              <span className="star">*</span>
            </div>
            <DateRangePicker
              name="datetime"
              format="MM/dd/yyyy hh:mm aa"
              label="StartDate ~ EndDate"
              showMeridian
              value={dateRange}
              onChange={handleDateRangeChange}
              style={{ width: 730, fontSize: "5em" }}
            />
          </div>
          {/* Dropdown for status selection */}
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: status ? "none" : "" }}
            >
              <label htmlFor="file">Status</label>
              <span className="star"> *</span>
            </div>
            <select
              name="block"
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
          {/* Submit button */}
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
      {/* Snackbar for displaying notifications */}
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

export default AddTerm;
