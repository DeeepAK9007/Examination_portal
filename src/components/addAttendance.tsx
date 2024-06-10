function AddAttend() {
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Attendance Detail
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <div className="d-flex justify-content-between ms-5 mt-3">
        <button className="btn btn-success" style={{ height: "75%" }}>
          <i className="fa-solid fa-qrcode me-1"></i>Scan Qr
        </button>
        <div className="d-flex flex-row me-5">
          <div className="dropdown-center me-5">
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Action
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" style={{ color: "red" }} href="#">
                  Mark Present
                </a>
              </li>
              <li>
                <a className="dropdown-item" style={{ color: "red" }} href="#">
                  Mark Absent
                </a>
              </li>
              <li>
                <button
                  className="btn btn-primary"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginLeft: "70px",
                  }}
                >
                  submit
                </button>
              </li>
            </ul>
          </div>
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
                placeholder="Room Number"
              />
              <label className="form-label"></label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init
              style={{ width: "50px", height: "38px" }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttend;
