import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { remove, create, getdata } from "../functions/product";

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    create(form)
      .then(res => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      FormProduct
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="Name"
        ></input>
        <br></br>
        <input
          type="text"
          name="detail"
          onChange={(e) => handleChange(e)}
          placeholder="Detail"
        ></input>
        <br></br>
        <input
          type="text"
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Price"
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Detail</th>
            <th scope="col">Price</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td onClick={() => handleRemove(item._id)}>Delete</td>
                <td>
                  <Link to={'/edit/'+ item._id}>
                    Edit
                  
                  </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
