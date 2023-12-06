import React, { useContext } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../../pages/Login';
import { useSelector } from 'react-redux'
import { getUserStatus, getUsertoken } from "../../store/slices/userSlice"
import Dashboard from '../../pages/Dashboard';
import Userlist from '../../pages/UserList';
import TermsAndConditions from '../../pages/TermsAndConditions';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import Spinner from '../Spinner';
import { context } from '../../context/context';
import TherapistList from '../../pages/TherapistList';
import Notification from '../../pages/Notification';


const Layout = () => {
    const { isLoading } = useContext(context);
    const status = useSelector(getUserStatus)
    const authtoken = useSelector(getUsertoken)
    // console.log("authtoken",authtoken)
    return (
        <>
            {status == 'loading' || isLoading ? <Spinner /> : <></>}
            <div className={!authtoken ? "" : "wrapper"}> 
                <BrowserRouter>
                    {authtoken ? <>
                        <Sidebar />
                        <div style={{ width: "100%" }}>
                            <Nav />
                            <Routes>
                                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                                <Route path="/admin/dashboard" exact element={<Dashboard />} />
                                {/* <Route path="/Market-Place-Ads" exact element={<MarketPlaceAds />} /> */}
                                {/* <Route path="/Reported-Posts" exact element={<ReportedPosts />} /> */}
                                <Route path="/admin/user-list" exact element={<Userlist />} />
                                <Route path="/admin/therapist-list" exact element={<TherapistList />} />
                                {/* <Route path="/business-list" exact element={<BusinessList />} /> */}
                                <Route path="/admin/terms-and-conditions" exact element={<TermsAndConditions />} />
                                <Route path="/admin/privacy-policy" exact element={<PrivacyPolicy />} />
                                <Route path="/admin/notification" exact element={<Notification />} />
                                {/* <Route path="/add-category" exact element={<AddCategory />} /> */}
                            </Routes>
                        </div>
                    </> :
                        <>
                            <Routes>
                                <Route path="*" element={<Navigate to="/admin/" />} />
                                <Route path="/admin/" exact element={<Login />} />
                            </Routes>
                        </>
                    }
                </BrowserRouter>
            </div>
        </>
    )
}

export default Layout