import React, { useEffect , useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { read, update } from '../functions/product'



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
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="Name"
          value={data.name}
        ></input>
        <br></br>
        <input
          type="text"
          name="detail"
          onChange={(e) => handleChange(e)}
          placeholder="Detail"
          value={data.detail}
        ></input>
        <br></br>
        <input
          type="text"
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Price"
          value={data.price}
        ></input>
        <br></br>
        <input
          type="file"
          name="file"
          onChange={(e) => handleChange(e)}
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default FormEditProduct