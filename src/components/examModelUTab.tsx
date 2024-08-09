import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { getAllSchedules } from "../apis/backend"; // Importing API call to fetch schedules
import { examModeUpdateType, scheduleType } from "../types/myTypes"; // Importing type definitions

function ExamModelUpdateTab() {
  const [schedules, setSchedules] = useState<scheduleType[]>([]); // State to hold schedule data

  // Column definitions for the data grid
  const [colDefs, setColDefs] = useState([
    { field: "DateTime", headerCheckboxSelection: true, sort: "asc" },
    { field: "ExamName" },
    { field: "CourseName" },
    { field: "Room" },
    { field: "Invigilator" },
    { field: "Instructor" },
    { field: "Supervisor" },
    { field: "modeOfExam" },
    { field: "Remark", sortable: true },
    { field: "Action" },
  ]);

  // Fetch schedules from the backend when the component mounts
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await getAllSchedules(); // Fetch schedules from the backend
        const filteredTerms = res.map((schedule: examModeUpdateType) => ({
          DateTime: schedule.date,
          ExamName: schedule.examination_name,
          CourseName: schedule.course_name,
          Room: schedule.room_number,
          Invigilator: schedule.invigilator,
          Instructor: schedule.instructor,
          Supervisor: schedule.supervisor,
          modeOfExam: schedule.mode,
          Remark: schedule.remarks,
          Action: schedule.status, // Ensure this field is correctly mapped if required
        }));
        setSchedules(filteredTerms); // Update state with mapped data
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchSchedules();
  }, []);

  console.log("Row data:", schedules);
  console.log("Column Data", colDefs);

  return (
    <div>
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        <p className="p-0 ms-5 mb-0 mt-2 ">
          <h3>Exam Mode Update Configuration</h3>
        </p>
        <div className="dropdown-center me-5">
          {/* Dropdown menu for actions */}
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
              <a className="dropdown-item" style={{ color: "red" }} href="#">
                Generate Attendance Sheet
              </a>
            </li>
            <li>
              <a className="dropdown-item" style={{ color: "red" }} href="#">
                Generate Hall Ticket
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 250, width: "93%", overflowY: "auto" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={schedules}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default ExamModelUpdateTab;
