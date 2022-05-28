import { Routes, Route } from 'react-router-dom';
import TopHead from './TopHead';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../pages/Home';
import Trending from '../pages/Trending';
import SearchResult from '../pages/SearchResult';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Favourites from '../pages/Favourites';
import AccountLayout from './AccountLayout';
import Help, {HelpDetail} from '../pages/Help';


function Layout() {
    return (
        <>
            <TopHead />
            <NavBar />
            <div style={{display : "flex"}}>
                <div style={{margin : "auto", width : "100%", maxWidth : "1400px"}}>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route exact path="home" element={<Home />} />
                    <Route exact path="trending" element={<Trending/>} />
                    <Route exact path="search/:name" element={<SearchResult />} />
                    <Route exact path="product/:id" element={<Product />}/>
                    <Route exact path="cart" element={<Cart />}/>
                    <Route exact path="favourites" element={<Favourites />}/>
                    <Route exact path='help' element={<Help />}/>
                    <Route exact path='help/details' element={<HelpDetail />}/>
                    <Route exact path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>

                </div>
            </div>
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