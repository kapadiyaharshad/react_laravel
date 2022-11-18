import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../Loading';
import Axios from '../../../components/Axios'
import Swal from 'sweetalert2';

function Category() {
  const [laoding, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();
  const deleteCategory = async (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    await Axios.delete(`api/delete-category/${id}`).then(response => {
      if (response.status === 200) {
        Swal.fire({
          title: 'success!',
          text: response.data.message,
          icon: 'success',
        })
        thisClicked.innerTex = "Delete";
        getCategoryData();
        history.push('/admin/category');
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: "Something wrong...",
        icon: 'error',
      })

    })
  }
  const getCategoryData = async () => {
    await Axios.get(`api/view-category`).then(response => {
      if (response.status === 200 && response.data.category.length >= 0) {
        setCategoryList(response.data.category);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    getCategoryData();
  }, [])
  if (laoding) {
    return (
      <Loading />
    )
  }
  let categoryData = '';
  if (categoryList.length > 0) {
    categoryData = categoryList.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{++index}</td>
          <td>{val.name}</td>
          <td>{val.slug}</td>
          <td>{val.status ? "Active" : "De-active"}</td>
          <td>
            <Link className='btn btn-primary btn-sm' to={`edit-category/${val.id}`}>Edit</Link>
          </td>
          <td>
            <button className='btn btn-danger btn-sm' type='button' onClick={(e) => deleteCategory(e, val.id)}>Delete</button>
          </td>
        </tr>
      )
    })
  }
  return (
    <div className='container px-4 mt-4'>
      <div className="card">
        <div className="card-header">
          <h4><span className='px-2'>Category List</span>
            <Link to="/admin/add-category" className='float-end btn-sm btn btn-primary'>Add Category</Link> </h4>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.length > 0 ? categoryData : <tr className='justify-content-sm-center'><td>Data not found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Category