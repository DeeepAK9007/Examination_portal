import { useState, useEffect } from "react";
import { scheduleType } from "../types/myTypes";
import { addOneSchedule } from "../apis/backend";

function AddSched() {
  const [dateTime, setDateTime] = useState<string>("");
  const [examName, setExamName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [invigilator, setInvigilator] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [supervisor, setSupervisor] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [status, setStatus] = useState<string>("");

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
    setScheduleData({
      date: dateTime,
      examination_name: examName,
      course_name: selectedCourse,
      room_number: roomNumber,
      invigilator: invigilator,
      instructor: instructor,
      supervisor: supervisor,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("scheduleData: ", scheduleData);
    addOneSchedule(scheduleData);
  window.location.reload();
  };

  return (
    <div>
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
              <span className="star">*</span>
            </div>
            <input
              id="datetime"
              type="datetime-local"
              className="form-control"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
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
  );
}

export default AddSched;