import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import Custom_button from './actions';

function RoomConfTab()
{
    const [rowData, setRowData] = useState([
            {RoomNumber:'203-B',BlockName:'Ramanujan',Capacity:320,Active: true, Actions: 'Remove'},
            {RoomNumber:'204-B',BlockName:'Aryabhatta',Capacity:100,Active: true, Actions: 'Remove'},
            {RoomNumber:'205-B',BlockName:'Newton',Capacity:150,Active: true, Actions: 'Remove'},
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "RoomNumber",flex:1},
        { field: "BlockName",flex:1},
        { field: "Capacity",flex:1},
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

export default RoomConfTab;