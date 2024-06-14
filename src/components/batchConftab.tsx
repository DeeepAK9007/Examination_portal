import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import Custom_button from './actions';
import { batchMappedType, getBatchType } from '../types/myTypes';
import { useEffect } from 'react';
import { getAllBatches } from '../apis/backend';

function BatchConfTab()
{
    const [obtBatches,setObtBatches]=useState<batchMappedType[]>([]);
    
    useEffect(() => {
    const fetchusers = async () => {
        try {
        const res: getBatchType[] = await getAllBatches();

        const mappedRowData = res.map((row) => ({
            id: row.id,
            batch_name:row.batch_name,
            status:row.status
        }));

        setObtBatches(mappedRowData);
        console.log("some data",mappedRowData);
        } catch (error) {
        console.log("Error fetching data:", error);
        }
    };
    fetchusers();
    }, []);  

    const [colDefs, setColDefs] = useState<ColDef<getBatchType, unknown>[]>([
        {field: "batch_name",headerName: "Batch",flex: 1,},
        {field: "status",headerName:"Status", flex:1},
        { field: "actions",flex:1,cellRenderer:Custom_button}
    ]);

    // // const [rowData, setRowData] = useState([
    // //         {Batch:'IMT2026',Active: true, Actions: 'Remove'},
    // //         {Batch:'IMT2025',Active: false, Actions: 'Remove'},
    // //         {Batch:'IMT2024',Active: false, Actions: 'Remove'},
    // //     ]);
        
    // //     const [colDefs, setColDefs] = useState([
    // //     { field: "Batch",flex:1},
    // //     { field: "Active",flex:1},
    // //     { field: "Actions",flex:1, cellRenderer:Custom_button}
    // //     ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height:400 , width:'90%'}}>
                <AgGridReact rowSelection="multiple" headerCheckboxSelection={true} rowData={obtBatches} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default BatchConfTab;