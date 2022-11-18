import React, { Fragment } from 'react'
import Navbar from '../../layouts/frontend/Navbar'

function Page404() {
    return (
        <Fragment>
        <Navbar/>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card card-body'>
                        <h1>Page 404|Page not found</h1>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
      )
}

export default Page404