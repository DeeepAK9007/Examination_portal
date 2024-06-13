import { useState } from "react";
import "./styles.css";
import { userType } from "../types/myTypes";

function AddUser() {
  const [rollNo, setRollNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [examRole, setexamRole] = useState<string>("");
  const [mob_num, setMobNO] = useState<string>("");
  const [card_num, setCardNo] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCourse(e.target.value);
  //   console.log(e.target.value);
  // };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setexamRole(event.target.value);
    console.log(event.target.value);
  };

  async function handleclick(e : React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newUser: userType={
        name:name,
        role:examRole,
        email:email,
        roll_number:rollNo,
        mobile_number:mob_num,
        card_number:card_num,
        expiry_date:expiry,
        image_url:file
      }
    console.log(newUser);
    
    const jsonobj=JSON.stringify(newUser);
    console.log(jsonobj);
    const encode=btoa(jsonobj);
    console.log(encode);
    const seshID=sessionStorage.getItem("key");
    console.log(seshID);

    const resource= await fetch("http://localhost:8081/api/user_type?session_id="+seshID+"&resource="+encode,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors"
      }
    );

    console.log(resource);
  }

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add User Detail
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div className="palceholder ms-1">
              <label htmlFor="file">Choose File</label>
              <span className="star"> *</span>
            </div>
            <input
              type="file"
              className="form-control"
              id="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
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
              type="text"
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
              onChange={(e)=>{setCardNo(e.target.value)}}
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
              <span className="star"> *</span>
            </div>
            <select
              name="block"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={examRole}
              onChange={handleSelectChange}
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
              onChange={(e)=>{setMobNO(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <input
              type="Date"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Select Expiry Date"
              value={expiry}
              onChange={(e)=>{setExpiry(e.target.value)}}
            />
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
      </form >
    </div >
  );
}

export default AddUser;
