import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCourseConfTab from "./userCourseConfTab";
import {
  faCirclePlus,
  faDownload,
  faSearch,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function UserCourseConf() {
  const [queryText, setQueryText] = useState<string>(""); // State for search query
  const [searchStatus, setSearchStatus] = useState<boolean>(false); // State to trigger search
  return (
    <div>
      <hr style={{ width: "100%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        <div className="ms-5 mb-0 mt-2">
          <h3>User Configuration</h3>
        </div>
        <div className="d-flex flex-row justify-content-end me-5">
          <div>
            <button
              type="button"
              className="btn btn-primary me-5"
              style={{
                width: "250px",
                height: "38px",
                fontSize: "14px",
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} /> Template
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary me-2"
              style={{
                width: "130px",
                height: "38px",
                fontSize: "14px",
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} /> Bulk Upload
            </button>
            <a
              id="downloadLink"
              className="download-link text-danger"
              href="#"
              download="example.txt"
              style={{ marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faDownload} />
              Download
            </a>
          </div>

          <div className="input-group me-2">
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
              style={{ width: "50px", height: "38px" }}
              onClick={() => setSearchStatus(true)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary me-4"
              style={{ width: "50px", height: "38px" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
      </div>
      {/* UserCourseConfTab Component with search functionality */}
      <UserCourseConfTab queryText={queryText} searchStatus={searchStatus} />
    </div>
  );
}

export default UserCourseConf;
