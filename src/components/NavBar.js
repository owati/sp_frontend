import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import logo from '../assets/logo2.png';
import search from '../assets/search.png';
import cart from '../assets/cart.png';
import fave from '../assets/fave.png';
import profile from '../assets/prof.png';
import menu from '../assets/menu.png';
import ProfilePic from './ProfilePic';
import SideBar from './SideBar';


function NavBar() {
    const navigate = useNavigate();
    let [curr, setCurr] = useState("");
    let [side, setSide] = useState(false);
    return (
        <>
            <nav className='nav'>
                <div style={{ width: "20%" }}>
                    <img src={logo} width="60" height="40" alt="logo image" />
                </div>
                <div className='center-links'>
                    {
                        ['New Releases', 'Trending', 'Collection']
                            .map(
                                link => (
                                    <h4 key={link} className={`links grow ${link === curr ? 'active' : ""}`}
                                        onClick={() => {
                                            switch (link) {
                                                case 'New Releases':
                                                    setCurr('New Releases');
                                                    navigate('home');
                                                    break;
                                                case 'Trending':
                                                    setCurr('Trending');
                                                    navigate('home');
                                                    break;
                                                case 'Collection':
                                                    setCurr('Collection');
                                                    navigate('home');
                                                    break;
                                            }
                                        }}
                                    >{link}</h4>
                                )
                            )
                    }
                </div>
                <div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <SearchBut />
                    <img src={fave} height="25" width="25" className='nav-img grow' />
                    <img src={cart} height="25" width="25" className='nav-img grow' />
                    <img src={profile} height="25" width="25" className='nav-img grow' />
                </div>

            </nav>
            <nav className='mobile-nav'>
                <div style={{ display: "flex" }}>
                    <img src={menu} height="30" width="30" className='grow'
                    onClick={ () => {
                        setSide(true)
                    }}
                     />
                    <ProfilePic size="small"/>
                </div>

                <div>
                    <img src={cart} height="25" width="25" className='nav-img grow' />
                    <img src={search} height="25" width="25" className='nav-img grow' />
                </div>
            </nav>
            <SideBar show={side} close={() => {setSide(false)}}/>
        </>
    )
}

function SearchBut() {
    return (
        <div className='search'>
            <img src={search} alt="search img" height="20" width="20" />
            <h5 className='search-text'>search</h5>
        </div>
    )
}




export default NavBar;