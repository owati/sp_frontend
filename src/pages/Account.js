import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRequest } from '../functions/api';
import { ReactComponent as Logout } from '../assets/logout.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as NotifySvg } from '../assets/notify.svg';
import { ReactComponent as Clock } from '../assets/clock.svg';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import { Notify } from './Notification';

function Account({ loading }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.info);
    const [defAddress, setAddr] = useState(null);

    async function getDefaultAddres() {
        loading(true);
        const res = await getRequest('account/address')
        loading(false)
        if (res?.status === 200) {
            if (res.data.data.lenght !== 0) {
                setAddr(
                    res.data.data.filter(addr => addr.default)[0]
                )
            }
        }
    }
    useEffect(
        () => {
            getDefaultAddres()
        }, []
    )

    const mobile_actions = [
        ['Wishlist', <Heart className='account-icons' />],
        ['Orders', <Clock className='account-icons' />],
        ['Notifications', <NotifySvg className='account-icons' />]
    ]
    return (
        <div>
            <div className='account-desktop-view'>
                <div className="account-details-view" style={{
                    display: "flex"
                }}>

                    <div className='account-details'>
                        <h4 className='account-details-header'>Account Details <Edit /></h4>

                        <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                        <h5>{user?.email}</h5>

                        <button style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "red"
                        }}> Channge Password</button>

                    </div>
                    <div className='account-details' style={{ marginLeft: '100px' }}>
                        <h4 className='account-details-header'>Address Details <Edit onClick={
                            () => {
                                navigate('../Address Book')
                            }
                        } /></h4>

                        <h4>{defAddress?.name}</h4>
                        <h4>{defAddress?.address}</h4>
                        <h4>{defAddress?.phone}</h4>
                    </div>
                </div>

                <div className='account-details account-notification'>
                    <h3 className='account-details-header'>Notifications</h3>
                    <Notify style={{ border: "none", margin: '15px 0px' }} />
                    <div className='acount-notificaation-button'>
                        <button onClick={() => {
                            navigate('../Notifications')
                        }}>Show more</button>
                    </div>
                </div>
            </div>

            <div className='account-mobile-view'>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom : "20px"
                }}>
                    <div className='account-profile-pic' style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "10px"
                    }}>

                    </div>
                    <div>
                        <h3 style={{margin : "0px"}}>{user?.first_name + ' ' + user?.last_name}</h3>
                        <h4 style={{margin : "0px", color : "rgba(0,0,0,0.3)"}}>{user?.email}</h4>
                    </div>
                </div>

                <div className='account-mobile-actions shadow-5'>
                    {
                        mobile_actions.map(
                            action => {
                                return <div className='account-mobile-action active' key={action[0]} onClick={
                                    () => {
                                        navigate('../' + action[0])
                                    }
                                }>
                                    {action[1]}
                                    <h3 style={{
                                        border : "none",
                                        margin : "10px 0px",
                                        fontSize : "15px",
                                        fontWeight : "400"
                                    }}>{action[0]}</h3>
                                </div>
                            }
                        )
                    }

                </div>

                <h3>Account Settings</h3>
                <div className='account-mobile-settings'>
                    <Link to='../Notifications'><h4 className='account-mobile-settings-list'>Details</h4></Link>
                    <Link to='../Address Book'><h4 className='account-mobile-settings-list'>Address Book</h4></Link>
                    <Link to='../Payment Info'><h4 className='account-mobile-settings-list'>Payment Info</h4></Link>
                    <h4 className='account-mobile-settings-list' style={{border : "none"}}>Change Password</h4>
                </div>
                <div style={{display : "flex", justifyContent : "center"}}>
                <button style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "center",
                    border : "none",
                    backgroundColor : "transparent"

                }}
                ><Logout style={{marginRight : "10px"}}/> <h4>Logout</h4></button>
                </div>


            </div>

        </div>
    )
}

export default Account;