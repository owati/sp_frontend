import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getRequest} from '../functions/api';

function Account({loading}) {
    const user = useSelector(state =>  state.user.info);
    const [defAddress, setAddr] = useState(null);

    async function getDefaultAddres() {
        loading(true);
        const res = await getRequest('account/address')
        loading(false)
        if (res?.status === 200) {
            if(res.data.data.lenght !== 0) {
                setAddr(
                    res.data.data.filter(addr => addr.default)
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
                <div>
                    
                    <div className='account-details'>

                    </div>
                    <div className='account-address-book'>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Account;