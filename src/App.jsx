import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, LandingPage } from "./components/Landing Page";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
