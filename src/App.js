import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequestCertificateForm } from './pages/requestCertificate';
import { RequestList } from './pages/certificateList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestCertificateForm/>}/>
        <Route path="/requests" element={<RequestList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
