import React, { useEffect,useMemo,useRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JoditEditor from "jodit-react";

import moment from 'moment'
import { getTerms, terms, notification } from '../store/slices/userSlice'
const Notification = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()

  const sendNotification = async () => {
    try {
       await dispatch(notification({title: title , message : description})).unwrap()
      try {
        setDescription("");
        setTitle("");
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }
//   useEffect(() => {
//     async function TcPpData() {
//       try {
//         await dispatch(terms()).unwrap()
        
//       } catch (rejectedValueOrSerializedError) {
//         console.log(rejectedValueOrSerializedError)
//       }
//     }
//     console.log("sdscxzcxzc",Tc)
    
    
//       TcPpData();
    
   
//   }, [])

  return (
    <>
    <div className="term-condition-sec">
  <div className="container type-2">
    <div className="term-condition-wrap">
      <div className="term-condition-box">
        <h1 className="heading-2">Notification</h1>
        <div className="content-box">
          <div className="wrap-input100 validate-input mt-2">
            <input className="input100" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="wrap-input100 validate-input mt-4">
            <textarea className="textArea100" rows="15" cols="30" value={description} placeholder="Message" onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <div className="login-button mt-2">
          <button onClick={() => sendNotification()} className="cta-btn col-reds w-20 pt-1 pb-1">Send</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Notification