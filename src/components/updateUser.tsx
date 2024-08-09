import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
import { userType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteUser } from "../apis/backend";
import { getuserType } from "../types/myTypes";
import { getAllUsers } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Define Alert component for Snackbar notifications
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateUser() {
  const navigate = useNavigate(); // Hook for navigation
  // intiialize states for input values
  const [rollNo, setRollNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [examRole, setexamRole] = useState<string>("");
  const [mob_num, setMobNO] = useState<string>("");
  const [card_num, setCardNo] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [actStatus, setActStatus] = useState<string>("");

  // intialize state for snack bar messages
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("id");

  console.log("User id:", userId);
  const [userData, setUserData] = useState<userType>({
    id: "",
    name: "",
    role: "",
    email: "",
    roll_number: "",
    mobile_number: "",
    card_number: "",
    expiry_date: "",
    image_url: "",
    status: "",
  });

  console.log("Component re-rendered");

  // Fetch user details based on user ID when component mounts or userId changes
  useEffect(() => {
    const initializeFields = async () => {
      try {
        const res: getuserType[] = await getAllUsers();

        console.log("all users", res);

        const foundUser = res.find((user) => user.id === userId);
        console.log("specified user", foundUser);
        console.log("specified user file", foundUser?.image_url);

        if (userId && foundUser) {
          setName(foundUser.name);
          setActStatus(foundUser.status);
          setCardNo(foundUser.card_number);
          setEmail(foundUser.email);
          setExpiry(foundUser.expiry_date);
          //setFile(foundUser?.image_url);
          setMobNO(foundUser.mobile_number);
          setRollNo(foundUser.roll_number);
          setexamRole(foundUser.role);
        } else {
          console.error("User ID is null or user not found");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    initializeFields();
  }, [userId]);

  // Update user data based on state changes
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res: getuserType[] = await getAllUsers();

        console.log("all users", res);

        const foundUser = res.find((user) => user.id === userId);
        console.log("specified user", foundUser);

        // if (foundUser) {
        //   setName(foundUser.name);
        // }

        if (userId && foundUser) {
          setUserData({
            id: userId,
            name: name ? name : foundUser?.name,
            role: examRole ? examRole : foundUser?.role,
            email: email ? email : foundUser.email,
            roll_number: rollNo ? rollNo : foundUser.roll_number,
            mobile_number: mob_num ? mob_num : foundUser.mobile_number,
            card_number: card_num ? card_num : foundUser.card_number,
            expiry_date: expiry ? expiry : foundUser.expiry_date,
            image_url: file ? file : foundUser.image_url,
            status: actStatus ? actStatus : foundUser.status,
          });
        } else {
          console.error("User ID is null");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, [
    rollNo,
    name,
    email,
    file,
    examRole,
    mob_num,
    card_num,
    expiry,
    actStatus,
  ]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      console.log("userData: ", userData);
      await updateOrDeleteUser(userId, userData, "MODIFY");
      setSnackbarMessage("User updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.error("user ID is null");
      setSnackbarMessage("Failed to update User.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    navigate("/user");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update User Detail
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div className="palceholder ms-1">
                <label htmlFor="file">Choose File</label>
              </div>
              <input
                type="file"
                className="form-control"
                id="file"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder"
                style={{ display: rollNo ? "none" : "" }}
              >
                <label htmlFor="rollno">Employee No/ Roll No</label>
              </div>
              <input
                id="rollno"
                type="text"
                className="form-control"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder"
                style={{ display: email ? "none" : "" }}
              >
                <label htmlFor="emailId">Enter Email</label>
              </div>
              <input
                id="emailId"
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <label htmlFor="file">Exam role</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
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
              </div>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={actStatus}
                onChange={(e) => setActStatus(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "105px", height: "44px" }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
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

export default UpdateUser;
