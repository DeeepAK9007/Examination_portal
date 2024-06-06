function Map_stud()
{
    return(
        <div className="d-flex gap-4 justify-content-around mt-2 ">
            <i
              className="fas fa-edit "
              style={{ cursor: "pointer" }}
            ></i>         
            <i
              className="fas fa-trash text-danger"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
    );
}

export default Map_stud;