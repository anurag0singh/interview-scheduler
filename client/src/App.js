import "./main.css"
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Topbar from './components/Topbar';
import Notification from './components/Notification';
import Scheduler from "./pages/Scheduler";

function App() {
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  return (
    <Router>
      <div className="App">
        <Topbar />
        {message && <Notification message = {message} type = {type} setShow = {setMessage}/>}
        <Routes>
          <Route path="/" element={<Home setMessage = {setMessage} setType={setType} />} />
          <Route path="/create" element={<Scheduler setMessage = {setMessage} setType={setType} />} />
          <Route path="/edit" element={<Scheduler setMessage = {setMessage} setType={setType} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;