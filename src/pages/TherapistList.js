import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { blockunblock, deleteAccount, getAllTherapists, getUserStatus } from '../store/slices/userSlice';
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
const TherapistList = () => {
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
        }else if (type == "availablity") {
            setUserDetail(item)
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
            const response = await dispatch(getAllTherapists()).unwrap()
            console.log(response.data)
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
                        <p className="pass-text">Therapist Detail</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            <p > <b>Image:</b> {userDetail?.user_image ? <><img height="150px" width="150px" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${userDetail?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Name:</b> {userDetail?.user_name ? userDetail?.user_name : <>N/A</>}</p>
                            <p > <b>Email:</b> {userDetail?.email ? userDetail?.email : <>N/A</>}</p>
                            <p > <b>Bio:</b> {userDetail?.user_bio ? userDetail?.user_bio : <>N/A</>}</p>
                            <p > <b>Phone Number:</b> {userDetail?.phone_number ? userDetail?.phone_number : <>N/A</>}</p>
                            <p > <b>Min Charges:</b> {userDetail?.min_charges ? userDetail?.min_charges : <>N/A</>}</p>
                            <p > <b>Max Charges:</b> {userDetail?.max_charges ? userDetail?.max_charges : <>N/A</>}</p>
                            <p > <b>Min Travel Limit:</b> {userDetail?.travel_limit?.min_limit ? userDetail?.travel_limit?.min_limit : <>N/A</>}</p>
                            <p > <b>Max Travel Limit:</b> {userDetail?.travel_limit?.max_limit ? userDetail?.travel_limit?.max_limit : <>N/A</>}</p>
                            <p > <b>Tele Health Service:</b> {userDetail?.is_tele_health_service == 1 ? <>Active</> : <>Inactive</>}</p>
                            <p > <b>State:</b> {userDetail?.location?.state ? userDetail?.location?.state : <>N/A</>}</p>
                            <p > <b>City:</b> {userDetail?.location?.city ? userDetail?.location?.city : <>N/A</>}</p>
                            {/* <p > <b>Device Type:</b> {userDetail?.user_device_type ? userDetail?.user_device_type : <>N/A</>}</p>  */}
                            <p ><b>Categories:</b>  {userDetail?.categories.length > 0 ?
                                <ul>
                                    {userDetail?.categories?.map((item, i) => (
                                        <li>{item}</li>
                                    ))}</ul> : "N/A"}
                            </p>
                            <p ><b>Certificates:</b>  {userDetail?.certificates.length > 0 ?
                                <ul>
                                    {userDetail?.certificates?.map((item, i) => (
                                       <><img height="150px" width="150px" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${item}`}></img></> 
                                    ))}</ul> : "N/A"}
                            </p>
                        </div>
                    </> :modalType == "availablity" ? <>
                        <p className="pass-text">Therapist Availablity Schedule</p>
                        <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <div className="modal-body">
                            {userDetail?.avalablities?.length > 0 ? <>

                                <p ><b>Monday:</b>  {userDetail?.avalablities[0]?.monday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.monday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul> 
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Tuesday:</b>  {userDetail?.avalablities[0]?.tuesday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.tuesday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Wednesday:</b>  {userDetail?.avalablities[0]?.wednesday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.wednesday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Thursday:</b>  {userDetail?.avalablities[0]?.thursday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.thursday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Friday:</b>  {userDetail?.avalablities[0]?.friday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.friday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Saturday:</b>  {userDetail?.avalablities[0]?.saturday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.saturday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                                <p ><b>Sunday:</b>  {userDetail?.avalablities[0]?.sunday?.length > 0 ?
                                <ul>
                                    {userDetail?.avalablities[0]?.sunday.map((item, i) => (
                                      <ul>
                                      <li>Start Time: {item.start_time}</li>
                                      <li>End Time: {item.end_time}</li>
                                      <li>Break Start Time: {item.break_start_time}</li>
                                      <li>Break End Time: {item.break_end_time}</li>
                                      </ul>
                                    ))}</ul> 
                                    : "N/A"}
                            </p>
                            </>
                              : 
                             <><h4>Not Available</h4></>}
                            {/* <p > <b>Image:</b> {userDetail?.user_image ? <><img height="150px" width="150px" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${userDetail?.user_image}`}></img></> : <>No Image Found</>}</p>
                            <p > <b>Name:</b> {userDetail?.user_name ? userDetail?.user_name : <>N/A</>}</p>
                            <p > <b>Email:</b> {userDetail?.email ? userDetail?.email : <>N/A</>}</p>
                            <p > <b>Bio:</b> {userDetail?.user_bio ? userDetail?.user_bio : <>N/A</>}</p>
                            <p > <b>Phone Number:</b> {userDetail?.phone_number ? userDetail?.phone_number : <>N/A</>}</p>
                            <p > <b>Min Charges:</b> {userDetail?.min_charges ? userDetail?.min_charges : <>N/A</>}</p>
                            <p > <b>Max Charges:</b> {userDetail?.max_charges ? userDetail?.max_charges : <>N/A</>}</p>
                            <p > <b>Min Travel Limit:</b> {userDetail?.travel_limit?.min_limit ? userDetail?.travel_limit?.min_limit : <>N/A</>}</p>
                            <p > <b>Max Travel Limit:</b> {userDetail?.travel_limit?.max_limit ? userDetail?.travel_limit?.max_limit : <>N/A</>}</p>
                            <p > <b>Tele Health Service:</b> {userDetail?.is_tele_health_service == 1 ? <>Active</> : <>Inactive</>}</p>
                            <p > <b>State:</b> {userDetail?.location?.state ? userDetail?.location?.state : <>N/A</>}</p>
                            <p > <b>City:</b> {userDetail?.location?.city ? userDetail?.location?.city : <>N/A</>}</p>
                            <p > <b>Device Type:</b> {userDetail?.user_device_type ? userDetail?.user_device_type : <>N/A</>}</p> 
                            <p ><b>Categories:</b>  {userDetail?.categories.length > 0 ?
                                <ul>
                                    {userDetail?.categories?.map((item, i) => (
                                        <li>{item}</li>
                                    ))}</ul> : "N/A"}
                            </p>
                            <p ><b>Certificates:</b>  {userDetail?.certificates.length > 0 ?
                                <ul>
                                    {userDetail?.certificates?.map((item, i) => (
                                       <><img height="150px" width="150px" style={{ borderRadius: 5 }} src={`${process.env.REACT_APP_APIURL}${item}`}></img></> 
                                    ))}</ul> : "N/A"}
                            </p> */}
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
                        <h1 className="titleTxt">Therapist List</h1>
                        <div className=" mt-2 mb-3">
                            {users ?
                                <button className="excel-btn col-reds w-10 pt-1 pb-1">
                                    <CSVLink filename={"Therapist List.csv"} data={csvData}>Export Excel</CSVLink>
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
                                                        <th>Availablity Schedule</th>
                                                        <th>Detail</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr></tr>)}
                                                </thead>
                                                <tbody >
                                                    {users?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.user_name ? item?.user_name : <>N/A</>}</td>
                                                            <td>{item?.email ? item?.email : <>N/A</>}</td>

                                                            <td style={{
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                whiteSpace: "normal",
                                                            }}>{item?.user_bio ? item?.user_bio : <>N/A</>}</td>
                                                            <td>{item?.phone_number ? item?.phone_number : <>N/A</>}</td>
                                                            <td>{item?.location?.state ? item?.location?.state : <>N/A</>}</td>
                                                            <td>{item?.location?.city ? item?.location?.city : <>N/A</>}</td>
                                                            <td>{moment(item?.createdAt ? item?.createdAt : <>N/A</>).format("DD-MMM-YYYY")}</td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "availablity")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="edit-icon" >
                                                                    <span style={{ cursor: "pointer", fontWeight: "bold", margin: 10, fontSize: 13, }} onClick={() => viewModal(item, "userDetail")}  ><i className="fas fa-eye"></i> View</span>
                                                                </span>
                                                            </td>
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
                                                        <th>Availablity Schedule</th>
                                                        <th>Detail</th>
                                                        <th>Action</th>
                                                    </tr>) : (<tr><th>{status == "loading" ? "Loading..." : "No Therapist Found"}</th></tr>)}
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
export default TherapistList
