import ExamTypeTab from "./examTypeConfTab";
// import { useState } from "react";

function ExamTypeConf() {
  // State variables for search functionality (currently commented out)
  // const [queryText, setQueryText] = useState<string>("");
  // const [searchStatus, setSearchStatus] = useState<boolean>(false);
  return (
    <div>
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        <p className="p-0 ms-5 mb-0 mt-2 "><h3>Exam Configuration</h3></p>

        {/* <div className="d-flex flex-row">
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
                // onChange={(e) => setQueryText(e.target.value)}
              />
              <label className="form-label"></label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init
              style={{ width: "50px", height: "38px" }}
              // onClick={() => setSearchStatus(true)}
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
        </div> */}
      </div>
      {/* Component for displaying exam type configurations */}
      {/* <ExamTypeTab queryText={queryText} searchStatus={searchStatus} /> */}
      <ExamTypeTab />
    </div>
  );
}

export default ExamTypeConf;
