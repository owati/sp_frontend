import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {getRequest} from '../functions/api';
import {ReactComponent as Edit} from '../assets/carbon_edit.svg';
import {Notify} from './Notification';

function Account({loading}) {
    const navigate = useNavigate();
    const user = useSelector(state =>  state.user.info);
    const [defAddress, setAddr] = useState(null);

    async function getDefaultAddres() {
        loading(true);
        const res = await getRequest('account/address')
        loading(false)
        if (res?.status === 200) {
            if(res.data.data.lenght !== 0) {
                setAddr(
                    res.data.data.filter(addr => addr.default)[0]
                    )
                }
        }
    }
    useEffect(
        () => {
            getDefaultAddres()
        },[]
    )
    return (
        <div>
            <div className='account-desktop-view'>
                <div className="account-details-view" style={{
                    display : "flex"
                }}>
                    
                    <div className='account-details'>
                        <h4 className='account-details-header'>Account Details <Edit /></h4>

                        <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                        <h5>{user?.email}</h5>

                        <button> Channge Password</button>
                    
                    </div>
                    <div className='account-details' style={{marginLeft : '100px'}}>
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
                    <Notify style={{border : "none", margin: '15px 0px'}}/>
                    <div className='acount-notificaation-button'>
                        <button onClick={() => {
                            navigate('../Notifications')
                        }}>Show more</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Account;