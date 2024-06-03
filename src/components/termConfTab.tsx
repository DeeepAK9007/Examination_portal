import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';

function TermConfTab()
{
    const [rowData, setRowData] = useState([
            {Date:'Jan 2 2024- May 31 2024', Name:'Term-2-2023-2024',Active: true, Actions: 'Remove'},
            {Date:'Jan 2 2024- May 31 2024', Name:'Term-2-2023-2024',Active: true, Actions: 'Remove'},
            {Date:'Jan 2 2024- May 31 2024', Name:'Term-2-2023-2024',Active: true, Actions: 'Remove'}
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "Date"},
        { field: "Name"},
        { field: "Active"},
        { field: "Actions"}
        ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height:400 , width:'90%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={rowData} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default TermConfTab;