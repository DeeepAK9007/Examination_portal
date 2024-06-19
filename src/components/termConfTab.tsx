import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { getAllTerms } from "../apis/backend";
import { termType } from "../types/myTypes";
import { useNavigate } from "react-router-dom";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";

type CustomButtonProps = {
  rowData: termType;
};

type CustomButtonRendererParams = {
  data: termType;
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

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();
  const editTerm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    navigate(`/editTerm?term=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`);
  };
  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        className="fas fa-edit "
        onClick={editTerm}
        style={{ cursor: "pointer" }}
      ></i>
      <i className="fas fa-trash text-danger" style={{ cursor: "pointer" }}></i>
    </div>
  );
};

const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  // console.log(params);
  return <CustomButton rowData={params.data} />;
};

function TermConfTab() {
  // const navigate = useNavigate();

  // function Custom_button_edit(props: any) {
  //   const myClickEdit = () => {
  //     console.log("Row Data EDIT: ", props.data);
  //     navigate(`/editTerm?term=${props.data.Name}&&id=${props.data.id}`);
  //   };
  //   // const myClickDelete = async () => {
  //   //   console.log("Row Data DELTE: ", props.data);
  //   //   updateOrDeleteStudent(props.data.id, [], "DELETE");
  //   //   setBatches((prevBatches) =>
  //   //     prevBatches.filter((term : termType) => term.id !== props.data.id)
  //   //   );
  //   // };
  //   return (
  //     <div className="d-flex gap-4 justify-content-around mt-2 ">
  //       <i
  //         className="fas fa-edit "
  //         onClick={myClickEdit}
  //         style={{ cursor: "pointer" }}
  //       ></i>
  //       <i
  //         className="fas fa-trash text-danger"
  //         style={{ cursor: "pointer" }}
  //       ></i>
  //     </div>
  //   );
  // }
  const [terms, setTerms] = useState<termType[]>([]);
  const [colDefs, setColDefs] = useState([
    { field: "Date", flex: 1 },
    { field: "Name", flex: 1 },
    { field: "Status", flex: 1 },
    { field: "Actions", flex: 1, cellRenderer: CustomButtonRenderer },
  ]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getAllTerms();
        // console.log("Terms", res);
        const filteredTerms = res.map((term: termType) => ({
          id: term.id,
          Date: term.start_date + " - " + term.end_date,
          Name: term.term_name,
          Status: term.status == "Active" ? true : false,
          Actions: "remove", // Ensure this field is correctly mapped if required
        }));
        setTerms(filteredTerms);
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchTerms();
  }, []);

  console.log("Row data:", terms);
  console.log("Column Data", colDefs);

  //   const [rowData, setRowData] = useState("");

  //   useEffect(() => {
  //     // Set batchText state when rowData changes
  //     setBatchTex(rowData);
  //   }, [rowData]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={terms}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default TermConfTab;
