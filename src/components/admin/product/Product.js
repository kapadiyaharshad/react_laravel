import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../../../components/Axios'

function Product() {
  const [productList, setProductList] = useState([]);
  const getProduct = async (url) => {
    await Axios.get(url).then(response => {
      if (response.status === 200) {
        setProductList(response.data.product);
      }
    })
  }
  useEffect(() => {
    getProduct(`api/list-product`);
  }, [])
  let productData = '';
  if (productList.length > 0) {
    productData = productList.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{++index}</td>
          <td>{val.name}</td>
          <td>{val.slug}</td>
          <td>{val.category.name}</td>
          <td><img src={val.image} alt={val.name} width="70px" height="50px"/></td>
          <td>
            <Link className='btn btn-primary btn-sm' to={`edit-product/${val.id}`}>Edit</Link>
          </td>
          <td>
            <button className='btn btn-danger btn-sm' type='button'>Delete</button>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className='container px-4 mt-4'>
      <div className="card">
        <div className="card-header">
          <h4><span className='px-2'>Product List</span>
            <Link to="/admin/add-product" className='float-end btn-sm btn btn-primary'>Add Product</Link> </h4>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
            {productList.length > 0 ? productData : <tr  className='justify-content-sm-center'><td>Data not found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Product