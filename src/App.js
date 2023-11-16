import './App.css';
import { RequestList } from './pages/certificateList';
import { RequestCertificateForm } from './pages/requestCertificate';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RequestCertificateForm />}/>
      <Route path="/requests" element={<RequestList />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
