import { useNavigate } from "react-router-dom";
function NavBar()
{   
    let navigate=useNavigate();

    return(
        <div>
            <div className=" d-flex flex-column  col-xs-2 " style={{ background: "#074E85",height:'100vh',width:'319px'}}>
                  <div className="my-2  ">
                        <p className="text-center mt-2">
                          <img src="https://s3-alpha-sig.figma.com/img/1c8b/a115/5555c3e534dec5f2c27633aee63a0fe8?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mQHPokX3UO-IhGNKk85-IXTYY~gagNwnBoPKrp5Ge8HWaPfkZmIsR8Uvnq9LKEv2ZBCXxL6P1MbJoE76~Al~CdYAMcp7bNn-eiz1G~eG5QxG9WfWmMQ97eGKv2zzYu8p3rkgUgtKlGukgyWg2Ke4Dk2FAK3xAJP9JuKy7~pxoYO~RdzXmuVXAQNdegFYskI3RQGBQedVu5~WqJHNipQcjB75u1qeqpA0FJbyuA2y6Sbo~mOVHBkXTCsGEGCM9Eio9e7a7FsRmF7ZJz6f6MW5BVtkEjwRVU9XtjpBC5imZ5do-bEckjO6iO7t6JB0-HkhlyGMYlj4Fz1Vlu~EzHFJyA__"
                          className="border rounded-circle p-2 w-25 h-25 " alt=""/>
                        </p>
                        <p style={{textAlign:'center',color:'white'}}>International Institute of <br/> Information Technology<br/>Bangalore</p>
                  </div>
                  
                  <hr className="border border-light w-100 m-1" style={{}}/>
                  
                  <div className="d=flex flex-column justify-content-between">
                      <div>
                          <ul className=" text-start d-flex flex-column  h-75 my-4 gap-4 mx-4 navbar-nav" style={{fontSize: "16px",color:'white'}}>
                              
                              <li className="" >
                                  Administration
                                  <ul>
                                    <li> 
                                        <p className="btn my-auto" onClick={() => navigate("/")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}>User</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/batch")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}>Batch</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/room")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}>Room</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/term")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}>Term</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/course")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}>Course</p>
                                    </li>
                                    <li> 
                                        <p className="btn my-auto" onClick={() => navigate("/schedule")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}> Exam Scheduling</p>
                                    </li>
                                  </ul>
                              </li>

                              <li className="" >
                                  Exam office
                                  <ul>
                                    <li>Exam Scheduling</li>
                                  </ul>
                              </li>

                              <li className="" >
                                  Program Co-ordinator
                              </li>

                              <li className="" >
                                  Course Instructor
                              </li>

                              <li className="" >
                                  Invigilator
                              </li>
                          </ul>
                        </div>
                        
                  </div>
              </div>
                <div className="d-flex flex-colum" style={{backgroundColor:'#070241'}}>
                    <p style={{color:'white'}}>Logout</p>
                </div>
            
          
          </div>
    );
}

export default NavBar;