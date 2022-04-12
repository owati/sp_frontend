import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/navbar.css';
import logo from '../assets/logo2.png';
import search from '../assets/search.png';
import cart from '../assets/cart.png';
import fave from '../assets/fave.png';
import profile from '../assets/prof.png';
import menu from '../assets/menu.png';
import ProfilePic from './ProfilePic';
import SideBar from './SideBar';
import SearchModal from './SearchModal';


function NavBar() {
    const user = useSelector(state => state.user.info)
    const navigate = useNavigate();
    let [curr, setCurr] = useState("");
    let [side, setSide] = useState(false);
    let [searchShow, setSearch] = useState(false)
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
                                                    navigate('new-releases');
                                                    break;
                                                case 'Trending':
                                                    setCurr('Trending');
                                                    navigate('trending');
                                                    break;
                                                case 'Collection':
                                                    setCurr('Collection');
                                                    navigate('collection');
                                                    break;
                                            }
                                        }}
                                    >{link}</h4>
                                )
                            )
                    }
                </div>
                <div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <SearchBut action={setSearch} />
                    <img src={fave} alt="favourite" height="25" width="25" className='nav-img grow' />
                    <img src={cart} alt="cart" height="25" width="25" className='nav-img grow' />
                    <img src={profile} alt="profile" height="25" width="25" className='nav-img grow' />
                </div>

            </nav>
            <nav className='mobile-nav'>
                <div style={{ display: "flex" }}>
                    <img src={menu} height="30" width="30" className='grow'
                    onClick={ () => {
                        setSide(true)
                    }}
                     />
                    { user ?
                        <ProfilePic size="small"/>
                        : <></>
                    }
                </div>

                <div>
                    <img src={cart} height="25" width="25" className='nav-img grow' />
                    <img src={search} height="25" width="25" className='nav-img grow'
                        onClick={ 
                            () => {
                                setSearch(true)
                            }
                        }
                     />
                </div>
            </nav>
            <SideBar show={side} closed={() => {setSide(false)}}/>
            <SearchModal show={searchShow} closed={ () => {setSearch(false)}}/>
        </>
    )
}

function SearchBut({ action }) {
    return (
        <div className='search'
            onClick={
                () => {
                    action(true)
                }
            }
        >
            <img src={search} alt="search img" height="20" width="20" />
            <h5 className='search-text'>search</h5>
        </div>
    )
}




export default NavBar;