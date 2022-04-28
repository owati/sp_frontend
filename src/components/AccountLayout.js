import { useEffect, useState } from 'react';
import {useLocation, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import '../css/account.css';
import profile from '../assets/prof.png';
import fave from '../assets/fave.png';
import notify from '../assets/notify.png';
import clock from '../assets/clock.png';
import logout from '../assets/logout.png';
import { ReactComponent as Address} from '../assets/address.svg';
import { ReactComponent as Payment } from '../assets/payment.svg'

function AccountLayout() {
    const user = useSelector(state => state.user)
    const location = useLocation();
    const [currPath, setPath] = useState(location.pathname.split('/')[2])
    
    useEffect(
        () => {
            setPath(location.pathname.split('/')[2])
        }, [location]
    )

    const sideActions = [
        ['Account', <img className="account-icons" src={profile} />],
        ['Orders', <img width="30" height="30" src={clock} />],
        ['Notifications', <img width="34"  src={notify} />],
        ['Wishlist', <img src={fave} />],
        ['Payment Info', <Payment className="account-icons" />],
        ['Address Book', <Address className="account-icons"  />],
        ['Logout', <img width="32" src={logout}  />]
    ]
    return (
        <>
            <header>
                <h1>{currPath}</h1>
            </header>
            <div className='account'>
                <div className='account-side'>
                    <div className='account-profile-pic'>

                    </div>
                    {
                        sideActions.map(
                            action => {
                                const [name, image] = action

                                return (
                                    <div style={{
                                        display : "flex",
                                        width : "200px",
                                        height : "40px",
                                        alignItems : "center",
                                    }} key={name}>
                                        {image}
                                        <h3 style={{margin : "0px", paddingLeft:"5px", height : "fit-content"}}>{name}</h3>

                                    </div>
                                )
                            }
                        )
                    }

                </div>
                <main>

                </main>
            </div>
        </> 
    )
}

export default AccountLayout;

