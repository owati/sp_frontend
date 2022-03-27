
import '../css/navbar.css';
import logo from '../assets/logo2.png';
import search from '../assets/search.png';

function NavBar () {
    return (
        <nav className='nav'>
            <div style={{width : "20%"}}>
                <img src={logo} width="60" height="40" alt="logo image" />
            </div>
            <div className='center-links'>
                {
                    ['New Releases', 'Trending', 'Collection']
                    .map(
                        link => (
                            <h4 className='links grow'>{link}</h4>
                        )
                    )
                }
            </div>
            <div style={{width : "20%", display : "flex"}}>
                <SearchBut />
                <img />
            </div>

        </nav>
    )
}

function SearchBut () {
    return (
        <div className='search'>
            <img src={search} alt="search img" height="20" width="20" />
            <h5 className='search-text'>search</h5>
        </div> 
    )
}

export default NavBar;