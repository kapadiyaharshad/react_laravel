import React, { useEffect, useState } from 'react'
import Axios from '../../../components/Axios'
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';

function AddProduct() {
    const intilize = {
        category_name: '',
        name: '',
        slug: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        small_description: '',
        long_description: '',
        brand: '',
        selling_price: '',
        original_price: '',
        qty: ''
    }
    const history = useHistory();
    const [categoryList, setCategoryList] = useState([]);
    const [serverError, setServerError] = useState([]);
    const [productData, setProductData] = useState(intilize)
    const [picture, setPicture] = useState('')
    const getCategory = async (url) => {
        await Axios.get(url).then(response => {
            if (response.status === 200) {
                setCategoryList(response.data.category);
            }
        })
    }
    const inputHandler = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    const imageHandler = (e) => {
        setPicture({image:e.target.files[0]});
    }
    useEffect(() => {
        document.title = "Add Product";
        getCategory(`api/category-list`);
    }, [])
    const submitProduct = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('category_name', productData.category_name);
        data.append('name', productData.name);
        data.append('slug', productData.slug);
        data.append('meta_title', productData.meta_title);
        data.append('meta_keyword', productData.meta_keyword);
        data.append('meta_description', productData.meta_description);
        data.append('small_description', productData.small_description);
        data.append('long_description', productData.long_description);
        data.append('brand', productData.brand);
        data.append('selling_price', productData.selling_price);
        data.append('original_price', productData.original_price);
        data.append('qty', productData.qty);
        data.append('image', picture.image);

        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        await Axios.post(`api/store-product`, data).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'success!',
                    text: response.data.message,
                    icon: 'success',
                  })
                 history.push("/admin/product")
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setServerError(error.response.data.error)
            }
        })

    }
    return (
        <div className='container mt-4'>
            <form onSubmit={submitProduct} className="row" encType="multipart/form-data">
                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        className="form-control"
                        onChange={inputHandler}
                        name='category_name'>
                        <option value="">Select Category</option>
                        {

                            categoryList.length > 0 ?
                                categoryList.map((val) => {
                                    return <option value={val.id} key={val.id}>{val.name}</option>
                                }) :
                                <option>No data found</option>
                        }

                    </select>
                    <span className='text-danger'>{serverError.category_name}</span>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
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
                        onChange={inputHandler}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Meta Keyword</label>
                    <input
                        type="text"
                        className="form-control"
                        name='meta_keyword'
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
                        onChange={inputHandler}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Small Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name='small_description'
                        onChange={inputHandler}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Long Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name='long_description'
                        onChange={inputHandler}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        name='brand'
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
                        type="submit">Add Product</button> | 
                        <Link to="/admin/product" className='btn btn-primary'>Back </Link>
                </div>
            </form>
        </div>
    )
}

export default AddProduct