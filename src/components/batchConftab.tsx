import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import { batchMappedType, getBatchType } from "../types/myTypes";
import { useEffect } from "react";
import { getAllBatches } from "../apis/backend";
import { deletestuff } from "../types/myTypes";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

// Component for rendering custom action buttons in the grid
type CustomButtonProps = {
  rowData: batchMappedType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Handler for editing a batch
  const editBatch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event from propagating to grid
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(
      `/editBatch?batch=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
    );
  };

  // Handler for deleting a batch
  const deleteBatch = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Prevent event from propagating to grid
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log("&resource=id:" + rowData.id);
    const temp: deletestuff = { id: rowData.id };
    const targ = JSON.stringify(temp);
    const enc = btoa(targ);
    const resource = await fetch(
      "http://localhost:8081/api/batch?session_id=" +
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
    window.location.reload(); // Refresh the page after deletion
  };

  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        onClick={editBatch}
        className="fas fa-edit "
        style={{ cursor: "pointer" }}
      ></i>
      <i
        onClick={(e) => {
          deleteBatch(e);
        }}
        className="fas fa-trash text-danger"
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

// Renderer for the custom action buttons
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

interface BatchConfTabProps {
  queryText: string; // Search query text
  searchStatus: boolean; // Search status flag
}

const BatchConfTab: React.FC<BatchConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  // State for batches and filtered batches
  const [obtBatches, setObtBatches] = useState<batchMappedType[]>([]);
  const [filteredBatches, setFilteredBatches] = useState<batchMappedType[]>([]);
  console.log("query text: ", queryText);

  // Fetch batches from the backend
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getBatchType[] = await getAllBatches();

        const mappedRowData = res.map((row) => ({
          id: row.id,
          batch_name: row.batch_name,
          status: row.status === "Active" ? true : false,
        }));

        setObtBatches(mappedRowData);
        console.log("some data", mappedRowData);
        setFilteredBatches(mappedRowData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  // Filter batches based on the search query
  useEffect(() => {
    const filterBatches = () => {
      if (!queryText) {
        setFilteredBatches(obtBatches);
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = obtBatches.filter((batch) =>
          Object.values(batch).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredBatches(filtered);
      }
    };

    filterBatches();
  }, [queryText, obtBatches]);

  // Define column definitions for the grid
  const [colDefs, setColDefs] = useState<ColDef<batchMappedType, unknown>[]>([
    {
      field: "batch_name",
      headerName: "Batch",
      flex: 1,
      headerCheckboxSelection: true,
    },
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
          rowData={filteredBatches}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default BatchConfTab;
