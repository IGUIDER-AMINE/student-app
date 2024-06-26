import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + `/delete/${id}`)
      .then((res) => {
        // reload the user interface
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2 className="text-center">Student List</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((student, index) => (
              <tr key={index}>
                <td>{student.ID}</td>
                <td>{student.Name}</td>
                <td>{student.Email}</td>
                <td>
                  <Link
                    to={`/read/${student.ID}`}
                    className="btn btn-sm btn-info"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/edit/${student.ID}`}
                    className="btn btn-sm btn-primary mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.ID)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// rfce
