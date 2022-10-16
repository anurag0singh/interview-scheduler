import React from 'react'
import { Toast, ToastContainer } from "react-bootstrap";

const Notification = ({ alert, setShow }) => {
  return (
    <ToastContainer position='top-end' style={{opacity: '90%'}}>
      <Toast dismissible bg={alert.type} onClose={() => setShow(false)} show={alert} delay={3000} autohide>
        <Toast.Header className='text-capitalize'>{alert.type}</Toast.Header>
        <Toast.Body>{alert.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notification;