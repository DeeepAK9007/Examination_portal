import React, { useState, useEffect } from "react";
import { roomMatchedType, scheduleType } from "../types/myTypes";
import {
  addOneSchedule,
  getAllCourses,
  getAllRooms,
  getUsersByRole,
} from "../apis/backend";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { courseType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Alert component for showing Snackbar messages
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddSched() {
  // State variables
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

  // State variables to store all the users corresponding to thier role
  const [invigilators, setInvigilators] = useState<{ name: string }[]>([]);
  const [instructors, setInstructors] = useState<{ name: string }[]>([]);
  const [supervisors, setSupervisors] = useState<{ name: string }[]>([]);
  const [courses, setCourses] = useState<courseType[]>([]);
  const [rooms, setRooms] = useState<roomMatchedType[]>([]);

  // State variables for snack message
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

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

  // Update scheduleData whenever the relevant state changes
  useEffect(() => {
    if (dateRange) {
      setScheduleData({
        date: dateRange[0] + dateRange[1],
        examination_name: examName,
        course_name: selectedCourse,
        room_number: roomNumber,
        invigilator: invigilator,
        instructor: instructor,
        supervisor: supervisor,
        remarks: remark,
        status: status,
      });
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

  // Fetch users, courses, and rooms
  useEffect(() => {
    const fetchUsers = async () => {
      const invigilators = await getUsersByRole("Invigilator");
      const instructors = await getUsersByRole("Faculty");
      const supervisors = await getUsersByRole("Supervisor");
      const res = await getAllCourses();
      const rooms = await getAllRooms();

      setInvigilators(invigilators);
      setInstructors(instructors);
      setSupervisors(supervisors);
      setCourses(res);
      setRooms(rooms);
    };

    fetchUsers();
  }, []);

  console.log("courses", courses);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check for required fields
    if (!dateRange || !examName || !selectedCourse || !roomNumber || !status) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      console.log("scheduleData: ", scheduleData);
      const response = await addOneSchedule(scheduleData);

      const jsonData = await response?.json();
      console.log("response json after submit,", jsonData);

      // Check if schedule was added successfully
      if (jsonData.errCode == 0) {
        setSnackbarMessage("Schedule added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Failed to add user.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Close Snackbar and refresh the page
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    window.location.reload(); // Refresh the page after Snackbar closes
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
              name="Course"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option
                id="course"
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
              {invigilators.map((invi, index) => (
                <option key={index} value={invi.name}>
                  {" "}
                  {invi.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              name="supervisor"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
            >
              <option value="" disabled selected>
                Supervisor
              </option>
              {supervisors.map((sup, index) => (
                <option key={index} value={sup.name}>
                  {sup.name}
                </option>
              ))}
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
              {rooms.map((ro, index) => (
                <option key={index} value={ro.room_number}>
                  {" "}
                  {ro.room_number}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              name="instructor"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            >
              <option value="" disabled selected>
                Instructor
              </option>
              {instructors.map((inst, index) => (
                <option key={index} value={inst.name}>
                  {inst.name}
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

export default AddSched;
