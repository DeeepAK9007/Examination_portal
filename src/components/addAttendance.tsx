import { useContext, useEffect, useRef, useState } from "react";
import { AttendanceContext } from "../context/AuthContext";
import { addAttendance } from "../apis/backend";
import { AddAttendProps } from "../types/myTypes";

const AddAttend: React.FC<AddAttendProps> = ({ courseCode, courseName }) => {
  const {
    isCellClicked,
    setQueryHandler,
    setAttendanceHandler,
    userid,
    examid,
  } = useContext(AttendanceContext);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [querytext, setQueryText] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [timeMap, setTimeMap] = useState<Map<string, string>>(new Map());
  const newTimeMap = new Map(timeMap);

  // dropdown menu selection

  useEffect(() => {
    if (isCellClicked && dropdownRef.current) {
      dropdownRef.current.classList.add("show");
      const dropdownMenu = dropdownRef.current.querySelector(".dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.classList.add("show");
      }
    }
    setQueryHandler(querytext);
  }, [isCellClicked, querytext]);

  // when clicking option

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setAttendanceHandler(action === "Mark Present" ? true : false);
  };

  // when submit button is clicked

  const handleSubmit = async () => {
    console.log("Selected Action:", selectedAction);
    console.log("attendance data from addAttendance: ", [
      {
        exam_schedule_id: examid,
        user_id: userid,
        attendance: selectedAction === "Mark Present" ? "present" : "absent",
      },
    ]);
    const newTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    newTimeMap.set(userid, newTime);
    localStorage.setItem(userid, newTime);
    setTimeMap(newTimeMap);
    await addAttendance({
      exam_schedule_id: examid,
      user_id: userid,
      attendance: selectedAction === "Mark Present" ? "present" : "absent",
    });
  };

  console.log("data from addAttendance:", isCellClicked);

  // html code
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>
          Add Attendance Detail for{" "}
          {"[ " + courseCode + " ]" + "  " + courseName}
        </h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <div className="d-flex justify-content-between ms-5 mt-3">
        <button className="btn btn-success" style={{ height: "75%" }}>
          <i className="fa-solid fa-qrcode me-1"></i>Scan Qr
        </button>
        <div className="d-flex flex-row me-5">
          <div ref={dropdownRef} className="dropdown-center me-5">
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Action
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  style={{ color: "red" }}
                  href="#"
                  onClick={() => handleActionClick("Mark Present")}
                >
                  Mark Present
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  style={{ color: "red" }}
                  href="#"
                  onClick={() => handleActionClick("Mark Absent")}
                >
                  Mark Absent
                </a>
              </li>
              <li>
                <button
                  className="btn btn-primary"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginLeft: "70px",
                  }}
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </li>
            </ul>
          </div>
          <div className="input-group">
            <div
              id="search-autocomplete"
              className="form-outline"
              data-mdb-input-init
            >
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search"
                value={querytext}
                onChange={(e) => setQueryText(e.target.value)}
              />
              <label className="form-label"></label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init
              style={{ width: "50px", height: "38px" }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAttend;
