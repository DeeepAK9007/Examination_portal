import addresses from "./pic_links";

function Login()
{
    let img_spec={
        backgroundcolor: '#006CBE',
        height:'38px',
        width:'38px',
        margin:'5px'
    };
    return(
            <div className="" style={{backgroundImage:'linear-gradient(to bottom right)',height:'100vh'}}>
                <div className="d-flex flex-row justify-content-center align-items-center shadow-sm p-1 mb-5 bg-body-tertiary rounded" style={{height:'80vh',width:'1714', margin:'61px'}}>
                    
                    <div className="d-flex flex-column justify-content-center rounded-start h-100 w-100" style={{backgroundColor:'#074E85'}}>
                        <div className="d-flex justify-content-center">
                            <img style={{height:'252px', width:'233px'}} src="https://s3-alpha-sig.figma.com/img/1c8b/a115/5555c3e534dec5f2c27633aee63a0fe8?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mQHPokX3UO-IhGNKk85-IXTYY~gagNwnBoPKrp5Ge8HWaPfkZmIsR8Uvnq9LKEv2ZBCXxL6P1MbJoE76~Al~CdYAMcp7bNn-eiz1G~eG5QxG9WfWmMQ97eGKv2zzYu8p3rkgUgtKlGukgyWg2Ke4Dk2FAK3xAJP9JuKy7~pxoYO~RdzXmuVXAQNdegFYskI3RQGBQedVu5~WqJHNipQcjB75u1qeqpA0FJbyuA2y6Sbo~mOVHBkXTCsGEGCM9Eio9e7a7FsRmF7ZJz6f6MW5BVtkEjwRVU9XtjpBC5imZ5do-bEckjO6iO7t6JB0-HkhlyGMYlj4Fz1Vlu~EzHFJyA__" alt="the pic"/>
                        </div>
                        <h3 style={{textAlign:'center', color:'white'}}>International Institue of Information<br/>Technology Bangalore</h3>
                        <h2 className="m-5" style={{textAlign:'center', color:'white'}}>Examination portal</h2>
                        <hr className="mt-2 mb-2" style={{width:'97%',margin:'auto', color:'#FFFFFF', height:'3px'}} />
                        <div className="d-flex flex-row justify-content-center">
                            <img src={addresses[0]} style={img_spec}></img>
                            <img src={addresses[1]} style={img_spec}></img>
                            <img src={addresses[2]} style={img_spec}></img> 
                            <img src={addresses[3]} style={img_spec}></img>
                            <img src={addresses[4]} style={img_spec}></img>
                        </div>
                        <p style={{textAlign:'center'}}> © 2024 Copyright: International Institute of Information Technology - Bangalore Technical Support - application@iiitb.ac.in</p>
                    </div>
                    
                    <div className="rounded-end w-100 h-100" style={{backgroundColor:'#FFFFFF'}}>
                        <div className=" d-flex flex-column gap-4 p-4 align-items-center" style={{marginTop:'15vh'}}>
                            <h3>Login form</h3>
                            <div className="d-flex gap-4 justify-content-end">
                                <input
                                type="email"
                                className="form-control  bg-light  border-1"
                                name="email_id"
                                placeholder="Email"
                                />
                            </div>
                            <div className="d-flex gap-4  justify-content-start">
                                <input
                                type="password"
                                className="form-control bg-light border-1 "
                                name="password"
                                placeholder="Enter Password"
                                />
                            </div>
                            <a href="https://www.google.com">Forgot Password?</a>
                            <button type="button" className="btn btn-primary" style={{width:'274px'}}>Login</button>
                            <p>New user?<a href="https://www.google.com">Click here </a> to register <br/> 
                            To change password <a href="https://www.google.com" >Click here</a> </p>
                        </div>
                    </div>
                
                </div>
            </div>
    );
}

export default Login;