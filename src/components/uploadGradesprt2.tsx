import { useState } from "react";
import UploadGradesPart2Tab from "./uploadGradesprt2tab";

function UploadGradesPart2() {
    const [queryText, setQueryText] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  
  const termId = new URLSearchParams(location.search).get("id");
  const corsse= new URLSearchParams(location.search).get("course_nm");
  console.log("term id here",termId);
  console.log("term id here",corsse);
  
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-2 ">Course-{corsse}</p>
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-end mt-3">

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
      <UploadGradesPart2Tab queryText={queryText} searchStatus={searchStatus} />
    </div>
  );
}

export default UploadGradesPart2;
