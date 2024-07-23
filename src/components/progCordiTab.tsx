import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { addProgCordType } from "../types/myTypes";
import { getProgCord } from "../apis/backend";

function ProgCordiTab() {
  const [schedules, setSchedules] = useState<addProgCordType[]>([]);

  const [colDefs, setColDefs] = useState([
    { field: "DateTime", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "ExamName", flex: 1 },
    { field: "CourseName", flex: 1 },
    { field: "Room", flex: 1 },
    { field: "Remark", sortable: true, flex: 1 },
  ]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await getProgCord();
        // console.log("Terms", res);
        const filteredTerms = res.map((schedule: addProgCordType) => ({
          DateTime: schedule.date,
          ExamName: schedule.examination_name,
          CourseName: schedule.course_name,
          Room: schedule.room_number,
          Remark: schedule.remarks, // Ensure this field is correctly mapped if required
        }));
        setSchedules(filteredTerms);
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

export default ProgCordiTab;
