import React from 'react'
import { Toast, ToastContainer } from "react-bootstrap";

const Notification = ({ message, setShow }) => {
  return (
    <ToastContainer position='top-end' className='p-3'>
      <Toast dismissible onClose={() => setShow(false)} show={message} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notification