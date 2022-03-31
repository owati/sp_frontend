import { useEffect } from 'react';
import '../css/sidebar.css';
import Modal from '../components/Modal';

import Vector from '../assets/Vector.png';
import ProfilePic from './ProfilePic';
import close from '../assets/close.png';
import { useSelector } from 'react-redux';

function SideBar({ show, closed }) {

    const user = useSelector(state => state.user.info);
    console.log(user)

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
                                <button className='sidebar-but'>signup</button>
                                <button className='sidebar-but'>login</button>
                            </div>
                        </>
                }

                <div>
                    <ul className='sidebar-list'>
                        {
                            ['New Releases', 'Trending', 'Collection', 'Men', 'Women']
                                .map(
                                    link => (
                                        <li className='grow' key={link}><h2>{link}</h2><img src={Vector} height="15" width="10" /></li>
                                    )
                                )
                        }
                    </ul>
                </div>

            </div>
        </Modal>
    )
}

export default SideBar;