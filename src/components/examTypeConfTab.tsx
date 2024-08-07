import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import { getAllTypes } from "../apis/backend";
import { ExamTypeType, getTypeTypes, getExamType } from "../types/myTypes";
import { useEffect } from "react";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { deletestuff } from "../types/myTypes";
import { useNavigate } from "react-router-dom";

// Type definition for custom button props
type CustomButtonProps = {
  rowData: ExamTypeType;
};

// CustomButton component for edit and delete actions
const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Edit exam type handler
  const editExamType = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(
      `/editExamType?examtype=${btoa(JSON.stringify(rowData))}&&id=${
        rowData.id
      }`
    );
  };

  // Delete exam type handler
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
      "http://localhost:8081/api/exam_type?session_id=" +
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

  // Render edit and delete icons
  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        onClick={editExamType}
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

// Type definition for custom button renderer params
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

// Renderer for custom buttons in the grid
const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  return <CustomButton rowData={params.data} />;
};

// Props interface for the ExamTypeConfTab component
interface ExamTypeConfTabProps {
  // queryText: string;
  // searchStatus: boolean;
}

// ExamTypeTab component
const ExamTypeTab: React.FC<ExamTypeConfTabProps> = (
  {
    // queryText,
    // searchStatus,
  }
) => {
  // State to hold exam types
  const [types, setTypes] = useState<getExamType[]>([]);
  // const [filteredTypes, setFilteredTypes] = useState<ExamTypeType[]>([]);
  // console.log("query text: ", queryText);

  // Fetch exam types
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getTypeTypes[] = await getAllTypes();

        const mappedRowData = res.map((row) => ({
          id: row.id,
          exam_type_name: row.exam_type_name,
          remark: row.remark,
          status: row.status == "Active" ? true : false,
        }));

        setTypes(mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  // useEffect(() => {
  //   const filterTypes = () => {
  //     if (!queryText) {
  //       setFilteredTypes(types);
  //     } else if (queryText || searchStatus) {
  //       const lowerCaseQuery = queryText.toLowerCase();
  //       const filtered = types.filter((type) =>
  //         Object.values(type).some((value) =>
  //           String(value).toLowerCase().includes(lowerCaseQuery)
  //         )
  //       );
  //       setFilteredTypes(filtered);
  //     }
  //   };

  //   filterTypes();
  // }, [queryText, types]);

  // Column definitions for the grid
  const [colDefs, setColDefs] = useState<ColDef<ExamTypeType, unknown>[]>([
    { field: "exam_type_name", headerName: "Type", flex: 1 },
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
          rowData={types}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default ExamTypeTab;
