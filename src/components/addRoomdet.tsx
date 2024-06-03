function AddRoomDet()
{
    return(
                <div>
                    <p className="p-0 ms-5 mb-0 mt-5" style={{paddingTop:'1px'}}>Add Room Detail</p>
                    <hr style={{width:'95%', margin:'auto'}}/>

                    <form className="d-flex flex-row jutify-content-evenly w-100">
                        <div className="d-flex flex-column ms-5 w-50">
                            <div className="mb-3 mt-5">
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Room Number" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Capacity"/>
                            </div>                          
                        </div>
                        <div className="d-flex flex-column ms-5 w-50 me-5">
                            <div className="mb-3 mt-5">
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Block" />
                            </div>
                            <div className="d-flex justify-content-end mb-3">
                                <button type="button" className="btn btn-primary" style={{width:'105px', height:'44px'}}>Save</button>                        
                            </div>
                        </div>
                    </form>
                </div>
    );
}

export default AddRoomDet;