import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";

interface PhotoComponentProps {
  value: string;
}

const PhotoComponent: React.FC<PhotoComponentProps> = (props) => {
  console.log(props.value);
  return (
    <img
      style={{ height: "100px", width: "100px" }}
      src={props.value}
      alt="the pic"
    />
  );
};

function IssueTab() {
  const [rowData, setRowData] = useState([
    {
      Name: "Jonathan",
      IncidentReported: true,
      Remarks: "QR scan",
      MarkedTime: "2024-06-03 16:00:00",
      Photo:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
    {
      Name: "Jonathan",
      IncidentReported: true,
      Remarks: "QR scan",
      MarkedTime: "2024-06-03 16:00:00",
      Photo:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
    {
      Name: "Jonathan",
      IncidentReported: true,
      Remarks: "QR scan",
      MarkedTime: "2024-06-03 16:00:00",
      Photo:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Name", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "IncidentReported", flex: 1 },
    { field: "Remarks", flex: 1 },
    { field: "MarkedTime", flex: 1 },
    { field: "Photo", sortable: true, flex: 1, cellRenderer: PhotoComponent },
  ]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "93%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default IssueTab;
