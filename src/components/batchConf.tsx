import { useState } from "react";
import BatchConfTab from "./batchConftab";

function BatchConf() {
  // State to hold the search query text
  const [queryText, setQueryText] = useState<string>("");

  // State to manage the search status (whether to perform a search)
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  return (
    <div>
      {/* Horizontal line separator */}
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        {/* Header for the Batch Configuration section */}
        <p className="p-0 ms-5 mb-0 mt-2 ">
          <h3>Batch Configuration</h3>
        </p>

        <div className="d-flex flex-row">
          {/* Search input and button */}
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
            {/* Reset button to reload the page */}
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
      {/* Component to display batch configuration table with search functionality */}
      <BatchConfTab queryText={queryText} searchStatus={searchStatus} />
    </div>
  );
}

export default BatchConf;
