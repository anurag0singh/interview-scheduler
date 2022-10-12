import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import List from "../components/List";
import { getAllParticipants, scheduleInterview, updateInterview } from "../requests/methods";

const Scheduler = ({setMessage, setType}) => {
  const navigate = useNavigate();
  const { date, oldInterview } = useLocation().state;
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState("");
  const [name, setName] = useState();

  useEffect(() => {
    if(startTime && endTime && startTime > endTime){
      setMessage("End time cannot be lower than start time")
    }
  }, [startTime, endTime])

  useEffect(() => {
    if (oldInterview) {
      const startTimeObj = new Date(oldInterview.startTime);
      const endTimeObj = new Date(oldInterview.endTime);
      const oldStartTime = (startTimeObj.getHours() >= 10 ? "" : "0") + startTimeObj.getHours() + ":" + startTimeObj.getMinutes();
      const oldEndTime = (endTimeObj.getHours() >= 10 ? "" : "0") + endTimeObj.getHours() + ":" + endTimeObj.getMinutes();
      setStartTime(oldStartTime);
      setEndTime(oldEndTime);
      setName(oldInterview.name);
      setDescription(oldInterview.description);
      setSelectedParticipants(oldInterview.participants);
    }
    fetchPageData();
  }, [])


  const fetchPageData = async () => {
    const participantsList = await getAllParticipants();
    setParticipants(participantsList);
  }

  const handleSubmit = async (e) => {
    console.log(selectedParticipants)
    e.preventDefault();
    const newStartTime = new Date(`${date} ${startTime} UTC` ).toISOString();
    const newEndTime = new Date(`${date} ${endTime} UTC `).toISOString();
    console.log(newStartTime, newEndTime);
    if(selectedParticipants.length < 2){
      setMessage("Please select atleast two participants")
      return
    }
    if (!oldInterview) {
      await scheduleInterview({
        participants: selectedParticipants,
        startTime: newStartTime,
        endTime: newEndTime,
        name,
        description
      });
      setMessage('Interview Scheduled Successfully')
      setType('success')
    }
    else {
      await updateInterview({
        id: oldInterview._id,
        formData: {
          participants: selectedParticipants,
          startTime: newStartTime,
          endTime: newEndTime,
          name,
          description
        }
      });
    }
    return navigate("/")
  }

  return (
    <Fragment>
      <Container className="my-3">
        <Form>
          <Row>
            <Col md={6}>
              <Button variant="dark" onClick={() => navigate('/')}>
                Back
              </Button>
            </Col>
            <Col md={3}>
              <div className="d-grid gap-2">
                <Button variant="outline-dark" onClick={handleSubmit} type="submit">Save Schedule</Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                <Button variant="outline-danger">Cancel</Button>
              </div>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Row className="my-2">
                <Col>
                  <Form.Label>Start Time: </Form.Label>
                  <Form.Control type="time" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </Col>
                <Col>
                  <Form.Label>End Time: </Form.Label>
                  <Form.Control type="time" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </Col>

              </Row>
            </Col>
            <Col>
              <Form.Label>Description: </Form.Label>
              <Form.Control as="textarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5}></Form.Control>
            </Col>
          </Row>
          <Row>
            <List participants={participants} selectedParticipants={selectedParticipants} setSelectedParticipants={setSelectedParticipants} date={date} startTime={startTime} endTime={endTime} setMessage = {setMessage} />
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
}

export default Scheduler;