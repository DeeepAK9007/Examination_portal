import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';

function ProgCordiTab()
{
    const [rowData, setRowData] = useState([
        { DateTime:'22/10/22',ExamName:"Machine Learning",CourseName:"Machine Learning",Room:"R-203",Remark:"NOne"},
        { DateTime:'14/10/22',ExamName:"Deep learning",CourseName:"Machine Learning",Room:"R-203",Remark:"NOne"},
        { DateTime:'12/10/22',ExamName:"Natural Language Processing",CourseName:"Machine Learning",Room:"R-203",Remark:"NOne"},
        { DateTime:'26/10/22',ExamName:"CNN",CourseName:"Machine Learning",Room:"R-203",Remark:"NOne"}
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "DateTime", headerCheckboxSelection: true, sort:'asc', flex:1},
        { field: "ExamName", flex:1},
        { field: "CourseName", flex:1},
        { field: "Room", flex:1},
        { field: "Remark", sortable:true, flex:1}
        ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height: 400 , width:'93%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={rowData} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default ProgCordiTab;