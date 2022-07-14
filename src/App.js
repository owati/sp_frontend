import 'tachyons';
import SignupLogin from './pages/SignupLogin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Layout from './components/Layout';
import Reviews, { CreateReview } from './pages/Reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRequest } from './functions/api';
import { setUser } from './redux/slicers/userSlicer';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { mergeFaves } from './functions/storage';


function App() {
  const dispatch = useDispatch();

  const [storage, setStorage] = useState({}); //helps rerenders the page when the localstorage cages
  let fetchUser = async () => {
    let response = await getRequest('account/info');
    if (response.status === 200) {
      dispatch(setUser(response.data.userInfo));
      toast.info(`welcome back ${response.data.userInfo.first_name}`, {
        icon: false
      })

    }
    mergeFaves(response?.data?.userInfo?.favourites || []) // fetches and updates the local storage
  }
  useEffect(
    () => {
      AOS.init();
      fetchUser();

      window.addEventListener('storage', e => {
        //console.log('updated ');
        
        setStorage({})
      })
    }, []
  )

  useEffect(() => console.log('updated', localStorage.getItem('faves')), storage)
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupLogin login={false} />} />
        <Route path="/login" element={<SignupLogin login={true} />} />
        <Route exact path="reviews/:id" element={<Reviews />} />
        <Route exact path="writereview/:id" element={<CreateReview />} />
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
