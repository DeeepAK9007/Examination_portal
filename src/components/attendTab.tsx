import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';

function AttendTab()
{
    const [rowData, setRowData] = useState([
        {Name:"Milind",Present:true, MarkTime:'2024-06-06 12:35:45',Photo:''},
        {Name:"Yuri Boyka",Present:false, MarkTime:'2024-06-06 12:35:45',Photo:''},
        {Name:"Satan",Present:true, MarkTime:'2024-06-06 12:00:00',Photo:''},
        {Name:"John",Present:false, MarkTime:'2024-06-06 12:35:45',Photo:''}
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "Name", headerCheckboxSelection: true, sort:'asc', flex:1},
        { field: "Present", flex:1},
        { field: "MarkTime", flex:1},
        { field: "Photo", flex:1}
        ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height: 400 , width:'93%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={rowData} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default AttendTab;