import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import Axios from '../../../components/Axios'

function EditCategory(props) {
  const id = props.match.params.id;
  const history = useHistory();
  const [categoryInput,setCategoryInput] = useState([])
  const inputHandler = (e) =>{
    setCategoryInput({...categoryInput, [e.target.name]: e.target.value });
  }

  const editCategory = (e) =>{
    e.preventDefault();
    const data = {
      slug:categoryInput.slug,
      name:categoryInput.name,
      description:categoryInput.description,
      status:categoryInput.status,
      meta_title:categoryInput.meta_title,
      meta_keywords:categoryInput.meta_keywords,
      meta_description:categoryInput.meta_description,
      id:id
    }
    Axios.put(`api/update-category`,data).then(response=>{
      if(response.data.status === 200){
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
      })
      history.push('/admin/category');
      }
    }).catch((error)=>{
      if(error.response.status === 404){
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
      })
      }
      history.push('/admin/category');
    })
  }
  const getCategoryData = async(url) => {
    await Axios.get(url).then(response =>{
      if(response.data.status === 200){
        setCategoryInput(response.data.category)
      }
    }).catch((error)=>{
      if(error.response.status === 404){
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
      })
      }
      history.push('/admin/category');
    })
  }
  useEffect(() => {
    getCategoryData(`api/edit-category/${id}`);
  },[props.match.params.id])
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
          <form onSubmit={editCategory} id="category_form">
            <div className="form-control mb-3">
              <label>Slug</label>
              <div className="col-md-6">
                <input
                  type="text"
                  name='slug'
                  className='form-control'
                  value={categoryInput.slug}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="form-control mb-3">
              <label>Name</label>
              <div className="col-md-6">
                <input
                  type="text"
                  name='name'
                  className='form-control'
                  value={categoryInput.name}
                  onChange={inputHandler}
                />
              </div>
            </div>
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

export default EditCategory