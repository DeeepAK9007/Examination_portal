import { useNavigate } from "react-router-dom";
function NavBar()
{   
    let navigate=useNavigate();

    return(
        <div className='d-flex flex-column' style={{height:'100vh',width:'319px'}}>
            <div className=" d-flex flex-column  col-xs-2 " style={{ background: "#074E85",height:'90vh',width:'319px'}}>
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
                          <ul className=" text-start d-flex flex-column  h-75 gap-0 mx-4 navbar-nav" style={{fontSize: "16px",color:'white'}}>
                              
                              <li className="" >
                                  <p style={{margin:'0px'}}><i className="fa-sharp fa-solid fa-graduation-cap"></i>  Administration</p>
                                  <ul style={{listStyleType:"none"}}>
                                    <li> 
                                        <p className="btn my-auto" onClick={() => navigate("/")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}><i className="fa-regular fa-user"></i>  User</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/batch")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}><i className="fa-regular fa-calendar"></i>  Batch</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/room")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}><i className="fa-regular fa-calendar"></i>  Room</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/term")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}><i className="fa-regular fa-calendar"></i>  Term</p>
                                    </li>
                                    <li>
                                        <p className="btn my-auto" onClick={() => navigate("/course")} style={{color: `${onmouseover? "#006CBE" : 'white'}`}}><i className="fa-regular fa-calendar"></i>  Course</p>
                                    </li>
                                  </ul>
                              </li>

                                
                              <li className="" >
                                  Exam office
                                  <ul>
                                    <li onClick={()=>navigate("/schedule")}><p className="btn my-auto" style={{color:'white'}}><i className="fa-regular fa-calendar"></i>  Exam Scheduling</p></li>
                                  </ul>
                              </li>

                              <li className="" onClick={()=>navigate("/progCord")}>
                                  <p className="btn m-auto" style={{color:'white'}}><i className="fa-solid fa-sheet-plastic"></i> Programme Co-ordinator</p>
                              </li>

                              <li className="">
                                  <p className="btn m-0" style={{color:'white'}}><i className="fa-solid fa-chalkboard-user"></i>  Course Instructor</p>
                                  <ul style={{listStyleType:"none"}}>
                                    <li>
                                        <p className="btn m-0" style={{color:'white'}}><i className="fa-solid fa-chalkboard-user"></i>  Upload Grades</p>
                                    </li>
                                    <li>
                                        <p className="btn m-0" style={{color:'white'}}><i className="fa-solid fa-chalkboard-user"></i>  Issue Reporting</p>
                                    </li>
                                    <li>
                                        <p className="btn m-0" style={{color:'white'}}><i className="fa-solid fa-chalkboard-user"></i>  Exam Mode Update</p>
                                    </li>
                                  </ul>
                              </li>

                              <li className="">
                                  <p className="btn m-0" style={{color:'white'}}><i className="fa-solid fa-person"></i> Invigilator</p>
                                  <ul style={{listStyleType:"none"}}>
                                    <li>
                                        <p className="btn m-0" style={{color:'white'}} onClick={()=>navigate("/attend")}><i className="fa-solid fa-chalkboard-user"></i>  Attendance</p>
                                    </li>
                                    <li>
                                        <p className="btn m-0" style={{color:'white'}} onClick={()=>navigate("/incident")}><i className="fa-solid fa-chalkboard-user"></i>  Incident Reporting</p>
                                    </li>
                                  </ul>
                              </li>
                          </ul>
                        </div>
                        
                  </div>
              </div>
                <div className="d-flex flex-colum" style={{backgroundColor:'#070241',height:'10vh'}}>
                    <i className="fa-solid fa-right-from-bracket fa-2x" style={{color:'white'}}></i>
                </div>
            
          
          </div>
    );
}

export default NavBar;