import { User } from "../context/loginContext";


export const login = async (user : User) => {
    console.log("Adding User: ", user);
    try {
      const params = new URLSearchParams();
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

    

      const new_obj= btoa(JSON.stringify(user));
      console.log("new object here",new_obj);

      //params.append('resource',new_obj);
      // console.log("updated params here",params);
      // console.log("paramsdata", params.toString());

      const body = "resource="+new_obj;
      // console.log(`Base Encoding of adding batch: ${base64Encoded}`);
  
      // params.append("resource", base64Encoded);
      // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
        
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
        body: body
      });
      console.log(response);
      console.log("body here",body);
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