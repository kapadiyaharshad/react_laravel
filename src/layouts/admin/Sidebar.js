import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";

function Sidebar() {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <NavLink className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><AiOutlineDashboard/></div>
                        Dashboard
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><CgProfile/></div>
                        Profile
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/category">
                        <div className="sb-nav-link-icon"><BiCategory/></div>
                        Category
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/product">
                        <div className="sb-nav-link-icon"><MdProductionQuantityLimits/></div>
                        Product
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar