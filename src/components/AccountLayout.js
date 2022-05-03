import { useEffect, useState } from 'react';
import {useLocation, useNavigate,Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import '../css/account.css';
import Notification from '../pages/Notification';
import { ReactComponent as Account} from '../assets/account.svg';
import { ReactComponent as Logout} from '../assets/logout.svg';
import { ReactComponent as Notify} from '../assets/notify.svg';
import { ReactComponent as Heart} from '../assets/heart.svg';
import { ReactComponent as Clock} from '../assets/clock.svg';
import { ReactComponent as Address} from '../assets/address.svg';
import { ReactComponent as Payment } from '../assets/payment.svg'

function AccountLayout() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [currPath, setPath] = useState(location.pathname.split('/')[2])
    
    useEffect(
        () => {
            setPath(location.pathname.split('/')[2].replace('%20',' '))
        }, [location]
    )

    const sideActions = [
        ['Account', <Account className="account-icons" />],
        ['Orders', <Clock className="account-icons" />],
        ['Notifications', <Notify className="account-icons" />],
        ['Wishlist', <Heart className="account-icons" />],
        ['Payment Info', <Payment className="account-icons" />],
        ['Address Book', <Address className="account-icons"  />],
        ['Logout', <Logout className="account-icons" />]
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
                                    <div className={'account-actions grow ' + (name === currPath ? 'active' : '')} key={name}
                                    onClick = {
                                        () => {
                                            navigate('./' + name)
                                        }
                                    }
                                    >
                                        {image}
                                        <h3 style={{margin : "0px", paddingLeft:"5px", height : "fit-content"}}>{name}</h3>

                                    </div>
                                )
                            }
                        )
                    }

                </div>
                <main className='account-main'>
                    <Routes>
                        <Route exact path='Notifications' element={<Notification />} />
                    </Routes>

                </main>
            </div>
        </> 
    )
}

export default AccountLayout;

