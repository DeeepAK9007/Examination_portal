import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import Custom_button from "./actions";
import { getAllTerms } from "../apis/backend";
import { termType } from "../types/myTypes";

function TermConfTab() {
  const [terms, setTerms] = useState<termType[]>([]);
  const [colDefs, setColDefs] = useState([
    { field: "Date", flex: 1 },
    { field: "Name", flex: 1 },
    { field: "Active", flex: 1 },
    { field: "Actions", flex: 1, cellRenderer: Custom_button },
  ]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getAllTerms();
        // console.log("Terms", res);
        const filteredTerms = res.map((term: termType) => ({
          Date: term.start_date,
          Name: term.term_name,
          Active: true,
          Actions: "remove", // Ensure this field is correctly mapped if required
        }));
        setTerms(filteredTerms);
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchTerms();
  }, []);

  console.log("Row data:", terms);
  console.log("Column Data", colDefs);

  //   const [rowData, setRowData] = useState("");

  //   useEffect(() => {
  //     // Set batchText state when rowData changes
  //     setBatchTex(rowData);
  //   }, [rowData]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={terms}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default TermConfTab;
