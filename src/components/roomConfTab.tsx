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

// Component to render custom buttons for each row
const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Function to handle editing a room
  const editRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    // Navigate to edit room page with encoded room data
    navigate(
      `/editRoom?room=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
    );
  };

  // Function to handle deleting a room
  const deleteUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log("&resource=id:" + rowData.id);
    const temp: deletestuff = { id: rowData.id };
    const targ = JSON.stringify(temp);
    const enc = btoa(targ);
    // Send DELETE request to backend
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
    window.location.reload();
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

// Custom button renderer for ag-Grid
const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  return <CustomButton rowData={params.data} />;
};
interface RoomConfTabProps {
  queryText: string;
  searchStatus: boolean;
}

// Main component for Room Configuration tab
const RoomConfTab: React.FC<RoomConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  // State to store all room data
  const [obtRooms, setObtRooms] = useState<roomMatchedType[]>([]);
  // State to store filtered room data based on search query
  const [filteredRooms, setFilteredRooms] = useState<roomMatchedType[]>([]);
  console.log("query text: ", queryText);
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getRoomType[] = await getAllRooms();
        console.log("obt data here", res);
        const mappedRowData = res.map((row) => ({
          id: row.id,
          room_number: row.room_number,
          block: row.block,
          capacity: row.capacity,
          status: row.status == "Active" ? true : false,
        }));

        setObtRooms(mappedRowData);
        console.log("some data", mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  // search operation
  useEffect(() => {
    const filterRooms = () => {
      if (!queryText) {
        setFilteredRooms(obtRooms);
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = obtRooms.filter((room) =>
          Object.values(room).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredRooms(filtered);
      }
    };

    filterRooms();
  }, [queryText, obtRooms]);

  // Column definitions for ag-Grid
  const [colDefs, setColDefs] = useState<ColDef<roomMatchedType, unknown>[]>([
    {
      field: "room_number",
      headerName: "Room Number",
      flex: 1,
      headerCheckboxSelection: true,
    },
    { field: "block", headerName: "Block", flex: 1 },
    { field: "capacity", headerName: "Capacity", flex: 1 },
    { field: "status", flex: 1 },
    { headerName: "Actions", flex: 1, cellRenderer: CustomButtonRenderer },
  ]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 250, width: "93%", overflowY: "auto" }}
      >
        <AgGridReact
          rowSelection="multiple"
          rowData={filteredRooms}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default RoomConfTab;
