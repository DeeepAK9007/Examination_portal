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
import AttendTab from "./attendTab";

type CustomButtonProps = {
  rowData: batchMappedType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();
  const editBatch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(
      `/editBatch?batch=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
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
    window.location.reload();
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
          deleteUser(e);
        }}
        className="fas fa-trash text-danger"
        style={{ cursor: "pointer" }}
      ></i>
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

interface BatchConfTabProps {
  queryText: string;
  searchStatus: boolean;
}

const BatchConfTab: React.FC<BatchConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [obtBatches, setObtBatches] = useState<batchMappedType[]>([]);
  const [filteredBatches, setFilteredBatches] = useState<batchMappedType[]>([]);
  console.log("query text: ", queryText);

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

  const [colDefs, setColDefs] = useState<ColDef<batchMappedType, unknown>[]>([
    {
      field: "batch_name",
      headerName: "Batch",
      flex: 1,
      headerCheckboxSelection: true,
    },
    { field: "status", flex: 1 },
    { headerName: "actions", flex: 1, cellRenderer: CustomButtonRenderer },
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
