import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Help, { HelpDetail } from '../pages/Help';
import Checkout from '../pages/Checkout';
import NewReleases from '../pages/NewReleases';
import { ReactComponent as Cart2 } from '../assets/checkout.svg';


function Layout() {
    const location = useLocation();
    const [currPath, setPath] = useState(location.pathname.split('/')[2])
    useEffect(
        () => {
            setPath(location.pathname.split('/')[2]?.replace('%20', ' '))
        }, [location]
    )
    return (
        <>
            <TopHead />
            <NavBar />
            <div style={{ display: "flex", flexDirection: 'column' }}>
                {
                    location.pathname.includes('account') ? <header style={{display : "flex"}}>
                        <h1 style={{maxWidth : '1400px', margin : 'auto', width : '100%'}}>{currPath}</h1>
                    </header> : location.pathname.includes('checkout') ?
                        <header style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Cart2 /> <h1 style={{ margin: 0, paddingLeft: '20px', fontSize: '35px' }}>CHECKOUT</h1>
                        </header>
                        : <></>

                }
                <div style={{ margin: "auto", width: "100%", maxWidth: "1400px" }}>

                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route exact path="home" element={<Home />} />
                        <Route exact path="trending" element={<Trending />} />
                        <Route exact path="new-releases" element={<NewReleases />} />
                        <Route exact path="search/:name" element={<SearchResult />} />
                        <Route exact path="product/:id" element={<Product />} />
                        <Route exact path="cart" element={<Cart />} />
                        <Route exact path="favourites" element={<Favourites />} />
                        <Route exact path='help' element={<Help />} />
                        <Route exact path='help/details' element={<HelpDetail />} />
                        <Route exact path='checkout' element={<Checkout />} />
                        <Route exact path="account/*" element={<AccountLayout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </div>
            </div>
            <Footer />

        </>
    )
}


function NotFound() {
    return (
        <h1>Page not found</h1>
    )
}

export default Layout;