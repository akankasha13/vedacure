import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing Page";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RiskAnalysis from "./components/RiskAnalysis";
import Header from "./components/Header";
import HealthTracking from "./components/HealthTracking";
import Naturopathy from "./components/Naturopathy";
import MedicalRecords from "./components/MedicalRecords";

function App() {
  return (
    <div className="bg-white text-black">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/risk" element={<RiskAnalysis />} />
          <Route path="/tracking" element={<HealthTracking />} />
          <Route path="/naturopathy" element={<Naturopathy />} />
          <Route path="/records" element={<MedicalRecords />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
