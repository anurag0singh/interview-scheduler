import { Fragment, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import ShowInterviews from '../components/ShowInterviews';


const Home = ({ setAlert }) => {
  const [interviews, setInterviews] = useState([]);

  return (
    <Fragment>
      <Container fluid="md" className='mx-5'>
        <div className='py-3'>
          <Row>
            <Col md={3}>
              <div className='sticky-top'>
                <Sidebar interviews={interviews} setInterviews={setInterviews} />
              </div>
            </Col>
            <Col>
              {
                interviews.length > 0 ?
                  <ShowInterviews interviews={interviews} setInterviews={setInterviews} setAlert={setAlert} /> :
                  (<Row>
                    <Col><img src={require("../assets/no-interviews.png")} alt='No Interviews Today' width='600px' className='rounded mx-auto d-block' /></Col>
                  </Row>)
              }
            </Col>
          </Row>
        </div>

      </Container>
    </Fragment>
  )
}

export default Home