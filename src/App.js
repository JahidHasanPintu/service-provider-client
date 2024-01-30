import { Route, Routes } from 'react-router-dom';
import './App.css';
import './i18n';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Head from './Components/Head/Head';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy/PrivacyPolicy';
import Contact from './Components/Pages/Contact/Contact';
import Faq from './Components/Pages/Faq/Faq';
import About from './Components/Pages/About/About';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import Terms from './Components/Pages/Terms/Terms';
import Blogs from './Components/Blogs/Blogs';
import NotFound from './Components/NotFound/NotFound';
import BlogDetails from './Components/Blogs/BlogDetails';
import Account from './Components/Account/Account';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Middlebar from './Components/Head/Middlebar';
import PostJob from './Components/PostJob/PostJob';
import Jobs from './Components/Jobs/Jobs';
import JobDetails from './Components/Jobs/JobDetails';
import Products from './Components/Products/Products';
function App() {
  return (
    <div className="App bg-slate-50">

      <Middlebar />
      <Head />
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-condition" element={<Terms />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/faq" element={<Faq />}></Route>


        <Route path="/account/*" element={<RequireAuth>
          <Account />
        </RequireAuth>}></Route>

        <Route path="/buy-sell" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/job-details" element={<RequireAuth> <JobDetails /></RequireAuth>}></Route>
        <Route path="/job-details/:jobID" element={<RequireAuth> <JobDetails /></RequireAuth>}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/post-a-job" element={<RequireAuth><PostJob /></RequireAuth>}></Route>







        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog-details" element={<BlogDetails />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
