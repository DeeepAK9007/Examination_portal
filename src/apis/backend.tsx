import { User } from "../context/loginContext";
import { examModeUpdateType, scheduleType, termType } from "../types/myTypes";
import { courseType } from "../types/myTypes";
import { batchType } from "../types/myTypes";
import { roomMatchedType } from "../types/myTypes";
import { userType } from "../types/myTypes";
import { ExamTypeType } from "../types/myTypes";
import { ExamModeType } from "../types/myTypes";
import { enrollmentType } from "../types/myTypes";
import { addProgCordType } from "../types/myTypes";

export const login = async (user: User) => {
  console.log("Adding User: ", user);
  try {
    const new_obj = btoa(JSON.stringify(user));
    console.log("new object here", new_obj);

    const body = "resource=" + new_obj;

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

    const jsonData = await response.json();
    console.log("response json after submit,", jsonData);
    // console.log("Login output after submit",jsonData.resource[0].session_id);
    const ssid = jsonData.resource[0].session_id;
    return ssid;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const addOneTerm = async (term: termType) => {
  console.log("adding ", term);
  try {
    // const params = new URLSearchParams();

    const jsonObj = term;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;

    console.log(`Base Encoding of adding term: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
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

    console.log("Resposne after adding student: ", response);
  } catch (error) {
    console.log(" error message: ", error);
  }
};
export const addOneCourse = async (course: courseType) => {
  console.log("adding ", course);
  try {
    // const params = new URLSearchParams();

    const jsonObj = course;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    console.log(`Base Encoding of adding course: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
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
  } catch (error) {
    console.log("Error while adding course", error);
  }
};

export const addOneSchedule = async (schedule: scheduleType) => {
  console.log("adding ", schedule);
  try {
    // const params = new URLSearchParams();

    const jsonObj = schedule;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding schedule stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;

    console.log(`Base Encoding of adding schedule: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
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
  } catch (error) {
    console.log(" error message: ", error);
  }
};

export const addProgCord = async (pro: addProgCordType) => {
  console.log("adding ", pro);
  try {
    const jsonObj = pro;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding term stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;

    console.log(`Base Encoding of adding term: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
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
  } catch (error) {
    console.log(" error message: ", error);
  }
};
export const getAllTerms = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api term", ssid);
    const queryId = "GET_ALL";

    const response = await fetch(
      "http://localhost:8081/api/term?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllCourses = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api course", ssid);
    const queryId = "GET_ALL";

    const response = await fetch(
      "http://localhost:8081/api/course?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllSchedules = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api schedule", ssid);
    const queryId = "GET_ALL";

    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getProgCord = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api schedule", ssid);
    const queryId = "GET_ALL";

    const response = await fetch(
      "http://localhost:8081/api/exam_schedule?queryId=" +
        queryId +
        "&session_id=" +
        ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response", response);
    const jsonData = await response.json();
    console.log("response json,", jsonData);
    console.log(jsonData.resource);
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllUsers = async () => {
  const seshId = sessionStorage.getItem("key");
  console.log("session id: ", seshId);

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
  const json_users = await response.json();
  const users = json_users.resource;
  console.log(users);
  return users;
};

export const getAllBatches = async () => {
  const seshId = sessionStorage.getItem("key");
  // console.log("session id: ", seshId);

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

  //console.log("obtained resposnse here", response);
  const json_users = await response.json();
  const batches = json_users.resource;
  //console.log("here are the batches", batches);
  return batches;
};

export const getAllRooms = async () => {
  const seshId = sessionStorage.getItem("key");
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

  const json_users = await response.json();
  const rooms = json_users.resource;
  return rooms;
};

// Exam mode
export const addExam_mode = async (exam: examModeUpdateType) => {
  console.log("adding ", exam);
  try {
    // const params = new URLSearchParams();

    const jsonObj = exam;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding exam stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    console.log(`Base Encoding of adding exam: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid !== null) {
      console.log("session_id", ssid);
      // params.append("session_id", ssid);
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

    const json_users = await response.json();
    const rooms = json_users.resource;
    return rooms;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllModes = async () => {
  const seshId = sessionStorage.getItem("key");
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

  const json_users = await response.json();
  const modes = json_users.resource;
  return modes;
};

export const getAllTypes = async () => {
  const seshId = sessionStorage.getItem("key");
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

  const json_users = await response.json();
  const modes = json_users.resource;
  return modes;
};

export const updateOrDeleteTerm = async (
  termId: string,
  newData: termType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: termId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    //console.log("http://localhost:8081/api/term?" + params.toString());

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

export const updateOrDeleteCourse = async (
  courseId: string,
  newData: courseType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: courseId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteBatch = async (
  batchId: string,
  newData: batchType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: batchId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteRoom = async (
  roomId: string,
  newData: roomMatchedType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: roomId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteUser = async (
  userId: string,
  newData: userType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: userId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteExamType = async (
  examtypeId: string,
  newData: ExamTypeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examtypeId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteExamMode = async (
  examModeId: string,
  newData: ExamModeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examModeId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

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

export const updateOrDeleteSchedule = async (
  scheduleId: string,
  newData: scheduleType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

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

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: scheduleId }))
        : btoa(JSON.stringify(newData));
    console.log("Editing data encoding: ", base64EncodedData);
    params.append("resource", base64EncodedData);

    //console.log("http://localhost:8081/api/term?" + params.toString());

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

export const AddEnrolment = async (enroll: enrollmentType[]) => {
  console.log("adding ", enroll);
  try {
    const jsonObj = enroll;
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding enroll stringify", jsonString);
    const base64Encoded = btoa(jsonString);
    console.log(`Base Encoding of adding course: ${base64Encoded}`);

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

export const getUsersByRole = async (role: string) => {
  const seshId = sessionStorage.getItem("key");
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

  const json_users = await response.json();
  const usersbyrole = json_users.resource;
  return usersbyrole;
};

export const getStudentsByCourseId = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    console.log("session id", seshId);
    console.log(
      "api link",
      "http://localhost:8081/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=" +
        seshId +
        "&args=course_id:" +
        id
    );
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

    const json_users = await response.json();
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.log("Error while fetching students of particular course");
  }
};

export const getUserById = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    console.log("session id", seshId);
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

    const json_users = await response.json();
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.log("Error while get user by Id");
  }
};
