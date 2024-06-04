import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import Custom_button from './actions';

function BatchConfTab()
{
    const [rowData, setRowData] = useState([
            {Batch:'IMT2026',Active: true, Actions: 'Remove'},
            {Batch:'IMT2025',Active: false, Actions: 'Remove'},
            {Batch:'IMT2024',Active: false, Actions: 'Remove'},
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "Batch",flex:1},
        { field: "Active",flex:1},
        { field: "Actions",flex:1, cellRenderer:Custom_button}
        ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height:400 , width:'90%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={rowData} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default BatchConfTab;