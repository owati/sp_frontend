import 'tachyons';
import SignupLogin from './pages/SignupLogin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Layout from './components/Layout';
import Reviews, { CreateReview } from './pages/Reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRequest } from './functions/api';
import { setUser, remUser } from './redux/slicers/userSlicer';
import { updateItem } from './redux/slicers/faveSlicer';
import { updateItem as updateCart } from './redux/slicers/cartSlicer';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { mergeCart, mergeFaves } from './functions/storage';


function App() {
  const dispatch = useDispatch();
  const user =  useSelector(state => state.user.info)
  let fetchUser = async () => {
    let response = await getRequest('account/info');
    if (response.status === 200) {
      dispatch(setUser(response.data.userInfo));
      toast.info(`welcome back ${response.data.userInfo.first_name}`, {
        icon: false
      })
      const cart_res = await getRequest('pref/cart');
      if (cart_res?.status === 200){
        dispatch(updateCart(mergeCart(cart_res.data.data)))
      }
    }
    else dispatch(remUser())
    const fave = mergeFaves(response?.data?.userInfo?.favourites || []) // fetches and updates the local storage
    dispatch(updateItem(fave))
  }

  useEffect(
    () => {
      AOS.init();
      fetchUser();
    }, []
  )
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
