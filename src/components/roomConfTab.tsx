import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import { getAllRooms } from "../apis/backend";
import { getRoomType, roomMatchedType } from "../types/myTypes";
import { useEffect } from "react";
import { deletestuff } from "../types/myTypes";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

type CustomButtonProps = {
  rowData: roomMatchedType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();
  const editRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(
      `/editRoom?room=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
    );
  };
  const deleteUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log("&resource=id:" + rowData.id);
    const temp: deletestuff = { id: rowData.id };
    const targ = JSON.stringify(temp);
    const enc = btoa(targ);
    const resource = await fetch(
      "http://localhost:8081/api/room?session_id=" +
        seshID +
        "&resource=" +
        enc +
        "&action=DELETE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );
    console.log("result:", resource);
  };

  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        onClick={editRoom}
        className="fas fa-edit "
        style={{ cursor: "pointer" }}
      ></i>
      <i
        onClick={(e) => {
          deleteUser(e);
        }}
        className="fas fa-trash text-danger"
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

type CustomButtonRendererParams = {
  data: roomMatchedType;
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

function RoomConfTab() {
  const [obtRooms, setObtRooms] = useState<roomMatchedType[]>([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getRoomType[] = await getAllRooms();

        const mappedRowData = res.map((row) => ({
          id: row.id,
          room_number: row.room_number,
          block: row.block,
          capacity: row.capacity,
          status: row.status,
        }));

        setObtRooms(mappedRowData);
        console.log("some data", mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  const [colDefs, setColDefs] = useState<ColDef<roomMatchedType, unknown>[]>([
    {
      field: "room_number",
      headerName: "Room Number",
      flex: 1,
      headerCheckboxSelection: true,
    },
    { field: "block", headerName: "Block", flex: 1 },
    { field: "capacity", headerName: "Capacity", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { headerName: "Actions", flex: 1, cellRenderer: CustomButtonRenderer },
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

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          rowData={obtRooms}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default RoomConfTab;
