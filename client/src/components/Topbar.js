import { Container, Navbar } from "react-bootstrap";

const Topbar = () => {
    return (
        <Navbar bg='dark' variant='dark' >
            <Container>
                <Navbar.Brand >
                    <img
                        alt=""
                        src={require("../assets/logo.png")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Interview Scheduler
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Topbar;