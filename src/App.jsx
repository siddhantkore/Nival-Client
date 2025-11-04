import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import LogIn from './pages/Auth/LogIn/LogIn'
import HomePage from './pages/Home/Index'
import Blog from './pages/Blogs/Blog';
import BlogDetails from './components/blogDetails';
import Services from './pages/Services/Services';
import Work from './pages/Work/Work';
import WorkDetail from './pages/Work/WorkDetail';
import ContactUs from './pages/Cantact/ContactUs';
import Careers from './pages/Careers/Careers';
import Dashboard from './pages/Admin/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import UnderDevelopment from './pages/UnderDevelopment/UnderDevelopment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/under-development" element={<UnderDevelopment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
