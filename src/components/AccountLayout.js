import { useEffect, useState } from 'react';
import {useLocation, useNavigate,Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import '../css/account.css';
import Loading from './Loading';
import Notification from '../pages/Notification';
import AddressBook from '../pages/AddressBook';
import { setUser } from '../redux/slicers/userSlicer';
import AccountPage, {AccountEdit} from '../pages/Account';
import { ReactComponent as Account} from '../assets/account.svg';
import { ReactComponent as Logout} from '../assets/logout.svg';
import { ReactComponent as Heart} from '../assets/heart.svg';
import { ReactComponent as Notify} from '../assets/notify.svg';
import { ReactComponent as Clock} from '../assets/clock.svg';
import { ReactComponent as Address} from '../assets/address.svg';
import { ReactComponent as Payment } from '../assets/payment.svg';
import { ReactComponent as Profile} from '../assets/profile.svg';
import { ReactComponent as Camera } from '../assets/camera.svg';
import PaymentInfo from '../pages/PaymentInfo';
import Order from '../pages/Order';
import OrderDetails from '../pages/OrderDetails';
import { postRequest } from '../functions/api';
import { toast } from 'react-toastify';



function AccountLayout() {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();
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

    useEffect(
        () => {
            console.log(user)
            if (user === null) {
                navigate('/login')
            }
        },[]
    )


    async function handleProfilePost(e) {
        const [file] = e.target.files;
                                
        if (['image/jpeg', 'image/png'].includes(file.type)) {
            const profileForm = document.querySelector('#profile-form');
            const formData = new FormData(profileForm);
            setLoading(true)
            const res = await postRequest('account/profile/image', formData)
            setLoading(false);
            if (res?.status === 200) {
                dispatch(setUser(res?.data?.data))
            } else {
                toast.error('There was an error uploading the picture')
            }
        } else {
            toast.error('Only images files (png, jpg) are allowed')
        }
    }

    return (
        <>
            <div className='account'>
                <div className='account-side'>
                    
                    <form  encType='multipart/form-data' id="profile-form" style={{position : "relative"}}>
                        <div className='account-profile-pic'>
                            <input  id="set-profile" name="image" type="file" accept="image/png, image/jpeg" style={{display : 'none'}} onChange={
                                e => {
                                    handleProfilePost(e)
                                }
                            }/>
                            {
                                user?.profile_image ? 
                                <img src={user.profile_image} style={{width : '100%', height : "100%", objectFit : 'cover'}}/>
                                : <Profile />
                            }
                        </div>
                        <Camera className='camera-input' onClick={
                            () => {
                                const fileInput = document.querySelector('#set-profile');
                                fileInput.click()
                            }
                        }/>
                    </form>
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
                        <Route exact path='Orders/:orderId' element={<OrderDetails loading={setLoading}/>}/>
                    </Routes>
                </main>
            </div>
            <Loading show={loading}/>
        </> 
    )
}

export default AccountLayout;

