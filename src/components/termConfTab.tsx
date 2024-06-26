import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { getAllTerms } from "../apis/backend";
import { termType } from "../types/myTypes";
import { useNavigate } from "react-router-dom";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { deletestuff } from "../types/myTypes";
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
    navigate(
      `/editTerm?term=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}`
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
      "http://localhost:8081/api/term?session_id=" +
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
        className="fas fa-edit "
        onClick={editTerm}
        style={{ cursor: "pointer" }}
      ></i>
      <i
        className="fas fa-trash text-danger"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          deleteUser(e);
        }}
      ></i>
    </div>
  );
};

const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  // console.log(params);
  return <CustomButton rowData={params.data} />;
};

interface TermConfTabProps {
  queryText: string;
  searchStatus: boolean;
}

const TermConfTab: React.FC<TermConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [terms, setTerms] = useState<termType[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<termType[]>([]);
  console.log("query text: ", queryText);
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

  useEffect(() => {
    const filterTerms = () => {
      if (!queryText) {
        setFilteredTerms(terms);
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = terms.filter((term) =>
          Object.values(term).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        console.log("filtered", filtered);
        setFilteredTerms(filtered);
      }
    };

    filterTerms();
  }, [queryText, terms]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={filteredTerms}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default TermConfTab;
