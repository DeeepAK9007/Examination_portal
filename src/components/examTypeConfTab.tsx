import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import { getAllTypes } from '../apis/backend';
import { ExamTypeType, getTypeTypes} from '../types/myTypes';
import { useEffect } from 'react';
import { ColDef, GridApi, ColumnApi, RowNode, Column } from 'ag-grid-community';
import { deletestuff } from "../types/myTypes";


type CustomButtonProps = {
  rowData: ExamTypeType;
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
      const resource= await fetch("http://localhost:8081/api/exam_type?session_id="+seshID+"&resource="+enc+"&action=DELETE",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            mode: "cors"
          }
        );
      console.log("result:",resource);
      window.location.reload();
  };

  return (
      <div className="d-flex gap-4 justify-content-around mt-2 ">
          <i className="fas fa-edit " style={{ cursor: "pointer" }}></i>
          <i onClick={(e) => { deleteUser(e) }} className="fas fa-trash text-danger" style={{ cursor: "pointer" }}></i>
      </div>
  );
};

type CustomButtonRendererParams = {
  data: ExamTypeType;
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

function ExamTypeTab()
{
    const [types,setTypes]=useState<ExamTypeType[]>([]);
    
    useEffect(() => {
    const fetchusers = async () => {
        try {
        const res: getTypeTypes[] = await getAllTypes();

        const mappedRowData = res.map((row) => ({
            id:row.id,
            exam_type_name:row.exam_type_name,
            remark:row.remark,
            status:row.status
        }));

        setTypes(mappedRowData);
        } catch (error) {
        console.log("Error fetching data:", error);
        }
    };
    fetchusers();
    }, []);  

    const [colDefs, setColDefs] = useState<ColDef<ExamTypeType, unknown>[]>([
        {field: "exam_type_name",headerName: "Type",flex: 1,},
        { field: "remark", headerName: "Remarks" ,flex:1},
        { field: "status",headerName: "Status",flex:1},        
        { headerName: "Actions",flex:1,cellRenderer:CustomButtonRenderer}
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
                <AgGridReact rowSelection="multiple" rowData={types} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default ExamTypeTab;