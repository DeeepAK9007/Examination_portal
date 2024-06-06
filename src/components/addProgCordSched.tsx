function AddProgSched()
{
    return(
                <div>
                    <p className="p-0 ms-5 mb-0 mt-5" style={{paddingTop:'1px'}}>Add Schedule</p>
                    <hr style={{width:'95%', margin:'auto'}}/>

                    <form className="d-flex flex-row jutify-content-evenly w-100">
                        <div className="d-flex flex-column ms-5 w-50">
                            <div className="mb-3 mt-5">
                                <input className="form-control" placeholder="Date Time" />
                            </div>
                            <div className="mb-3">
                                <select name="Exam Role" className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option value="" disabled selected>Select Course</option>  
                                            <option value="1">DSA</option>
                                            <option value="2">Computer Architecture</option>
                                            <option value="3">DMS</option>
                                </select>
                            </div> 
                            <div className="mb-3">
                                <input className="form-control" placeholder="Remark"/>
                            </div>                          
                        </div>
                        <div className="d-flex flex-column ms-5 w-50 me-5">
                            <div className="mb-3 mt-5">
                                <input type="email" className="form-control" placeholder="Exam Name" />
                            </div>
                            <div className="mb-3">
                                    <select name="Assign invigilator" className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                    <option value="" disabled selected>Location/Room</option>  
                                                    <option value="1">R-203</option>
                                                    <option value="2">R-200</option>
                                                    <option value="3">R-400</option>
                                    </select>                           
                             </div>  
                            <div className="d-flex justify-content-end mb-3">
                                <button type="button" className="btn btn-primary" style={{width:'105px', height:'44px'}}>Save</button>                     
                            </div>
                        </div>
                    </form>
                </div>
    );
}

export default AddProgSched;