import './App.css';
import { Layout } from './Layout';
import { RequestList } from './requestList/certificateList';
import { RequestCertificateForm } from './requestCertificate/requestCertificate';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/submitRequest" element={<RequestCertificateForm />} />
        <Route path="/requests" element={<RequestList />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
