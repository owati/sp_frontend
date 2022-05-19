import { useEffect, useState } from 'react';
import {useLocation, useNavigate,Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import '../css/account.css';
import Loading from './Loading';
import Notification from '../pages/Notification';
import AddressBook from '../pages/AddressBook';
import AccountPage, {AccountEdit} from '../pages/Account';
import { ReactComponent as Account} from '../assets/account.svg';
import { ReactComponent as Logout} from '../assets/logout.svg';
import { ReactComponent as Heart} from '../assets/heart.svg';
import { ReactComponent as Notify} from '../assets/notify.svg';
import { ReactComponent as Clock} from '../assets/clock.svg';
import { ReactComponent as Address} from '../assets/address.svg';
import { ReactComponent as Payment } from '../assets/payment.svg'
import PaymentInfo from '../pages/PaymentInfo';
import Order from '../pages/Order';

function AccountLayout() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false)
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

                                const alsoAccount = (currPath === 'Account Edit') && (name === "Account")

                                return (
                                    <div className={'account-actions grow ' + (((name === currPath) || alsoAccount) ? 'active' : '')} key={name}
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
                        <Route exact path='Address%20Book' element={<AddressBook loading={setLoading}/>}/>
                        <Route exact path='Account' element={<AccountPage loading={setLoading}/>}/>
                        <Route exact path='Account%20Edit' element={<AccountEdit loading={setLoading}/>}/>
                        <Route exact path='Payment%20Info' element={<PaymentInfo loading={setLoading}/>}/>
                        <Route exact path='Orders' element={<Order loading={setLoading}/>}/>
                    </Routes>
                </main>
            </div>
            <Loading show={loading}/>
        </> 
    )
}

export default AccountLayout;

