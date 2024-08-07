import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

function AddIssue() {
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>Issue Reporting</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <div className="d-flex justify-content-end mt-3">
        <div className="d-flex flex-row me-5 float-end">
          <div className="dropdown-center me-5">
            {/* Button to trigger the modal for reporting an incident */}
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              aria-expanded="false"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Report Incident
            </button>

            {/* Modal for incident reporting */}
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ paddingTop: "100px" }}>
                <div
                  className="modal-content"
                  style={{
                    width: 400,
                    height: 200,
                    left: "45%",
                  }}
                >
                  <div className="modal-header">
                    {/* File input for uploading proof */}
                    <label>
                      <input type="file" style={{ display: "none" }} />
                      <a
                        className=" position-absolute top-0 end-0 text-primary"
                        style={{ marginRight: "50px", marginTop: "12px" }}
                      >
                        <FontAwesomeIcon icon={faUpload} />
                        Upload Proof
                      </a>
                    </label>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    className="modal-body-secondary"
                    style={{ height: 200, overflowY: "auto" }}
                  >
                    {/* Textarea for entering remarks */}
                    <textarea
                      className="form-control"
                      placeholder="Remarks"
                      style={{ width: "100%", height: "100%" }}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    {/* Button to submit the incident report */}
                    <button type="button" className="btn btn-danger">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="input-group">
            <div
              id="search-autocomplete"
              className="form-outline"
              data-mdb-input-init
            >
              {/* Input field for searching course name */}
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Course Name"
              />
              <label className="form-label"></label>
            </div>
            {/* Button to initiate the search */}
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init
              style={{ width: "50px", height: "38px" }}
            >
              <i className="fas fa-search"></i>
            </button>
            {/* Button to reload the page */}
            <div style={{ marginLeft: "50px" }}>
              <button
                type="button"
                className="btn btn-primary"
                data-mdb-ripple-init
                style={{ width: "50px", height: "38px" }}
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddIssue;
