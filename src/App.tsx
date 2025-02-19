
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
    </Routes>
  );
}

export default App;
