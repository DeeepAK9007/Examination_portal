import React, { useState, ChangeEvent, useEffect } from "react";
import "./styles.css";
import { userType } from "../types/myTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddUser() {
  const [rollNo, setRollNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [examRole, setexamRole] = useState<string>("");
  const [mob_num, setMobNO] = useState<string>("");
  const [card_num, setCardNo] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [actStatus, setActStatus] = useState<string>("");
  const [temp, settemp] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setShowModal(true); // Show the modal when a file is selected
      };
      reader.readAsDataURL(selectedFile);
      settemp(selectedFile.name);
    } else {
      setFile(null);
      setPreviewUrl(null);
      alert("Please select a JPG or PNG file.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showModal]);

  async function handleclick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!file || !name || !rollNo || !examRole || !email || !actStatus) {
      setSnackbarMessage("Please fill all the required fields.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    if (mob_num.length !== 10) {
      setSnackbarMessage("Invalid mobile number. It should be 10 digits long.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    const newUser: userType = {
      name: name,
      role: examRole,
      email: email,
      roll_number: rollNo,
      mobile_number: mob_num,
      card_number: card_num,
      expiry_date: expiry,
      image_url: temp || "", // Use previewUrl for the image URL
      status: actStatus,
    };
    try {
      const jsonobj = JSON.stringify(newUser);
      const encode = btoa(jsonobj);
      const seshID = sessionStorage.getItem("key");

      const response = await fetch(
        "http://localhost:8081/api/user_type?session_id=" +
          seshID +
          "&resource=" +
          encode,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          mode: "cors",
        }
      );

      const jsonData = await response?.json();
      console.log("response json after submit,", jsonData);

      if (jsonData.errCode == 0) {
        setSnackbarMessage("User added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      setSnackbarMessage("Failed to add user.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        <h3>Add User Detail</h3>
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row justify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div className="palceholder ms-1">
              <label htmlFor="file" style={{ visibility: "hidden" }}>
                Choose File{" "}
              </label>
              <span className="star"> *</span>
            </div>
            <input
              type="file"
              className="form-control"
              accept=".jpg,.jpeg,.png"
              id="file"
              onChange={handleFileChange}
              required
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
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Card No"
              value={card_num}
              onChange={(e) => {
                setCardNo(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: examRole ? "none" : "" }}
            >
              <label htmlFor="examrole">User role</label>
              <span className="star"> *</span>
            </div>
            <select
              name="examrol"
              className="form-select"
              id="examrole"
              aria-label="Floating label select example"
              value={examRole}
              onChange={(e) => setexamRole(e.target.value)}
            >
              <option id="examrole" value="" disabled selected></option>
              <option value="Admin">Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
              <option value="Co-ordinator">Co-ordinator</option>
              <option value="Invigilator">Invigilator</option>
              <option value="Staff">Staff</option>
              <option value="Supervisor">Supervisor</option>
            </select>
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
              type="text"
              className="form-control"
              placeholder="Enter Mobile"
              value={mob_num}
              onChange={(e) => {
                setMobNO(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="Date"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Select Expiry Date"
              value={expiry}
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: actStatus ? "none" : "" }}
            >
              <label htmlFor="status">Status</label>
              <span className="star"> *</span>
            </div>
            <select
              name="stat"
              className="form-select"
              id="status"
              aria-label="Floating label select example"
              value={actStatus}
              onChange={(e) => setActStatus(e.target.value)}
            >
              <option id="status" value="" disabled selected></option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "105px", height: "44px" }}
              onClick={handleclick}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {previewUrl && showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Preview</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={previewUrl}
                  alt="Selected File Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddUser;
