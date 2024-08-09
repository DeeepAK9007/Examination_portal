import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { getAllUsers } from "../apis/backend";
import { getuserType, userMappedType } from "../types/myTypes";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { deletestuff } from "../types/myTypes";
import { useNavigate } from "react-router-dom";

// CustomButton component for editing and deleting rows
type CustomButtonProps = {
  rowData: userMappedType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();
  // Handle edit button click
  const editUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(
      `/editUser?user=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
    );
  };

  // Handle delete button click
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
      "http://localhost:8081/api/user_type?session_id=" +
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
        onClick={editUser}
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

// Renderer for custom button cells in the grid
type CustomButtonRendererParams = {
  data: userMappedType;
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

interface UserTabProps {
  queryText: string;
  searchStatus: boolean;
}

// Main Component for displaying user data in a grid
const UserCourseConfTab: React.FC<UserTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [obt_users, setObtUsers] = useState<userMappedType[]>([]); // All users data
  const [filteredUsers, setFilteredUsers] = useState<userMappedType[]>([]); // Filtered users data
  console.log("query text: ", queryText);

  useEffect(() => {
    // Fetch users from backend
    const fetchusers = async () => {
      try {
        const res: getuserType[] = await getAllUsers();

        console.log("res: ", res);

        // Map the response to match the grid's expected format
        const mappedRowData = res.map((row) => ({
          id: row.id,
          roll_number: row.roll_number,
          Uname: row.name,
          email: row.email,
          role: row.role,
          status: row.status == "Active" ? true : false,
        }));

        setObtUsers(mappedRowData);
        console.log("some data", mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  useEffect(() => {
    // Filter users based on query text
    const filterUsers = () => {
      if (!queryText) {
        setFilteredUsers(obt_users);
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = obt_users.filter((user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredUsers(filtered);
      }
    };

    filterUsers();
  }, [queryText, obt_users]);

  // Define column definitions for the grid
  const [colDefs, setColDefs] = useState<ColDef<userMappedType, unknown>[]>([
    {
      field: "roll_number",
      headerName: "Employee Number",
      flex: 1,
      headerCheckboxSelection: true,
    },
    { field: "Uname", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
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
          rowData={filteredUsers}
          columnDefs={colDefs}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default UserCourseConfTab;
