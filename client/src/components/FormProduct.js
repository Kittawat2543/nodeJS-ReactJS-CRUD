import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { remove, create, getdata } from "../functions/product";

import { Box, TextField, Button } from "@mui/material"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


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
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImagaData = new FormData();
    for (const key in form) {
      formWithImagaData.append(key, form[key]);
    }

    create(formWithImagaData)
      .then((res) => {
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            name="name"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="dense"
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Detail"
            name="detail"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="dense"
          />
        </div>

        <div>
          <TextField
            type="number"
            id="outlined-basic"
            label="Price"
            name="price"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="dense"
          />
        </div>

        <div>
          <TextField
            type="file"
            id="outlined-basic"
            label="File"
            name="file"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            margin="dense"
            focused
          />
        </div>

        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </form>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="error"
                        onClick={() => handleRemove(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={"/edit/" + item._id}>
                        <EditIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormProduct;
