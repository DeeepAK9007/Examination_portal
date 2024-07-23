export const addOneCourse = async (course: object) => {
  try {
    const params = new URLSearchParams();
    const jsonObj = course;

    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);
    console.log("Adding course stringify", jsonString);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    console.log(`Base Encoding of adding student: ${base64Encoded}`);

    params.append("resource", base64Encoded);
    // const ssid = sessionStorage.getItem("key");
    // params.append("session_id", ssid);

    const response = await fetch("api/course?" + params.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Resposne after adding student: ", response);
  } catch (error) {
    console.error("Error posting course data:", error);
  }
};
