import 'tachyons';
import SignupLogin from './pages/SignupLogin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getToken } from './functions/auth';
import { getRequest } from './functions/api';
import { setUser } from './redux/slicers/userSlicer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const dispatch = useDispatch()
  let fetchUser = async () => {
    let response = await getRequest('account/info');
    if (response.status === 200) dispatch(setUser(response.data.userInfo));
  }
  useEffect(
    () => {
      AOS.init();
      fetchUser();
    }
  )
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupLogin login={false} />} />
        <Route path="/login" element={<SignupLogin login={true} />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}



export default App;
