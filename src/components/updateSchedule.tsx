import NavBar from "./navbar";
import { useState, useEffect } from "react";
import { scheduleType } from "../types/myTypes";
import { updateOrDeleteSchedule } from "../apis/backend";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function UpdateSchedule() {
  const navigate = useNavigate();
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

  const location = useLocation();
  const scheduleId = new URLSearchParams(location.search).get("id");
  const scheduleobj = new URLSearchParams(location.search).get("schedule");
  console.log("schedule id:", scheduleId);
  console.log("schedule obj", scheduleobj);

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

  useEffect(() => {
    if (scheduleId && scheduleobj) {
      const jsonobj = JSON.parse(atob(scheduleobj));
      setStatus(jsonobj.Status);
    } else {
      console.error("Schedule ID is null");
    }
  }, []);

  useEffect(() => {
    if (scheduleId && scheduleobj) {
      const jsonobj = JSON.parse(atob(scheduleobj));
      console.log("jsonobj", jsonobj);
      setScheduleData({
        id: scheduleId,
        date:
          dateRange[0] + dateRange[1]
            ? dateRange[0] + dateRange[1]
            : jsonobj.date,
        examination_name: examName ? examName : jsonobj.examination_name,
        course_name: selectedCourse ? selectedCourse : jsonobj.course_name,
        room_number: roomNumber ? roomNumber : jsonobj.room_number,
        invigilator: invigilator ? invigilator : jsonobj.invigilator,
        instructor: instructor ? instructor : jsonobj.instructor,
        supervisor: supervisor ? supervisor : jsonobj.supervisor,
        remarks: remark ? remark : jsonobj.remarks,
        status: status ? status : jsonobj.status,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scheduleId) {
      console.log("scheduleData: ", scheduleData);
      updateOrDeleteSchedule(scheduleId, scheduleData, "MODIFY");
      navigate("/schedule");
    } else {
      console.error("Schedule ID is null");
    }
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
    </div>
  );
}

export default UpdateSchedule;
