import NavBar from "./navbar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { termType } from "../types/myTypes";
import { updateOrDeleteTerm } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddResource() {
  const navigate = useNavigate();
  const [termName, setTermName] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  console.log(status);

  const dates = dateTime.split("-");

  const location = useLocation();
  const termId = new URLSearchParams(location.search).get("id");
  const termobj = new URLSearchParams(location.search).get("term");
  console.log("Term id:", termId);
  const [termData, setTermData] = useState<termType>({
    id: "",
    term_name: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  useEffect(() => {
    if (termId && termobj) {
      const jsonobj = JSON.parse(atob(termobj));
      setTermName(jsonobj.Name);
      setDateTime(
        jsonobj.Date.split("-")[0] + "-" + jsonobj.Date.split("-")[1]
      );
      setStatus(jsonobj.Status);
    } else {
      console.error("Exam mode ID is null");
    }
  }, []);

  useEffect(() => {
    if (termId && termobj) {
      const jsonobj = JSON.parse(atob(termobj));
      console.log(jsonobj);
      setTermData({
        id: termId,
        term_name: termName ? termName : jsonobj.Name,
        start_date: dates[0] ? dates[0] : jsonobj.Date.split("-")[0],
        end_date: dates[1] ? dates[1] : jsonobj.Date.split("-")[1],
        status: status ? status : jsonobj.Status,
      });
    } else {
      console.error("term ID is null");
    }
  }, [termName, dateTime, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (termId) {
      console.log("termData: ", termData);
      updateOrDeleteTerm(termId, termData, "MODIFY");
      setSnackbarMessage("Term updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.error("term ID is null");
      setSnackbarMessage("Failed to update Term.");
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
    navigate("/term");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Term Detail
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
                style={{ display: termName ? "none" : "" }}
              >
                <label htmlFor="name">Name</label>
              </div>
              <input
                id="name"
                type="text"
                className="form-control"
                value={termName}
                onChange={(e) => setTermName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: dateTime ? "none" : "" }}
              >
                <label htmlFor="datetime">StartDate - EndDate</label>
              </div>
              <input
                id="datetime"
                type="text"
                className="form-control"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: status ? "none" : "" }}
              >
                <label htmlFor="file">Status</label>
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

export default AddResource;
