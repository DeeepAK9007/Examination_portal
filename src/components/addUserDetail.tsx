import { useState } from "react";
import "./styles.css";

function AddUser() {
  const [rollNo, setRollNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add User Detail
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5">
            <input
              type="file"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder"
              style={{ display: rollNo ? "none" : "" }}
            >
              <label htmlFor="rollno">Employee No/ Roll No</label>
              <span className="star">*</span>
            </div>
            <input
              id="rollno"
              type="text"
              className="form-control"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder"
              style={{ display: email ? "none" : "" }}
            >
              <label htmlFor="emailId">Enter Email</label>
              <span className="star">*</span>
            </div>
            <input
              id="emailId"
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Card No"
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div className="">
              <select
                name="Exam Role"
                className="form-select textyformcontrol"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="" disabled selected className="default-option">
                  Exam Role
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder"
              style={{ display: name ? "none" : "" }}
            >
              <label htmlFor="name">Enter Name</label>
              <span className="star">*</span>
            </div>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Mobile"
            />
          </div>
          <div className="mb-3">
            <input
              type="Date"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Select Expiry Date"
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "105px", height: "44px" }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
