import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { blockunblock, deleteAccount, getAllUsers, getUserStatus } from '../store/slices/userSlice';
import { CSVLink } from "react-csv";
import $ from "jquery"
import 'datatables.net'
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "30%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const UserList = () => {
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const [users, setUsers] = useState(null)
    const status = useSelector(getUserStatus)
    const [userDetail, setUserDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    var csvData = [
        ["Name", "Email", "Phone Number", "Bio", "State", "City"],
    ]
    users?.map((item) =>
        csvData.push([`${item?.user_name}`, `${item?.email}`, `${item?.phone_number}`, `${item?.user_bio}`, `${item?.location?.state}`, `${item?.location?.city}`])
    )

    function viewModal(item, type) {
        setIsOpen(true);
        if (type == "userDetail") {
            setUserDetail(item)
        } else if (type == "delete") {
            setId(item)
        }
        setModalType(type)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    const accountDelete = async (id) => {
        try {
            await dispatch(deleteAccount(id)).unwrap()
            setIsOpen(false)
            $('#tableData')
                .DataTable().destroy();
            try { 
                Users()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const blockUnblockAccount = async (id) => {
        try {
            await dispatch(blockunblock(id)).unwrap()
            $('#tableData')
                .DataTable().destroy();
            try {
                Users()
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError)
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const Users = async () => {
        try {
            setUsers(null)
            const response = await dispatch(getAllUsers()).unwrap()
            // console.log(response.data)
            setUsers(response?.data)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        let mount = true
        if (mount) {
            Users();
        }
        return () => {
            mount = false
        }
    }, []) 
  
    useEffect(() => {
        if (users) {
            $('#tableData')
                .DataTable({
                    lengthMenu: [10, 25, 50, 100, 200],
                    language: {
                        "emptyTable": "Users Not Found"
                    },
                    destroy: true,
                });
        } 
    }, [users])



    return (
        <>
            <Modal
                closeTimeoutMS={500}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Change Password"
            >
                <div className='change-password-modal' id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: "block", zIndex: 100 }}>
                    {modalType == "userDetail" ? <>
                        <p className="pass-text">User Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Image:</b> {userDetail?.user_image ? <><img height="150px" width="150px" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${userDetail?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Name:</b> {userDetail?.name ? userDetail?.name : <>N/A</>}</p>
                            <p > <b>Email:</b> {userDetail?.email ? userDetail?.email : <>N/A</>}</p>
                            <p > <b>Gender:</b> {userDetail?.user_gender ? userDetail?.user_gender : <>N/A</>}</p>
                            <p > <b>Bio:</b> {userDetail?.bio ? userDetail?.bio : <>N/A</> }</p>
                            <p > <b>address:</b> {userDetail?.address ? userDetail?.address : <>N/A</>}</p>
                            <p > <b>city:</b> {userDetail?.city ? userDetail?.city : <>N/A</>}</p>
                            <p > <b>Device Type:</b> {userDetail?.user_device_type ? userDetail?.user_device_type : <>N/A</>}</p> 
                        </div>
                    </> : modalType == "delete" ? <>
                        <p className="pass-text">Delete Account Confirmation</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <form >
                                <div className="pass-form-wrap" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}> 
                                    <div className="login-button mt-2" style={{ width: "40%" }}>
                                        <button type="button" onClick={() => accountDelete(id)} className="cta-btn col-reds w-100">Delete</button>
                                    </div>
                                    <div className="login-button mt-2" style={{ width: "40%" }} >
                                        <button type="button" onClick={closeModal} className="cta-btn col-reds w-100">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </> : <></>}
                </div>
            </Modal>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: users ? "3%" : "12%"
            }}>
                <section className="excel-sec">
                    <div className="container tableContainer">
                    <h1 className="titleTxt">Users List</h1>
                        <div className=" mt-2 mb-3">
                            {users ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"User List.csv"} data={csvData}>Export Excel</CSVLink>
                                </button>
                                : <></>}
                        </div>
                    </div>
                </section>
                <section className="coupon-sec-2">
                    <div className="container tableContainer">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive" id="tableready">
                                            <table id="tableData" className="table table-bordered" style={{ width: '100%', textAlign: "center" }}>
                                                <thead>
                                                    {users ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Bio</th>
                                                        <th>Phone Number</th>
                                                        <th>State</th>
                                                        <th>City</th>
                                                        <th>Registration date</th>
                                                        {/* <th>Detail</th> */}
                                                        <th>Action</th>
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {users?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.user_name ? item?.user_name : <>N/A</>}</td>
                                                            <td>{item?.email? item?.email : <>N/A</>}</td>
                                                            
                                                            <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.user_bio ? item?.user_bio : <>N/A</>}</td>
                                                            <td>{item?.phone_number ? item?.phone_number : <>N/A</>}</td>
                                                            <td>{item?.location?.state ? item?.location?.state : <>N/A</>}</td>
                                                            <td>{item?.location?.city ? item?.location?.city : <>N/A</>}</td>
                                                            <td>{moment(item?.createdAt ? item?.createdAt : <>N/A</>).format("DD-MMM-YYYY")}</td>
                                                            {/* <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "userDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td> */}
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    {/* <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => viewModal(item?._id, "delete")}  ><i className="fas fa-trash-alt"></i> Delete</span> */}
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10 }} onClick={() => blockUnblockAccount(item?._id)}  >{item?.is_blocked === 1 ? <i className="fa fa-unlock-alt"> UnBlock</i> : <i className="fa fa-solid fa-ban"> Block</i>}</span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    {users ? (<tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Bio</th>
                                                        <th>Phone Number</th>
                                                        <th>State</th>
                                                        <th>City</th>
                                                        <th>Registration date</th>
                                                        {/* <th>Detail</th> */}
                                                        <th>Action</th>
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Users Found"}</th></tr>)}
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}
export default UserList
