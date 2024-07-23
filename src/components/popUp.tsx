import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAllUsers } from "../apis/backend";
import { userMappedType } from "../types/myTypes";
import { AddEnrolment } from "../apis/backend";
import { enrollmentType } from "../types/myTypes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PopUp = (courseData: any) => {
  console.log("from Popup ", courseData.courseData.id);

  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState<enrollmentType[]>([]);
  const [selectedRowData2, setSelectedRowData2] = useState<enrollmentType[]>(
    []
  );
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [filteredRowDat1, setFilteredRowData1] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const CustomHeaderCross = (props) => {
    const onButtonClick = () => {
      setFilteredRowData1([]);
    };

    return (
      <div className="pt-3">
        <p>
          SELECT ALL
          <button
            className="btn btn-primary position-absolute top-0 end-0 fs-5"
            onClick={onButtonClick}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </p>
      </div>
    );
  };

  const CustomHeaderRefresh = (props) => {
    const onButtonClick = () => {
      props.api.refreshCells({ force: true });
    };

    return (
      <div className="pt-3">
        <p>
          SELECT ALL
          <button
            className="btn btn-primary position-absolute top-0 end-0 fs-5"
            onClick={onButtonClick}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </p>
      </div>
    );
  };

  const [colDefs1, setColDefs1] = useState([
    {
      field: "SELECT ALL",
      flex: 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerComponent: CustomHeaderRefresh,
    },
  ]);

  const [colDefs2, setColDefs2] = useState([
    {
      field: "SELECT ALL",
      flex: 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerComponent: CustomHeaderCross,
    },
  ]);

  const [enrollmentData, setEnrollmentData] = useState<enrollmentType[]>([
    {
      user_type_enrollment_id: "",
      course_enrollment_id: "",
    },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        console.log("response recieved", res);
        const students = res
          .filter((user: userMappedType) => user.role === "Student")
          .map((student: any) => ({ "SELECT ALL": student.roll_number }));

        console.log("students retrieved", students);
        setRowData(students);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

  const onSelectionChanged = async (params: any) => {
    const selectedRows = params.api.getSelectedRows();
    console.log("selected rows ", selectedRows);

    try {
      const res = await getAllUsers();
      console.log("response recieved", res);

      const rollNumbers: any = [];

      selectedRows.forEach((obj: any) => {
        // console.log("bool", Object.values(obj));
        rollNumbers.push(Object.values(obj)[0]);
      });

      console.log("roll numbers", rollNumbers);

      const mapStudentsToCourse = res
        .filter((user: userMappedType) => {
          return (
            rollNumbers.includes(user.roll_number) && user.role === "Student"
          );
        })
        .map((student: any) => ({
          user_type_enrollment_id: student.id,
          course_enrollment_id: courseData.courseData.id,
        }));
      console.log("mapStudentsToCourse", mapStudentsToCourse);
      setEnrollmentData(mapStudentsToCourse); // Update state

      // Now you can use enrollmentData immediately after setting it
      console.log("Updated enrollmentData", enrollmentData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    //console.log(enrollmentData);
    setSelectedRowData(selectedRows);
  };

  const onSelectionChanged2 = async (params: any) => {
    const selectedRows = params.api.getSelectedRows();
    console.log("selected rows 2", selectedRows);

    setSelectedRowData2(selectedRows);
  };

  const handleAddIcon = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (selectedRowData) {
      setIsAddClicked(true);
    }
  };

  const handleRemoveIcon = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsAddClicked(false);
    setSelectedRowData([]);
  };

  const handdleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      console.log("data from handleSubmit: ", enrollmentData);
      await AddEnrolment(enrollmentData);
      setSnackbarMessage("Enrollment successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log("Error in enrollment: ", error);
      setSnackbarMessage("Failed to add Enrollment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const filterData = () => {
      if (!searchQuery1) {
        setFilteredRowData(rowData);
      } else if (searchQuery1) {
        const lowerCaseQuery = searchQuery1.toLowerCase();
        const filtered = rowData.filter((batch) =>
          Object.values(batch).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        console.log("filtered data", filtered);
        setFilteredRowData(filtered);
      }
    };

    filterData();
  }, [searchQuery1, rowData]);

  useEffect(() => {
    const filterData = () => {
      if (!searchQuery2) {
        setFilteredRowData1(selectedRowData);
      } else if (searchQuery2) {
        const lowerCaseQuery = searchQuery2.toLowerCase();
        const filtered = selectedRowData.filter((batch) =>
          Object.values(batch).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        console.log("filtered data", filtered);
        setFilteredRowData1(filtered);
      }
    };

    filterData();
  }, [searchQuery2, selectedRowData]);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1 className="fs-5">Map Students to Course</h1>
          </div>
          <div>
            <div className="pb-5">
              <button
                className="btn btn-primary position-absolute top-0 end-0 mt-4"
                type="button"
                style={{ marginRight: "110px" }}
              >
                <FontAwesomeIcon icon={faCirclePlus} /> Bulk Upload
              </button>
              <a
                id="downloadLink"
                className="download-link position-absolute top-0 end-0 text-danger"
                href="#"
                download="example.txt"
                style={{ marginRight: "110px", marginTop: "70px" }}
              >
                <FontAwesomeIcon icon={faDownload} />
                Download
              </a>
            </div>
            <div className="d-flex justify-spacebetween">
              <form
                className="d-flex mb-3 mt-3"
                style={{ paddingLeft: "100px", paddingRight: "100px" }}
              >
                <input
                  className="form-control fs-5"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery1}
                  onChange={(e) => setSearchQuery1(e.target.value)}
                  style={{ height: "50px", width: "200px" }} // Adjust the height as needed
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ fontSize: "18px" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
              <form
                className="d-flex mb-3 mt-3"
                style={{ paddingLeft: "150px", paddingRight: "40px" }}
              >
                <input
                  className="form-control fs-5"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery2}
                  onChange={(e) => setSearchQuery2(e.target.value)}
                  style={{ height: "50px", width: "200px" }} // Adjust the height as needed
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ fontSize: "18px" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ paddingLeft: "100px", paddingRight: "100px" }}
            >
              <div
                className="ag-theme-quartz shadow"
                style={{
                  height: 400,
                  width: "48%",
                  overflowY: "auto",
                }}
              >
                <AgGridReact
                  rowSelection="multiple"
                  headerCheckboxSelection={true}
                  rowData={filteredRowData}
                  columnDefs={colDefs1}
                  domLayout="autoHeight"
                  onSelectionChanged={onSelectionChanged}
                />
              </div>

              <div>
                <div
                  className="text-primary"
                  style={{
                    paddingTop: "100px",
                    fontSize: "40px",
                    paddingRight: "100px",
                    paddingLeft: "100px",
                  }}
                  onClick={handleAddIcon}
                >
                  <span style={{ fontSize: "20px" }}>add</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div
                  className="text-primary"
                  style={{
                    fontSize: "40px",
                    paddingRight: "100px",
                    paddingLeft: "100px",
                  }}
                  onClick={handleRemoveIcon}
                >
                  <span style={{ fontSize: "20px" }}>remove</span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </div>

              <div
                className="ag-theme-quartz shadow"
                style={{ height: 400, width: "48%", overflowY: "auto" }}
              >
                <AgGridReact
                  rowSelection="multiple"
                  headerCheckboxSelection={false}
                  rowData={isAddClicked ? filteredRowDat1 : []}
                  columnDefs={colDefs2}
                  domLayout="autoHeight"
                  onSelectionChanged={onSelectionChanged2}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ marginRight: "100px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handdleSubmit}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopUp;
