import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
import { ExamModeType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteExamMode } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateExamMode() {
  const navigate = useNavigate();
  const [examMode, setExamMode] = useState<string>("");
  const [remmarks, setRemmarks] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const examModeId = new URLSearchParams(location.search).get("id");
  const exammodeobj = new URLSearchParams(location.search).get("exammode");
  console.log("examMode id:", examModeId);
  const [examModeData, setExamModeData] = useState<ExamModeType>({
    id: "",
    exam_mode_name: "",
    remark: "",
    status: "",
  });

  useEffect(() => {
    if (examModeId && exammodeobj) {
      const jsonobj = JSON.parse(atob(exammodeobj));
      setExamMode(jsonobj.exam_mode_name);
      setRemmarks(jsonobj.remark);
      setActStat(jsonobj.status);
    } else {
      console.error("Exam mode ID is null");
    }
  }, []);

  useEffect(() => {
    if (examModeId && exammodeobj) {
      const jsonobj = JSON.parse(atob(exammodeobj));
      console.log("jsonobj", jsonobj);
      setExamModeData({
        id: examModeId,
        exam_mode_name: examMode ? examMode : jsonobj.exam_mode_name,
        remark: remmarks ? remmarks : jsonobj.remark,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Exam mode ID is null");
    }
  }, [examMode, remmarks, actStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (examModeId) {
      console.log("examModeData: ", examModeData);
      await updateOrDeleteExamMode(examModeId, examModeData, "MODIFY");
      setSnackbarMessage("ExamMode updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/examMode");
    } else {
      console.error("Exam Mode ID is null");
      setSnackbarMessage("Failed to update ExamMode.");
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
    navigate("/examMode");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Exam Mode
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
                style={{ display: examMode ? "none" : "" }}
              >
                <label htmlFor="roomno">Exam Mode</label>
              </div>
              <input
                id="roomno"
                type="text"
                className="form-control"
                value={examMode}
                onChange={(e) => setExamMode(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: remmarks ? "none" : "" }}
              >
                <label htmlFor="capa">Remarks</label>
              </div>
              <input
                id="capa"
                type="string"
                className="form-control"
                value={remmarks}
                onChange={(e) => setRemmarks(e.target.value)}
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

export default UpdateExamMode;
