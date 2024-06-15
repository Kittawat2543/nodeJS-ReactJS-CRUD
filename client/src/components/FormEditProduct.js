import React, { useEffect , useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { read, update } from '../functions/product'
import { Box, TextField, Button } from "@mui/material";



const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()



    const [data, setData] = useState({
        name: '',
        datail: '',
        price: ''
    })
  const [fileold, setFileOld] = useState()



    useEffect(() => {
        loadData(params.id)
    }, [])

    const loadData = async (id) => {
        read(id)
            .then((res) => {
            setData(res.data)
            setFileOld(res.data.file)
        })
    }

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(data)
      console.log(fileold)
        const formWithImagaData = new FormData();
        for (const key in data) {
          formWithImagaData.append(key, data[key]);
        }
          formWithImagaData.append("fileold", fileold)
          update(params.id, formWithImagaData)
            .then((res) => {
              console.log(res);
              navigate("/");
            })
            .catch((err) => console.log(err));
  };

  return (
    <div>
      FormEditProduct
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={data.name}
            variant="outlined"
            margin="dense"
            focused
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Detail"
            name="detail"
            onChange={(e) => handleChange(e)}
            value={data.detail}
            variant="outlined"
            margin="dense"
            focused
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Price"
            name="price"
            onChange={(e) => handleChange(e)}
            value={data.price}
            variant="outlined"
            margin="dense"
            focused
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
          Submit Change
        </Button>
      </form>
    </div>
  );
}

export default FormEditProduct