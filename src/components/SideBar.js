import { useEffect } from 'react';
import '../css/sidebar.css';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import Vector from '../assets/Vector.png';
import ProfilePic from './ProfilePic';
import close from '../assets/close.png';
import { useSelector } from 'react-redux';
import cart from '../assets/cart.png';
import fave from '../assets/fave.png';
import notify from '../assets/notify.png';
import clock from '../assets/clock.png';
import setings from '../assets/settings.png';
import logout from '../assets/logout.png';
import help from '../assets/help.png'


function SideBar({ show, closed }) {

    const user = useSelector(state => state.user.info);

    const sideActions = [
        ["Bag"  ,cart],
        ["Favourite" , fave],
        ["Notifications" , notify],
        ["Orders" , clock],
        ["Settings" , setings],
        ["Logout" , logout],
        ["Help" , help]
    ]

    

    useEffect(() => {
        if (show) {
            let side = document.getElementsByClassName('sidebar')[0];
            side.style.width = "85vw";
        }
    }, [show])
    return (
        <Modal show={show} direction='left' added="no-mode">
            <div className='sidebar'>
                <img src={close} height="25" width="25"
                    onClick={
                        () => {
                            closed();
                        }
                    }
                />
                {
                    user ?
                        <>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "5px"
                            }}>
                                <ProfilePic size="medium" />
                            </div>

                            <div style={{ textAlign: "center", paddingBottom: "15px" }}>
                                <h3 className='small-marg'>{user?.first_name + user?.last_name}</h3>
                                <h4 className='small-marg'>{user?.email}</h4>
                            </div>
                        </> : 
                        <>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "5px"
                            }}>
                                <Link to="/signup"><button className='sidebar-but'>signup</button></Link>
                                <Link to="/login"><button className='sidebar-but'>login</button></Link>
                            </div>
                        </>
                }

                <div>
                    <ul className='sidebar-list'>
                        {
                            ['New Releases', 'Trending', 'Collection', 'Men', 'Women']
                                .map(
                                    link => (
                                        <Link key={link} to={"/" +
                                            (
                                                (str) => {
                                                    return str.toLowerCase()
                                                              .replace(' ', '-')
                                                }
                                            )(link)
                                        }><li className='grow' key={link}
                                            onClick = {
                                                () => {
                                                    closed()
                                                }
                                            }
                                        ><h2>{link}</h2><img src={Vector} height="15" width="10" /></li></Link>
                                    )
                                )
                        }
                    </ul>
                </div>

                <div>
                    <ul className="side-actions">
                        {
                            sideActions
                            .map(
                                action => {
                                    const [name , image ] = action
                                    if (!user && ["Notifications", "Logout", "Settings", "Orders"].includes(name)) {
                                        return <></>
                                    }
                                    return <li className='grow' key={name}
                                        onClick = {
                                            () => {
                                                // the routing code...
                                                closed()
                                            }
                                        }
                                    >
                                        <img src={image} alt={name} />
                                        {name}
                                    </li>
                                }
                            )

                        }
                    </ul>

                </div>

            </div>
        </Modal>
    )
}

export default SideBar;