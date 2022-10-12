import React from 'react'
import { Alert } from "react-bootstrap";

const Notification = ({message, type, setShow}) => {
  return (
    <Alert variant={type || 'danger'} dismissible onClose={() => setShow(false)}>
    {message}
  </Alert>
  )
}

export default Notification