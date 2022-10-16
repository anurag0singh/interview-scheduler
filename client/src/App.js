import "./main.css"
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Topbar from './components/Topbar';
import Notification from './components/Notification';
import Scheduler from "./pages/Scheduler";

function App() {
  const [alert, setAlert] = useState('')
  return (
    <Router>
      <div className="App">
        <Topbar />
        {alert && <Notification alert = {alert} setShow = {setAlert}/>}
        <Routes>
          <Route path="/" element={<Home setAlert={setAlert}  />} />
          <Route path="/create" element={<Scheduler setAlert={setAlert}  />} />
          <Route path="/edit" element={<Scheduler setAlert={setAlert}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
