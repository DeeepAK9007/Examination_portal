import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import { getAllModes } from "../apis/backend";
import { ExamModeType, getModeTypes } from "../types/myTypes";
import { useEffect } from "react";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { deletestuff } from "../types/myTypes";
import { useNavigate } from "react-router-dom";
import { getExamModeTypes } from "../types/myTypes";

// Defining props for the CustomButton component
type CustomButtonProps = {
  rowData: ExamModeType;
};

// Component for rendering custom buttons in grid cells for editing and deleting exam modes
const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Function to handle the edit action
  const editExamMode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);

    // Retrieve session ID from session storage
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);

    // Navigate to the edit exam mode page with the encoded row data and ID
    navigate(
      `/editExamMode?exammode=${btoa(JSON.stringify(rowData))}&&id=${
        rowData.id
      }`
    );
  };

  // Function to handle the delete action
  const deleteUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);

    // Retrieve session ID from session storage
    const seshID = sessionStorage.getItem("key");
    console.log("&resource=id:" + rowData.id);

    // Prepare the data for deletion
    const temp: deletestuff = { id: rowData.id };
    const targ = JSON.stringify(temp);
    const enc = btoa(targ);

    // Send a DELETE request to the backend
    const resource = await fetch(
      "http://localhost:8081/api/exam_mode?session_id=" +
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

    // Reload the page to update the data
    console.log("now reloading");
    window.location.reload();
  };

  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        onClick={editExamMode}
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

// Defining parameters for the custom button renderer
type CustomButtonRendererParams = {
  data: ExamModeType;
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

// Renderer component for custom buttons in the grid
const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  return <CustomButton rowData={params.data} />;
};

interface ExamModeTabProps {
  // queryText: string;
  // searchStatus: boolean;
}

const ExamModeTab: React.FC<ExamModeTabProps> = (
  {
    // queryText,
    // searchStatus,
  }
) => {
  const [modes, setModes] = useState<getExamModeTypes[]>([]);
  // const [filteredExamModes, setFilteredExamModes] = useState<ExamModeType[]>(
  //   []
  // );
  // console.log("query text: ", queryText);

  // Fetch exam modes from the backend
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getModeTypes[] = await getAllModes(); // Fetch all modes from backend

        // Map the response data to the required format
        const mappedRowData: getExamModeTypes[] = res.map((row) => ({
          id: row.id,
          exam_mode_name: row.exam_mode_name,
          remark: row.remark,
          status: row.status == "Active" ? true : false,
        }));

        // Set the modes state with the mapped data
        setModes(mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers(); // Invoke the fetch function
  }, []);

  // useEffect(() => {
  //   const filterExamModes = () => {
  //     if (!queryText) {
  //       setFilteredExamModes(modes);
  //     } else if (queryText || searchStatus) {
  //       const lowerCaseQuery = queryText.toLowerCase();
  //       const filtered = modes.filter((mode) =>
  //         Object.values(mode).some((value) =>
  //           String(value).toLowerCase().includes(lowerCaseQuery)
  //         )
  //       );
  //       setFilteredExamModes(filtered);
  //     }
  //   };

  //   filterExamModes();
  // }, [queryText, modes]);

  // Define column definitions for the grid
  const [colDefs, setColDefs] = useState<ColDef<ExamModeType, unknown>[]>([
    {
      field: "exam_mode_name",
      headerName: "Mode",
      flex: 1,
      headerCheckboxSelection: true,
    },
    { field: "remark", headerName: "Remarks", flex: 1 },
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
          rowData={modes}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default ExamModeTab;
