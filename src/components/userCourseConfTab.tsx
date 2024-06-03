import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';

function UserCourseConfTab()
{
    const [rowData, setRowData] = useState([
            {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'},
            {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'},
            {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'}
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "Employee_No"},
        { field: "Name"},
        { field: "Email"},
        { field: "Role"},
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

export default UserCourseConfTab;

