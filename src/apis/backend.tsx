import { User } from "../context/loginContext";
import { scheduleType, termType } from "../types/myTypes";
import { courseType } from "../types/myTypes";

export const login = async (user: User) => {
  console.log("Adding User: ", user);
  try {
    // const params = new URLSearchParams();
    // console.log(params);

    // const jsonObj = user;
    // const jsonString = JSON.stringify(jsonObj);
    // console.log(jsonString);
    // // Encode string to Base64
    // const base64Encoded = btoa(jsonObj);
    // console.log(base64Encoded);

    // const object= {
    //   "email_id": user.email_id,
    //   "password": user.password
    // };

    const new_obj = btoa(JSON.stringify(user));
    console.log("new object here", new_obj);

    //params.append('resource',new_obj);
    // console.log("updated params here",params);
    // console.log("paramsdata", params.toString());

    const body = "resource=" + new_obj;
    // console.log(`Base Encoding of adding batch: ${base64Encoded}`);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");

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
    // console.log("api/login?" + params.toString());

    // console.log("Resposne after submit: ", response);
    // console.log("response", response);
    const jsonData = await response.json();
    console.log("response json after submit,", jsonData);
    // console.log("Login output after submit",jsonData.resource[0].session_id);
    const ssid = jsonData.resource[0].session_id;
    return ssid;
    // return response;
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

export const getAllTerms = async () => {
  try{
    const ssid = sessionStorage.getItem("key");
    console.log("Session Id in API: ", ssid);
    console.log("ssid insde Api Batch", ssid);

    // const response = await fetch("http://localhost:8081/api/term?session_id=" +
    //     ssid +
    //     "&resource=" +
    //     base64Encoded, {
    //   // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
    //   method: "GET",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });

  }catch(error){
    console.error("Error fetching data from backend:", error);
  }
};
