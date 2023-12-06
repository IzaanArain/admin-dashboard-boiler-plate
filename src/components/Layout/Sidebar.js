import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'
import { context } from '../../context/context';
const Sidebar = () => {
    var location = useLocation()
    const { toggleButton } = useContext(context);
    return (
        <>
            <nav id="sidebar" className={toggleButton ? 'active' : ""} >
                <div className="sidebar-header">
                    <div className="logo text-center shadowfilter">
                        <Link to="/admin/dashboard"><img src="/assets/images/logo.png" style={{ width: "70%" }} alt="logo" className="img-fluid" /></Link>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li className={location?.pathname === "/admin/dashboard" ? "active" : "noactive"}> <Link to="/admin/dashboard">Dashboard</Link> </li>
                    <li className={location?.pathname === "/admin/user-list" || location?.pathname === "/admin/therapist-list" ? "active" : "noactive"}>
                        <a href="#user" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Users Management</a>
                        <ul className={location?.pathname === "/admin/user-list" || location?.pathname === "/admin/therapist-list"  ? "list-unstyled" : "list-unstyled collapse"} id="user">
                            <li className={location?.pathname === "/admin/user-list" ? "active" : "noactive"}> <Link to="/admin/user-list">Users List</Link> </li>
                            <li className={location?.pathname === "/admin/therapist-list" ? "active" : "noactive"}> <Link to="/admin/therapist-list">Therapists List</Link> </li>
                            
                        </ul>
                    </li>
                    <li className={location?.pathname === "/admin/notification" ? "active" : "noactive"}> <Link to="/admin/notification">Notification</Link> </li>
                    <li className={location?.pathname === "/admin/terms-and-conditions" || location?.pathname === "/admin/privacy-policy" ? "active" : "noactive"}>
                        <a href="#content" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Content Management</a>
                        <ul className={location?.pathname === "/admin/terms-and-conditions" || location?.pathname === "/admin/privacy-policy" ? "list-unstyled" : "collapse list-unstyled"} id="content">
                            <li className={location?.pathname === "/admin/terms-and-conditions" ? "active" : "noactive"}> <Link to="/admin/terms-and-conditions">Terms & Conditions</Link> </li>
                            <li className={location?.pathname === "/admin/privacy-policy" ? "active" : "noactive"}> <Link to="/admin/privacy-policy">Privacy Policy</Link> </li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </>

    )
}

export default Sidebar