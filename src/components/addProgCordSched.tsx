import React, { useState, useEffect } from "react";
import { addProgCordType, roomMatchedType } from "../types/myTypes";
import { addProgCord, getAllCourses, getAllRooms } from "../apis/backend";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { courseType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddProgSched() {
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
  const [examName, setExamName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [courses, setCourses] = useState<courseType[]>([]);
  const [rooms, setRooms] = useState<roomMatchedType[]>([]);

  const [scheduleData, setScheduleData] = useState<addProgCordType>({
    date: "",
    examination_name: "",
    course_name: "",
    room_number: "",
    remarks: "",
    status: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllCourses();
      const roomNumbers = await getAllRooms();

      setCourses(res);
      setRooms(roomNumbers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("date range", dateRange);
    setScheduleData({
      date: dateRange[0] + dateRange[1],
      examination_name: examName,
      course_name: selectedCourse,
      room_number: roomNumber,
      remarks: remark,
      status: status,
    });
  }, [dateRange, examName, selectedCourse, roomNumber, remark, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateRange || !examName || !selectedCourse || !roomNumber || !status) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      console.log("scheduleData: ", scheduleData);
      const response = await addProgCord(scheduleData);

      const jsonData = await response?.json();
      console.log("response json after submit,", jsonData);

      if (jsonData.errCode == 0) {
        setSnackbarMessage("Programme Coordinator added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Failed to add Programme Coordinator.");
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
    window.location.reload();
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>Add Schedule</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form
        className="d-flex flex-row jutify-content-evenly w-100"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div className="palceholder">
              <label htmlFor="datetime">Date Time</label>
              <span className="star"> *</span>
            </div>
            <DateRangePicker
              name="datetime"
              format="MM/dd/yyyy hh:mm aa"
              label="StartDate ~ EndDate"
              // caretAs={faCalendar}
              showMeridian
              value={dateRange}
              onChange={handleDateRangeChange}
              style={{ width: 730, fontSize: "5em" }}
            />
          </div>
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
            >
              <option
                id="examrole"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              {courses.map((cou, index) => (
                <option key={index} value={cou.course_name}>
                  {cou.course_name}
                </option>
              ))}
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
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: examName ? "none" : "" }}
            >
              <label htmlFor="examname">Exam Name</label>
              <span className="star"> *</span>
            </div>
            <input
              id="examname"
              type="text"
              className="form-control"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
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
            >
              <option
                id="loc"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              {rooms.map((roo, index) => (
                <option key={index} value={roo.room_number}>
                  {roo.room_number}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: status ? "none" : "" }}
            >
              <label htmlFor="stat">Status</label>
              <span className="star"> *</span>
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

export default AddProgSched;
