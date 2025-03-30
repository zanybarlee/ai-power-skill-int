
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import PostJob from "./pages/PostJob";
import Candidates from "./pages/Candidates";
import Shortlists from "./pages/Shortlists";
import Settings from "./pages/Settings";
import EmployerProfile from "./pages/EmployerProfile";
import EAPManagement from "./pages/EAPManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/shortlists" element={<Shortlists />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/employer-profile" element={<EmployerProfile />} />
      <Route path="/eap-management" element={<EAPManagement />} />
      {/* Add redirect from /dashboard to /post-job */}
      <Route path="/dashboard" element={<Navigate to="/post-job" replace />} />
      {/* Catch all other routes and redirect to /post-job */}
      <Route path="*" element={<Navigate to="/post-job" replace />} />
    </Routes>
  );
}

export default App;
