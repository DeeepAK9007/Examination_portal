import { User } from "../context/loginContext";
import {
  examModeUpdateType,
  scheduleType,
  termType,
  updateGradeType,
} from "../types/myTypes";
import { courseType } from "../types/myTypes";
import { batchType } from "../types/myTypes";
import { roomMatchedType } from "../types/myTypes";
import { userType } from "../types/myTypes";
import { ExamTypeType } from "../types/myTypes";
import { ExamModeType } from "../types/myTypes";
import { enrollmentType } from "../types/myTypes";
import { addProgCordType } from "../types/myTypes";
import { attendance } from "../types/myTypes";

// Function to handle user login by posting user data to an API endpoint
export const login = async (user: User) => {
  console.log("Adding User: ", user);
  try {
    // Encode the user object as a Base64 string
    const new_obj = btoa(JSON.stringify(user));
    console.log("new object here", new_obj);

    // Create the request body with the encoded user object
    const body = "resource=" + new_obj;

    // Send a POST request to the login endpoint with the encoded user data
    const response = await fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
      body: body,
    });
    console.log(response);
    console.log("body here", body);

    // Parse the JSON response from the server
    const jsonData = await response.json();
    console.log("response json after submit,", jsonData);
    // console.log("Login output after submit",jsonData.resource[0].session_id);
    // Extract the session ID from the response
    const ssid = jsonData.resource[0].session_id;
    return ssid;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// Function to add a term by sending term data to an API endpoint
export const addOneTerm = async (term: termType) => {
  console.log("adding ", term);
  try {
    // Convert the term object to a JSON string
    const jsonObj = term;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding term: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/term?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding term: ", response);
    return response;
  } catch (error) {
    console.log(" error message: ", error);
  }
};

// Function to add a course by sending course data to an API endpoint
export const addOneCourse = async (course: courseType) => {
  console.log("adding ", course);
  try {
    // Convert the course object to a JSON string
    const jsonObj = course;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    console.log(`Base Encoding of adding course: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/course?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding course: ", response);
    return response;
  } catch (error) {
    console.log("Error while adding course", error);
  }
};

// Function to add a schedule by sending schedule data to an API endpoint
export const addOneSchedule = async (schedule: scheduleType) => {
  console.log("adding ", schedule);
  try {
    const jsonObj = schedule;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding schedule stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding schedule: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding student: ", response);
    return response;
  } catch (error) {
    console.log(" error message: ", error);
  }
};

// Function to add a program-coordinator by sending prog-coord data to an API endpoint
export const addProgCord = async (pro: addProgCordType) => {
  console.log("adding ", pro);
  try {
    const jsonObj = pro;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding term: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding student: ", response);
    return response;
  } catch (error) {
    console.log(" error message: ", error);
  }
};

// Function to add attendnace by sending attendance data to an API endpoint
export const addAttendance = async (att: attendance[]) => {
  console.log("adding ", att);
  try {
    const jsonObj = att;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding attendance stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding term: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/attendance?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding student: ", response);
  } catch (error) {
    console.log(" error message: ", error);
  }
};

// Function to fetch all terms from the API
export const getAllTerms = async () => {
  try {
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api term", ssid);

    // Define the query ID for the API request
    const queryId = "GET_ALL";

    // Send a GET request to the API endpoint to fetch terms
    const response = await fetch(
      "http://localhost:8081/api/term?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    // Parse and log the JSON response from the server
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);

    // Extract and return the terms data from the JSON response
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

// Function to fetch all courses from the API
export const getAllCourses = async () => {
  try {
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api course", ssid);

    // Define the query ID for the API request
    const queryId = "GET_ALL";

    // Send a GET request to the API endpoint to fetch courses
    const response = await fetch(
      "http://localhost:8081/api/course?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    // Parse and log the JSON response from the server
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    // Extract and return the courses data from the JSON response
    const courses = jsonData.resource;
    return courses;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

// Function to fetch all schedules from the API
export const getAllSchedules = async () => {
  try {
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api schedule", ssid);

    // Define the query ID for the API request
    const queryId = "GET_ALL";

    // Send a GET request to the API endpoint to fetch schedules
    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    // Parse and log the JSON response from the server
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);

    // Extract and return the terms data from the JSON response
    const schedules = jsonData.resource;
    return schedules;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

// Function to fetch all program coordinator from the API
export const getProgCord = async () => {
  try {
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api schedule", ssid);

    // Define the query ID for the API request
    const queryId = "GET_ALL";

    // Send a GET request to the API endpoint to fetch program coordinator
    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    // Parse and log the JSON response from the server
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    // Extract and return the terms data from the JSON response
    const progCoords = jsonData.resource;
    return progCoords;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

// Function to fetch all users from the API
export const getAllUsers = async () => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");
  console.log("session id: ", seshId);

  // Send a GET request to the API endpoint to fetch users
  const response = await fetch(
    "http://localhost:8081/api/user_type?queryId=GET_ALL&session_id=" + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log(response);
  // Parse and log the JSON response from the server
  const json_users = await response.json();
  // Extract and return the users data from the JSON response
  const users = json_users.resource;
  console.log(users);
  return users;
};

// Function to fetch all batches from the API
export const getAllBatches = async () => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");

  // Send a GET request to the API endpoint to fetch batches
  const response = await fetch(
    "http://localhost:8081/api/batch?queryId=GET_ALL&session_id=" + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Parse and log the JSON response from the server
  const json_users = await response.json();
  const batches = json_users.resource;
  return batches;
};

// Function to fetch all rooms from the API
export const getAllRooms = async () => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");

  // Send a GET request to the API endpoint to fetch rooms
  const response = await fetch(
    "http://localhost:8081/api/room?queryId=GET_ALL&session_id=" + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Parse and log the JSON response from the server
  const json_users = await response.json();
  // Extract and return the rooms data from the JSON response
  const rooms = json_users.resource;
  return rooms;
};

// Function to add a exam_mode by sending exam_mode data to an API endpoint
export const addExam_mode = async (exam: examModeUpdateType) => {
  console.log("adding ", exam);
  try {
    const jsonObj = exam;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding exam stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding exam: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      "http://localhost:8081/api/course?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    // Parse and log the JSON response from the server
    const json_users = await response.json();
    const exammode = json_users.resource;
    return exammode;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to fetch all modes from the API
export const getAllModes = async () => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");

  // Send a GET request to the API endpoint to fetch modes
  const response = await fetch(
    "http://localhost:8081/api/exam_mode?queryId=GET_ALL&session_id=" + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Parse and log the JSON response from the server
  const json_users = await response.json();
  // Extract and return the terms data from the JSON response
  const modes = json_users.resource;
  return modes;
};

// Function to fetch schedule by id from the API
export const getScheduleById = async (id: string) => {
  try {
    // Retrieve the session ID from session storage
    const seshId = sessionStorage.getItem("key");

    // Send a GET request to the API endpoint to fetch schedule by id
    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?queryId=GET_EXAM_SCHEDULE_BY_ID&session_id=" +
        seshId +
        "&args=id:" +
        id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Parse and log the JSON response from the server
    const json_users = await response.json();
    // Extract and return the schedule data from the JSON response
    const sche = json_users.resource;
    return sche;
  } catch (error) {
    console.log("error while getting schedule.");
  }
};

// Function to fetch all exam types from the API
export const getAllTypes = async () => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");

  // Send a GET request to the API endpoint to fetch exam types
  const response = await fetch(
    "http://localhost:8081/api/exam_type?queryId=GET_ALL&session_id=" + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Parse and log the JSON response from the server
  const json_users = await response.json();
  // Extract and return the types data from the JSON response
  const types = json_users.resource;
  return types;
};

// Function to update or delete a term based on the action specified
export const updateOrDeleteTerm = async (
  termId: string,
  newData: termType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("term ID:", termId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: termId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the term
    const response = await fetch(
      "http://localhost:8081/api/term?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updation: ", error);
  }
};

// Function to update or delete a course based on the action specified
export const updateOrDeleteCourse = async (
  courseId: string,
  newData: courseType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("course ID:", courseId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: courseId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the course
    const response = await fetch(
      "http://localhost:8081/api/course?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating course ", error);
  }
};

// Function to update or delete a batch based on the action specified
export const updateOrDeleteBatch = async (
  batchId: string,
  newData: batchType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("batch ID:", batchId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: batchId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the batch
    const response = await fetch(
      "http://localhost:8081/api/batch?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating batch ", error);
  }
};

// Function to update or delete a room based on the action specified
export const updateOrDeleteRoom = async (
  roomId: string,
  newData: roomMatchedType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("room ID:", roomId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: roomId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the room
    const response = await fetch(
      "http://localhost:8081/api/room?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating room ", error);
  }
};

// Function to update or delete a user based on the action specified
export const updateOrDeleteUser = async (
  userId: string,
  newData: userType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("user ID:", userId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: userId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the user
    const response = await fetch(
      "http://localhost:8081/api/user_type?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating user ", error);
  }
};

// Function to update or delete a exam type based on the action specified
export const updateOrDeleteExamType = async (
  examtypeId: string,
  newData: ExamTypeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("examtype ID:", examtypeId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examtypeId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the exam type
    const response = await fetch(
      "http://localhost:8081/api/exam_type?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating examtype ", error);
  }
};

// Function to update or delete a exam mode based on the action specified
export const updateOrDeleteExamMode = async (
  examModeId: string,
  newData: ExamModeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("examMode ID:", examModeId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examModeId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the exam mode
    const response = await fetch(
      "http://localhost:8081/api/exam_mode?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updating examMode ", error);
  }
};

// Function to update or delete a schedule based on the action specified
export const updateOrDeleteSchedule = async (
  scheduleId: string,
  newData: scheduleType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    // Retrieve the session ID from session storage
    const ssid = sessionStorage.getItem("key");

    // Check if session ID exists
    if (ssid !== null) {
      console.log("session_id", ssid);
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log("term ID:", scheduleId);
    console.log("New Data:", newData);

    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource
    console.log("New Data after stingigy: ", JSON.stringify(newData));

    // Convert new data to JSON string and then to Base64 encoding
    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: scheduleId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    // Send a POST request to the API to update or delete the echedule
    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?session_id=" +
        ssid +
        "&resource=" +
        base64EncodedData +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error while updation: ", error);
  }
};

// Function to add a enrollment by sending enrollment data to an API endpoint
export const AddEnrolment = async (enroll: enrollmentType[]) => {
  console.log("adding ", enroll);
  try {
    const jsonObj = enroll;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding enroll stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding course: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log(
      "api link ",
      "http://localhost:8081/api/enrollment?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded +
        "&action=addBulk"
    );

    const response = await fetch(
      "http://localhost:8081/api/enrollment?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded +
        "&action=addBulk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding enrollment: ", response);
  } catch (error) {
    console.log("Error in the entrolment", error);
  }
};

// Function to fetch user by role from the API
export const getUsersByRole = async (role: string) => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");

  // Send a GET request to the API endpoint to fetch user by role
  const response = await fetch(
    "http://localhost:8081/api/user_type?queryId=GET_USERS_BY_ROLE&session_id=" +
      seshId +
      "&args=role:" +
      role,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Parse and log the JSON response from the server
  const json_users = await response.json();
  // Extract and return the user by role data from the JSON response
  const usersbyrole = json_users.resource;
  return usersbyrole;
};

// Function to fetch student by courseId from the API
export const getStudentsByCourseId = async (id: string) => {
  try {
    // Retrieve the session ID from session storage
    const seshId = sessionStorage.getItem("key");
    console.log("session id", seshId);
    console.log(
      "api link",
      "http://localhost:8081/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=" +
        seshId +
        "&args=course_id:" +
        id
    );
    // Send a GET request to the API endpoint to fetch enrollment
    const response = await fetch(
      "http://localhost:8081/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=" +
        seshId +
        "&args=course_id:" +
        id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Parse and log the JSON response from the server
    const json_users = await response.json();
    // Extract and return the student by id data from the JSON response
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.log("Error while fetching students of particular course");
  }
};

// Function to fetch user by id from the API
export const getUserById = async (id: string) => {
  try {
    // Retrieve the session ID from session storage
    const seshId = sessionStorage.getItem("key");
    console.log("session id", seshId);

    // Send a GET request to the API endpoint to fetch user by id
    const response = await fetch(
      "http://localhost:8081/api/user_type?queryId=GET_USER_BY_ID&session_id=" +
        seshId +
        "&args=id:" +
        id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Parse and log the JSON response from the server
    const json_users = await response.json();
    // Extract and return the student by id data from the JSON response
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.log("Error while get user by Id");
  }
};

// Function to fetch enrollment by course from the API
export const getEnrollbyCours = async (courseID: string | null) => {
  // Retrieve the session ID from session storage
  const seshId = sessionStorage.getItem("key");
  console.log("session id: ", seshId);

  // Send a GET request to the API endpoint to fetch enrollment
  const response = await fetch(
    "http://localhost:8081/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=" +
      seshId +
      "&args=course_id:" +
      courseID,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("the response of trying to fetch users by course id ", response);
  const json_users = await response.json();
  const result = json_users.resource;

  const studentDetailsPromises = result.map(async (enrollment: any) => {
    const userTypeEnrollmentId = enrollment.user_type_enrollment_id;
    console.log("enrollment details here: ", enrollment);
    console.log("WHAT DO I SAY YOU TOO STUPID", userTypeEnrollmentId);
    const studentResponse = await fetch(
      //     "http://localhost:8081/api/user_type?queryId=GET_USER_BY_ID&session_id=" +
      "http://localhost:8081/api/user_type?queryId=GET_USER_BY_ID&session_id=" +
        seshId +
        "&args=id:" +
        userTypeEnrollmentId,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    //console.log("THE OBTAINED DEEEEEETS ARE HERE",studentResponse);
    const studentJson = await studentResponse.json();
    console.log("THE OBTAINED DEEEEEETS ARE HERE", studentJson);
    console.log("TOOOOOOOOOOOOOOOOOOOOOO", studentJson.resource[0].grade);
    return {
      id: enrollment.id,
      student_id: studentJson.resource[0].roll_number,
      stud_name: studentJson.resource[0].name,
      grade: enrollment.grade ? enrollment.grade : "satisfactory",
      remarks: enrollment.remarks ? enrollment.remarks : "satisfactory",
    };
  });

  const studentDetails = await Promise.all(studentDetailsPromises);
  //return studentDetails;
  //return result;
  return studentDetails;
};

// Function to update or delete a grades based on the action specified
export const updtGrades = async (enroll: updateGradeType) => {
  console.log("adding ", enroll);
  try {
    const jsonObj = enroll;
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding enroll stringify", jsonString);
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding course: ${base64Encoded}`);

    // Retrieve the session ID from session storage
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    console.log(
      "api link ",
      "http://localhost:8081/api/enrollment?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded +
        "&action=addBulk"
    );

    // Send a GET request to the API endpoint to fetch enrollment
    const response = await fetch(
      "http://localhost:8081/api/enrollment?session_id=" +
        ssid +
        "&resource=" +
        base64Encoded +
        "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    console.log("Resposne after adding enrollment: ", response);
  } catch (error) {
    console.log("Error in the entrolment", error);
  }
};
