import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SyllabusManager from "./components/SyllabusManager";
import SyllabusDetail from "./components/SyllabusDetail";
import Login from "./components/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/syllabus" element={<SyllabusManager />} />
        <Route path="/subject/:id" element={<SyllabusDetail />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
