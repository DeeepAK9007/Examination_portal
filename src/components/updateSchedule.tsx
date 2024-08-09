import NavBar from "./navbar";
import React, { useState, useEffect } from "react";
import { scheduleType } from "../types/myTypes";
import { getScheduleById, updateOrDeleteSchedule } from "../apis/backend";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import parseISO from "date-fns/parseISO";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom Alert component for displaying snackbar notifications
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateSchedule() {
  const navigate = useNavigate();
  // State variables for managing the form input values and UI states
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  // Handle the date range change
  const handleDateRangeChange = (value: [Date | null, Date | null] | null) => {
    if (value) {
      setDateRange(value);
    } else {
      setDateRange([null, null]);
    }
  };
  const [dateTime, setDateTime] = useState<string>("");
  const [examName, setExamName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [invigilator, setInvigilator] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [supervisor, setSupervisor] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const scheduleId = new URLSearchParams(location.search).get("id");
  const scheduleobj = new URLSearchParams(location.search).get("schedule");
  console.log("schedule id:", scheduleId);
  console.log("schedule obj", scheduleobj);

  // State to manage the schedule data object
  const [scheduleData, setScheduleData] = useState<scheduleType>({
    date: "",
    examination_name: "",
    course_name: "",
    room_number: "",
    invigilator: "",
    instructor: "",
    supervisor: "",
    remarks: "",
    status: "",
  });

  // useEffect to fetch and set the schedule data when the component is mounted
  useEffect(() => {
    const sideOperation = async () => {
      try {
        if (scheduleId && scheduleobj) {
          // Decode and parse the schedule object
          let jsonobj;
          try {
            jsonobj = JSON.parse(atob(scheduleobj));
          } catch (error) {
            console.error("Invalid base64 or JSON format", error);
            return;
          }

          // Fetch the schedule by ID
          const scheduleObject = await getScheduleById(jsonobj.id);

          // Debug log to verify fetched scheduleObject
          console.log("from update schedule", scheduleObject);

          // Check if scheduleObject and jsonobj have the expected properties
          const parsedDate = parseISO(jsonobj.DateTime);
          console.log("parsed date", parsedDate);
          setDateRange(parsedDate);

          if (scheduleObject[0].examination_name) {
            setExamName(scheduleObject[0].examination_name);
          } else {
            console.warn("scheduleObject.examination_name is undefined");
          }

          setSelectedCourse(jsonobj.CourseName);
          setRoomNumber(jsonobj.Room);
          setInvigilator(jsonobj.Invigilator);
          setInstructor(jsonobj.Instructor);
          setSupervisor(scheduleObject[0].supervisor);
          setRemark(jsonobj.Remark);
          setStatus(scheduleObject[0].status);
        } else {
          console.error("Schedule ID or scheduleobj is null");
        }
      } catch (error) {
        console.error("An error occurred in sideOperation", error);
      }
    };

    sideOperation();
  }, []);

  // useEffect to update the scheduleData state whenever relevant form input states change
  useEffect(() => {
    if (scheduleId && scheduleobj) {
      const jsonobj = JSON.parse(atob(scheduleobj));
      console.log("jsonobj", jsonobj);
      setScheduleData({
        id: scheduleId,
        date:
          dateRange[0] + dateRange[1]
            ? dateRange[0] + dateRange[1]
            : jsonobj.DateTime,
        examination_name: examName ? examName : jsonobj.ExamName,
        course_name: selectedCourse ? selectedCourse : jsonobj.CourseName,
        room_number: roomNumber ? roomNumber : jsonobj.Room,
        invigilator: invigilator ? invigilator : jsonobj.Invigilator,
        instructor: instructor ? instructor : jsonobj.Instructor,
        supervisor: supervisor ? supervisor : jsonobj.Supervisor,
        remarks: remark ? remark : jsonobj.Remarks,
        status: status ? status : jsonobj.Status,
      });
    } else {
      console.error("Schedule ID is null");
    }
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

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scheduleId) {
      console.log("scheduleData: ", scheduleData);
      updateOrDeleteSchedule(scheduleId, scheduleData, "MODIFY");
      setSnackbarMessage("Schedule updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.error("Schedule ID is null");
      setSnackbarMessage("Failed to update Schedule.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Function to close the snackbar notification
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    navigate("/schedule");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Add Schedule
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
              </div>
              <DateRangePicker
                name="datetime"
                format="MM/dd/yyyy hh:mm aa"
                showMeridian
                value={dateRange}
                onChange={handleDateRangeChange}
                style={{ width: 600, fontSize: "5em" }}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: selectedCourse ? "none" : "" }}
              >
                <label htmlFor="file">Select Course</label>
              </div>
              <select
                name="Exam Role"
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
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
            <div className="mb-3">
              <select
                name="Assign invigilator"
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={invigilator}
                onChange={(e) => setInvigilator(e.target.value)}
              >
                <option value="" disabled selected>
                  Assign Invigilator
                </option>
                <option value="Maxx">Maxx</option>
                <option value="John">John</option>
                <option value="Cipher">Cipher</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                name="Assign invigilator"
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
              >
                <option value="" disabled selected>
                  Supervisor
                </option>
                <option value="Maxx">Maxx</option>
                <option value="John">John</option>
                <option value="Cipher">Cipher</option>
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
              </div>
              <input
                id="examname"
                type="text"
                className="form-control"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: roomNumber ? "none" : "" }}
              >
                <label htmlFor="loc">Location/Room</label>
              </div>
              <select
                name="Assign invigilator"
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
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
                name="Assign invigilator"
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
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
                <label htmlFor="stat">Status</label>
              </div>
              <select
                name="stat"
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

export default UpdateSchedule;
