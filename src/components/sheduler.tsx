import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { getAllSchedules } from "../apis/backend";
import { scheduleType } from "../types/myTypes";
import { useNavigate } from "react-router-dom";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";

// Component to render custom button for each row
type CustomButtonProps = {
  rowData: scheduleType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Function to handle editing a schedule
  const editTerm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    // Navigate to edit schedule page with encoded schedule data
    navigate(
      `/editSchedule?schedule=${btoa(JSON.stringify(rowData))}&&id=${
        rowData.id
      }`
    );
  };

  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        className="fas fa-edit "
        onClick={editTerm}
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

// Custom button renderer for ag-Grid
type CustomButtonRendererParams = {
  data: scheduleType;
  value: any;
  valueFormatted: any;
  getValue: () => any;
  setValue: (value: any) => void;
  node: RowNode;
  colDef: ColDef;
  column: Column;
  rowIndex: number;
  api: GridApi;
  columnApi: ColumnApi;
  context: any;
  refreshCell: () => void;
  eGridCell: HTMLElement;
  eParentOfValue: HTMLElement;
};

const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  console.log("params", params);
  return <CustomButton rowData={params.data} />;
};

function Scheduler() {
  // State to store schedule data
  const [schedules, setSchedules] = useState<scheduleType[]>([]);

  // State to define column definitions for ag-Grid
  const [colDefs, setColDefs] = useState([
    { field: "DateTime", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "ExamName", flex: 1 },
    { field: "CourseName", flex: 1 },
    { field: "Room", flex: 1 },
    { field: "Invigilator", flex: 1 },
    { field: "Supervisor", flex: 1 },
    { field: "Remark", sortable: true, flex: 1 },
    {
      headerName: "Actions",
      flex: 1,
      cellRenderer: CustomButtonRenderer,
    },
  ]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await getAllSchedules(); // Fetch schedules from backend
        // Map fetched data to match column definitions
        // console.log("Terms", res);
        const filteredTerms = res.map((schedule: scheduleType) => ({
          id: schedule.id,
          DateTime: schedule.date,
          ExamName: schedule.examination_name,
          CourseName: schedule.course_name,
          Room: schedule.room_number,
          Invigilator: schedule.invigilator,
          Supervisor: schedule.supervisor,
          Remark: schedule.remarks,
        }));
        setSchedules(filteredTerms); // Update state with fetched and mapped data
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
          <h3>Scheduler Configuration</h3>
        </p>
        <div className="dropdown-center me-5">
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

export default Scheduler;
