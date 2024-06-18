import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import Custom_button from './actions';
import { getAllModes } from '../apis/backend';
import { ExamModeType, getModeTypes} from '../types/myTypes';
import { useEffect } from 'react';

function ExamModeTab()
{
    const [modes,setModes]=useState<ExamModeType[]>([]);
    
    useEffect(() => {
    const fetchusers = async () => {
        try {
        const res: getModeTypes[] = await getAllModes();

        const mappedRowData = res.map((row) => ({
            exam_mode_name:row.exam_mode_name,
            remark:row.remark,
            status:row.status
        }));

        setModes(mappedRowData);
        console.log("some data",mappedRowData);
        } catch (error) {
        console.log("Error fetching data:", error);
        }
    };
    fetchusers();
    }, []);  

    const [colDefs, setColDefs] = useState<ColDef<getModeTypes, unknown>[]>([
        {field: "exam_mode_name",headerName: "Mode",flex: 1,},
        { field: "remark", headerName: "Remarks" ,flex:1},
        { field: "status",headerName: "Status",flex:1},        
        { field: "Actions",flex:1,cellRenderer:Custom_button}
    ]);
    // const [rowData, setRowData] = useState([
    //         {RoomNumber:'203-B',BlockName:'Ramanujan',Capacity:320,Active: true, Actions: 'Remove'},
    //         {RoomNumber:'204-B',BlockName:'Aryabhatta',Capacity:100,Active: true, Actions: 'Remove'},
    //         {RoomNumber:'205-B',BlockName:'Newton',Capacity:150,Active: true, Actions: 'Remove'},
    //     ]);
        
    //     const [colDefs, setColDefs] = useState([
    //     { field: "RoomNumber",flex:1},
    //     { field: "BlockName",flex:1},
    //     { field: "Capacity",flex:1},
    //     { field: "Active",flex:1},
    //     { field: "Actions",flex:1, cellRenderer:Custom_button}
    //     ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height:400 , width:'90%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={modes} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default ExamModeTab;