import { Routes, Route } from 'react-router-dom';
import TopHead from './TopHead';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../pages/Home';
import Trending from '../pages/Trending';
import SearchResult from '../pages/SearchResult';
import Product from '../pages/Product';


function Layout() {
    return (
        <>
            <TopHead />
            <NavBar />
            <Routes>
                <Route path="" element={<Home />} />
                <Route exact path="home" element={<Home />} />
                <Route exact path="trending" element={<Trending/>} />
                <Route exact path="search/:name" element={<SearchResult />} />
                <Route exact path="product/:id" element={<Product />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
            <Footer />
            
        </>
    )
}


function NotFound () {
    return (
      <h1>Page not found</h1>
    )
  }

export default Layout;