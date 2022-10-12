import React from 'react'
import { Col, Row, Modal, Container, Card } from 'react-bootstrap';


const InterviewDetails = ({ showModal, interviewDetails, setShowModal }) => {
  const startTime = new Date(interviewDetails?.startTime);
  const endTime = new Date(interviewDetails?.endTime);
  
  const getStandardTime = (date) => {
    const dateObj = new Date(date);
    const ISOString = dateObj.toISOString();
    return ISOString.slice(11, 16);
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size='xl' className="modal-dialog-centered" >
      <Modal.Header closeButton>
        <Modal.Title>{interviewDetails?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={8}>
              <h3>Description</h3>
              {interviewDetails?.description}
            </Col>
            <Col md={4}>
              <h5>{startTime.toDateString()}</h5>
              {/* <h5>{getStandardTime(interviewDetails?.startTime) - getStandardTime(interviewDetails?.endTime)}</h5> */}
            </Col>
          </Row>
          <Row className = 'my-2'>
              <h3>Participants</h3>
              <div className = 'd-flex flex-wrap'>
              {interviewDetails?.participants.map(participant => (
                <Card className = 'p-3 mx-1 my-1'><b>{participant.name} </b>{participant.email}</Card>
              ))}
                </div>
            </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default InterviewDetails