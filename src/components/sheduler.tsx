import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';

function Scheduler()
{
    const [rowData, setRowData] = useState([
        { DateTime:'22/10/22',ExamName:"Machine Learning",CourseName:"Machine Learning",Room:"R-203",Invigilator:"Lucifer",Supervisor:"Morningstar",Remark:"NOne"},
        { DateTime:'14/10/22',ExamName:"Deep learning",CourseName:"Machine Learning",Room:"R-203",Invigilator:"Lucifer",Supervisor:"Morningstar",Remark:"NOne"},
        { DateTime:'12/10/22',ExamName:"Natural Language Processing",CourseName:"Machine Learning",Room:"R-203",Invigilator:"Lucifer",Supervisor:"Morningstar",Remark:"NOne"},
        { DateTime:'26/10/22',ExamName:"CNN",CourseName:"Machine Learning",Room:"R-203",Invigilator:"Lucifer",Supervisor:"Morningstar",Remark:"NOne"}
        ]);
        
        const [colDefs, setColDefs] = useState([
        { field: "DateTime", headerCheckboxSelection: true, sort:'asc'},
        { field: "ExamName"},
        { field: "CourseName"},
        { field: "Room"},
        { field: "Invigilator"},
        { field: "Supervisor"},
        { field: "Remark", sortable:true}
        ]);
        
      return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Scheduler Configuration</p>
                 <div className="dropdown-center me-5">
                    <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Action</button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" style={{color:'red'}} href="#">Generate Attendance Sheet</a></li>
                        <li><a className="dropdown-item" style={{color:'red'}} href="#">Generate Hall Ticket</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height: 400 , width:'93%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={rowData} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default Scheduler;