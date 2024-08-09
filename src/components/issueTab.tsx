import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import YesNoToggle from "./yesNoToggle";

// Component for rendering an image
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

// Main Component
function IssueTab() {
  // State to manage row data for the grid and it is hardcoded because it is not yet implemented
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

  // State to manage column definitions for the grid
  const [colDefs, setColDefs] = useState([
    { field: "Name", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "IncidentReported", flex: 1, cellRenderer: YesNoToggle },
    { field: "Remarks", flex: 1 },
    { field: "MarkedTime", flex: 1 },
    { field: "Photo", sortable: true, flex: 1, cellRenderer: PhotoComponent },
  ]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 250, width: "93%", overflowY: "auto" }}
      >
        <AgGridReact
          rowSelection="multiple" // Allow multiple row selection
          headerCheckboxSelection={true} // Add checkbox in the header for selecting all rows
          rowData={rowData} // Data to be displayed in the grid
          columnDefs={colDefs} // Column definitions
        />
      </div>
    </div>
  );
}

export default IssueTab;
