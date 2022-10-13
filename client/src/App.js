import "./main.css"
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Topbar from './components/Topbar';
import Notification from './components/Notification';
import Scheduler from "./pages/Scheduler";

function App() {
  const [message, setMessage] = useState('')
  return (
    <Router>
      <div className="App">
        <Topbar />
        {message && <Notification message = {message} setShow = {setMessage}/>}
        <Routes>
          <Route path="/" element={<Home setMessage = {setMessage}  />} />
          <Route path="/create" element={<Scheduler setMessage = {setMessage}  />} />
          <Route path="/edit" element={<Scheduler setMessage = {setMessage}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
