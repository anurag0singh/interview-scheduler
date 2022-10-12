import { Fragment, useEffect, useState } from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllInterviewsOnThisDay } from "../requests/methods";

const Sidebar = ({ interviews, setInterviews }) => {
  const navigate = useNavigate();
  const current = new Date();
  const todaysDate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
  const [date, setDate] = useState(sessionStorage.getItem('date') || todaysDate);

  useEffect(() => {
    fetchPageData();
  }, [date])

  const fetchPageData = async () => {
    const interviewsList = await getAllInterviewsOnThisDay(date);
    setInterviews(interviewsList);
  }

  const onDateChange = (newDate) => {
    setDate(newDate);
    sessionStorage.setItem('date', newDate)
  }

  return (
    <Fragment>
      <Stack className="gap-5" >
        <Row>
          <h4>Schedule Meeetings</h4>
        </Row>
        <Row>
          <h6>Select Date</h6>
          <Form.Control type="date" defaultValue={date} onChange={(e) => onDateChange(e.target.value)}></Form.Control>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={() => {
            navigate("/create", {
              state: {
                date
              },
            });
          }}>Schedule An Interview</Button>
        </Row>
      </Stack>
    </Fragment>
  );
}

export default Sidebar;