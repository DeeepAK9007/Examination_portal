import CourseConfTab from "./courseConfTab";
import { useState } from "react";

function CourseConf() {
  const [queryText, setQueryText] = useState<string>(""); // State for search query text
  const [searchStatus, setSearchStatus] = useState<boolean>(false); // State to manage search status

  return (
    <div>
      {/* Horizontal line for visual separation */}
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        <p className="p-0 ms-5 mb-0 mt-2 ">
          <h3>Course Configuration</h3>
          {/* Heading for the course configuration section */}
        </p>

        <div className="d-flex flex-row">
          <div className="input-group">
            <div
              id="search-autocomplete"
              className="form-outline"
              data-mdb-input-init
            >
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search"
                onChange={(e) => setQueryText(e.target.value)}
              />
              <label className="form-label"></label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init
              style={{ width: "50px", height: "38px" }}
              onClick={() => setSearchStatus(true)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary me-5"
            style={{ width: "50px", height: "38px" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
      {/* Component for displaying course configuration details with search */}
      <CourseConfTab queryText={queryText} searchStatus={searchStatus} />
    </div>
  );
}

export default CourseConf;
