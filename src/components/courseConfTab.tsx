import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import Custom_button from "./actions";
import Modal from "react-modal";
import PopUp from "./popUp";
import { courseType } from "../types/myTypes";
import { getAllCourses } from "../apis/backend";

Modal.setAppElement("#root"); // For accessibility

const CourseConfTab: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onCellClicked = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const [rowData, setRowData] = useState([
  //   { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
  //   { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
  //   { Course_Code: 500, Course_Name: "Maxx", Active: true, Actions: "Remove" },
  // ]);

  const [courses, setCourses] = useState<courseType[]>([]);

  const [colDefs, setColDefs] = useState([
    {
      field: "Course_Code",
      flex: 1,
    },
    { field: "Course_Name", flex: 1 },
    { field: "Status", flex: 1 },
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

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getAllCourses();
        // console.log("Terms", res);
        const filteredTerms = res.map((course: courseType) => ({
          Course_Code: course.course_code,
          Course_Name: course.course_name,
          Status: course.status == "Active" ? true : false,
          Actions: "remove", // Ensure this field is correctly mapped if required
        }));
        setCourses(filteredTerms);
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchTerms();
  }, []);

  console.log("Row data:", courses);
  console.log("Column Data", colDefs);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={courses}
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
