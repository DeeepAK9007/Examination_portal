import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import { batchMappedType, getBatchType } from '../types/myTypes';
import { useEffect } from 'react';
import { getAllBatches } from '../apis/backend';
import { deletestuff } from '../types/myTypes';
import { ColDef, GridApi, ColumnApi, RowNode, Column } from 'ag-grid-community';


type CustomButtonProps = {
    rowData: batchMappedType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
    const deleteUser = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        console.log('Row data:', rowData);
        console.log(rowData.id);
        const seshID=sessionStorage.getItem("key");
        console.log("&resource=id:"+rowData.id);
        const temp :deletestuff={id: rowData.id};
        const targ=JSON.stringify(temp);
        const enc=btoa(targ);
        const resource= await fetch("http://localhost:8081/api/batch?session_id="+seshID+"&resource="+enc+"&action=DELETE",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              mode: "cors"
            }
          );
        console.log("result:",resource);
    };

    return (
        <div className="d-flex gap-4 justify-content-around mt-2 ">
            <i className="fas fa-edit " style={{ cursor: "pointer" }}></i>
            <i onClick={(e) => { deleteUser(e) }} className="fas fa-trash text-danger" style={{ cursor: "pointer" }}></i>
        </div>
    );
};

type CustomButtonRendererParams = {
    data: batchMappedType;
    value: any;
    valueFormatted: any;
    getValue: () => any;
    setValue: (value: any) => void;
    node: RowNode;
    colDef: ColDef;
    column: Column;
    rowIndex: number;
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
    refreshCell: () => void;
    eGridCell: HTMLElement;
    eParentOfValue: HTMLElement;
};

const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
    return <CustomButton rowData={params.data} />;
};

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

    const [colDefs, setColDefs] = useState<ColDef<batchMappedType, unknown>[]>([
        {field: "batch_name",headerName: "Batch",flex: 1,headerCheckboxSelection:true},
        {field: "status",headerName:"Status", flex:1},
        {headerName: "actions",flex:1,cellRenderer:CustomButtonRenderer}
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
                <AgGridReact rowSelection="multiple" rowData={obtBatches} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default BatchConfTab;