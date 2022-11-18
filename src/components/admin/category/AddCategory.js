import React, {useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../Axios'

function AddCategory() {
  const initialize = {
    slug: '',
    name: '',
    description: '',
    status: '',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    error_list:[]
  }
  const [categoryInput, setCategoryInput] = useState(initialize);
  const history = useHistory();
  const inputHandler = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  }
  const submitCategory = (e) => {
    e.preventDefault();
    const data = {
      slug:categoryInput.slug,
      name:categoryInput.name,
      description:categoryInput.description,
      status:categoryInput.status,
      meta_title:categoryInput.meta_title,
      meta_keywords:categoryInput.meta_keywords,
      meta_description:categoryInput.meta_description
    }
    Axios.post(`api/store-category`, data)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
            })
            history.push('/admin/category')
            }
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              setCategoryInput({...categoryInput,error_list:response.data.error})
            }
          });
          
  }
  
  return (
    <div className="container">
      <h1 className="mt-4">Add Category</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">Seo</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <form onSubmit={submitCategory} id="category_form">
            <div className="form-control mb-3">
              <label>Slug</label>
              <div className="col-md-6">
                <input
                  type="text"
                  name='slug'
                  className='form-control'
                  // value={categoryInput.slug}
                  onChange={inputHandler}
                />
              </div>
              <span style={{color:'red'}}>{categoryInput.error_list.slug}</span>
            </div>
            <div className="form-control mb-3">
              <label>Name</label>
              <div className="col-md-6">
                <input
                  type="text"
                  name='name'
                  className='form-control'
                  // value={categoryInput.name}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <span style={{color:'red'}}>{categoryInput.error_list.name}</span>
            <div className="form-control mb-3">
              <label>Description</label>
              <div className="col-md-6">
                <textarea
                  name='description'
                  className='form-control'
                  cols="10"
                  rows="5"
                  value={categoryInput.description}
                  onChange={inputHandler}
                ></textarea>
              </div>
            </div>
            <div className="form-control mb-3">
              <label>Status</label>
              <div className="col-md-6">
                <input
                  type="checkbox"
                  name='status'
                  value={categoryInput.status}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <button type='submit' className='btn btn-primary px-4'>Submit</button>|
            <Link to="/admin/category" className='btn btn-primary'>Back</Link>
          </form>
        </div>
        <div className="tab-pane card-body border fade" id="seo" role="tabpanel" aria-labelledby="seo-tab">

          <div className="form-control mb-3">
            <label>Meta Title</label>
            <div className="col-md-6">
              <input
                type="text"
                name='meta_title'
                className='form-control'
                value={categoryInput.meta_title}
                onChange={inputHandler}
              />
            </div>
          </div>
          <span style={{color:'red'}}>{categoryInput.error_list.meta_title}</span>
          <div className="form-control mb-3">
            <label>Meta Keyword</label>
            <div className="col-md-6">
              <input
                type="text"
                name='meta_keywords'
                className='form-control'
                value={categoryInput.meta_keywords}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="form-control mb-3">
            <label>Meta Description</label>
            <div className="col-md-6">
              <textarea
                name='meta_description'
                className='form-control'
                cols="10"
                rows="5"
                value={categoryInput.meta_description}
                onChange={inputHandler}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategory