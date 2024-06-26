import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCourseConfTab from "./userCourseConfTab";
import { faCirclePlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function UserCourseConf() {
  const [queryText, setQueryText] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  return (
    <div>
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3">
        <p className="p-0 ms-5 mb-0 mt-2 ">Course Configuration</p>
        <div className="d-flex flex-row">
          <button
            type="button"
            className="btn btn-primary me-5"
            style={{
              width: "350px",
              height: "38px",
              fontSize: "14px",
              marginLeft: "400px",
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} /> Template
          </button>
          <div>
            <button
              type="button"
              className="btn btn-primary me-5"
              style={{
                width: "130px",
                height: "38px",
                fontSize: "14px",
                marginBottom: "10px",
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

          <div className="input-group p-0">
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
      <UserCourseConfTab queryText={queryText} searchStatus={searchStatus} />
    </div>
  );
}

export default UserCourseConf;
