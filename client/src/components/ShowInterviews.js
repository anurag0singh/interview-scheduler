import { Fragment, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteInterview } from "../requests/methods";
import InterviewDetails from '../components/InterviewDetails';


const ShowInterviews = ({ interviews, setInterviews, setAlert }) => {

  const navigate = useNavigate();
  const [showInterviewDetails, setShowInterviewDetails] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState();

  const getStandardTime = (date) => {
    const timeObj = new Date(date);
    const hours = timeObj.getHours();
    const minutes = timeObj.getMinutes();
    return ((hours % 12) < 10 ? "0" : "") + (hours % 12) + ":" + (minutes < 10 ? "0" : "") + minutes + " " + (hours >= 12 ? 'PM' : 'AM');
  }

  const handleShowModal = (interview) => {
    setShowInterviewDetails(true)
    setInterviewDetails(interview)
  }

  const onEdit = (oldInterview) => {
    const dateObj = new Date(oldInterview.startTime);
    const date = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
    navigate('/edit', { state: { date, oldInterview } });
  }

  const handleDelete = async (id) => {
    await deleteInterview(id);
    setAlert({
      type: 'success',
      message: 'Interview Sucessfully Deleted'
    });
    setInterviews(interviews.filter(interview => interview._id !== id));
  }

  return (
    <Fragment>
      <InterviewDetails interviewDetails={interviewDetails} showModal={showInterviewDetails} setShowModal={setShowInterviewDetails} />
      <Row xs={1} md={3} className="g-3">
        {interviews.map((interview, index) => (
          <Col key={index}>
            <Card className="interview-card text-center">
              <Card.Header>
                <h5>{interview.name}</h5>
                {interview.participants.length} pariticipants
              </Card.Header>
              <Card.Body onClick={() => handleShowModal(interview)} className="">
                <Card.Text style={{ height: "18vh", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <small>  {interview.description ? interview.description : "No description provided"}</small>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small>{getStandardTime(interview.startTime)} - {getStandardTime(interview.endTime)}</small>
                <div>
                  <Button variant='secondary' className='btn btn-sm mx-1' onClick={() => onEdit(interview)}>Edit</Button>
                  <Button variant='secondary' className='btn btn-sm' onClick={() => handleDelete(interview._id)}>Delete</Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
}

export default ShowInterviews;