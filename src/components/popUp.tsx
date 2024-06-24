import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PopUp() {
  const [rowData, setRowData] = useState([
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
    { "SELECT ALL": "IMT2020078" },
    { "SELECT ALL": "IMT2020079" },
    { "SELECT ALL": "IMT2020080" },
  ]);

  const [colDefs1, setColDefs1] = useState([
    {
      field: "SELECT ALL",
      flex: 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerComponentParams: {
        template:
          '<div class="pt-3"><p>SELECT ALL <button class="btn btn-primary position-absolute top-0 end-0 fs-5"><i class="fa-solid fa-rotate-right"></i></button></p></div>', // the pound symbol will be placed into params
      },
    },
  ]);

  const [colDefs2, setColDefs2] = useState([
    {
      field: "SELECT ALL",
      flex: 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerComponentParams: {
        template:
          '<div class="pt-3"><p>SELECT ALL <button class="btn btn-primary position-absolute top-0 end-0 fs-5"><i class="fa-regular fa-circle-xmark"></i></button></p></div>', // the pound symbol will be placed into params
      },
    },
  ]);

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
                  rowData={rowData}
                  columnDefs={colDefs1}
                  domLayout="autoHeight"
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
                  headerCheckboxSelection={true}
                  rowData={rowData}
                  columnDefs={colDefs2}
                  domLayout="autoHeight"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ marginRight: "100px" }}>
            <button type="button" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
