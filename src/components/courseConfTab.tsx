import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import Custom_button from "./actions";
import Modal from "react-modal";
import PopUp from "./popUp";

Modal.setAppElement("#root"); // For accessibility

const CourseConfTab: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onCellClicked = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [rowData, setRowData] = useState([
    { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
    { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
    { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
  ]);

  const [colDefs, setColDefs] = useState([
    {
      field: "Course_Code",
      flex: 1,
    },
    { field: "Course_Name", flex: 1 },
    { field: "Active", flex: 1 },
    { field: "Actions", flex: 1, cellRenderer: Custom_button },
  ]);

  const customStyles = {
    content: {
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%", // You can adjust the width and height as needed
      height: "80%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Adjust the background color as needed
    },
  };

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={rowData}
          onCellClicked={onCellClicked}
          columnDefs={colDefs}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cell Data Modal"
        style={customStyles}
      >
        <PopUp />
      </Modal>
    </div>
  );
};

export default CourseConfTab;
