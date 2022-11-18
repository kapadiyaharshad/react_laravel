import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../../components/Axios'

function EditProduct(props) {
    const [serverError, setServerError] = useState([]);
    const [productInput,setProductInput] = useState([])
    const id = props.match.params.id;
    const history = useHistory();
    const inputHandler = (e) =>{

    }
    const editProduct = (e) =>{
    
    }
    const imageHandler = (e) =>{
    
    }
    const getProductData = async(url) => {
        await Axios.get(url).then(response =>{
          if(response.status === 200){
            setProductInput(response.data.product)
          }
        }).catch((error)=>{
            alert("error");
        })
      }
    
    useEffect(() => {
        document.title="Edit Product";
        getProductData(`api/edit-product/${id}`);
      },[props.match.params.id])
  return (
    <div className='container mt-4'>
    <form onSubmit={editProduct} className="row" encType="multipart/form-data">
        <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
                className="form-control"
                onChange={inputHandler}
                name='category_name'>
                <option value="">Select Category</option>
            </select>
            <span className='text-danger'>{serverError.category_name}</span>
        </div>

        <div className="col-md-6">
            <label className="form-label">Product Name</label>
            <input
                type="text"
                className="form-control"
                name='name'
                value={productInput.name}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.name}</span>
        </div>
        <div className="col-md-6">
            <label className="form-label">Slug</label>
            <input
                type="text"
                className="form-control"
                name='slug'
                value={productInput.slug}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.slug}</span>
        </div>

        <div className="col-md-6">
            <label className="form-label">Meta Title</label>
            <input
                type="text"
                className="form-control"
                name='meta_title'
                value={productInput.meta_title}
                onChange={inputHandler}
            />
        </div>
        <div className="col-md-6">
            <label className="form-label">Meta Keyword</label>
            <input
                type="text"
                className="form-control"
                name='meta_keyword'
                value={productInput.meta_keyword}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.meta_keyword}</span>
        </div>

        <div className="col-md-6">
            <label className="form-label">Meta Description</label>
            <input
                type="text"
                className="form-control"
                name='meta_description'
                value={productInput.meta_description}
                onChange={inputHandler}
            />
        </div>

        <div className="col-md-6">
            <label className="form-label">Small Description</label>
            <input
                type="text"
                className="form-control"
                name='small_description'
                value={productInput.small_description}
                onChange={inputHandler}
            />
        </div>

        <div className="col-md-6">
            <label className="form-label">Long Description</label>
            <input
                type="text"
                className="form-control"
                name='long_description'
                value={productInput.long_description}
                onChange={inputHandler}
            />
        </div>

        <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input
                type="text"
                className="form-control"
                name='brand'
                value={productInput.brand}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.brand}</span>
        </div>
        <div className="col-md-6">
            <label className="form-label">Selling Price</label>
            <input
                type="text"
                className="form-control"
                name='selling_price'
                value={productInput.selling_price}
                onChange={inputHandler}
            />
             <span className='text-danger'>{serverError.selling_price}</span>
        </div>

        <div className="col-md-6">
            <label className="form-label">Original Price</label>
            <input
                type="text"
                className="form-control"
                name='original_price'
                value={productInput.original_price}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.original_price}</span>
        </div>

        <div className="col-md-6">
            <label className="form-label">Qunlity</label>
            <input
                type="number"
                className="form-control"
                name='qty'
                value={productInput.qty}
                onChange={inputHandler}
            />
            <span className='text-danger'>{serverError.qty}</span>
        </div>
        <div className="col-md-6">
            <label className="form-label">Image</label>
            <input
                type="file"
                className="form-control"
                name='image'
                onChange={imageHandler}
            />
            <span className='text-danger'>{serverError.image}</span>
        </div>
        <div className="col-12 mt-3">
            <button
                className="btn btn-primary"
                type="submit">Edit Product</button> | 
                <Link to="/admin/product" className='btn btn-primary'>Back </Link>
        </div>
    </form>
</div>
  )
}

export default EditProduct