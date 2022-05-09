import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRequest, postRequest, putRequest, deleteRequest } from '../functions/api';
import {toggle} from '../redux/slicers/loadSlicer';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';
import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';

function AddressBook() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.info);
    const [address, setAddress] = useState(user?.address);

    useEffect( 
        () => {
            setAddress(user?.address)
        }, [user]
    )

    async function addAddress (data) {
        dispatch(toggle(true))
        const res = await postRequest('account/address', data)
        dispatch(toggle(false))
        if(res.status === 201) {
            setAddress(res.data.data);
            toast.success('Address added successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function updateAddress (data) {
        dispatch(toggle(true))
        const res = await putRequest('account/address', data)
        dispatch(toggle(false))
        if(res.status === 200) {
            setAddress(res.data.data);
            toast.success('Address updated successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function deleteAddress (number) {
        dispatch(toggle(true))
        const res = await deleteRequest('account/address?number=' + number)
        dispatch(toggle(false))
        if(res.status === 200) {
            setAddress(res.data.data);
            toast.success('Address deleted successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }
    async function defaultAddress (number) {
        dispatch(toggle(true))
        const res = await putRequest('account/address/default/' + number , {})
        dispatch(toggle(false))
        if(res.status === 200) {
            setAddress(res.data.data);
            toast.success('default address has been changed')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    return (
        <div className='address-main'>
            <h3 className='address-title'>Available Addresses</h3>

            {
                address && address.length > 0 ?
                    <div className='address-list'>
                        {
                            (() => {
                                const defaultAddress = address.filter(addr => addr.default)[0]
                                return <AddressCard isDefault
                                    data={defaultAddress}
                                    name={user.first_name + ' ' + user.last_name}
                                    index={address.indexOf(defaultAddress)} />
                            })()
                        }
                        {
                            address.filter(addr => !addr.default)
                                .map(
                                    addr => {
                                        console.log(addr);
                                        return <AddressCard data={addr} name={user.first_name + ' ' + user.last_name} index={address.indexOf(addr)} />
                                        
                                    }
                                )
                        }

                        <button className='address-new-butt'>ADD NEW</button>
                    </div> : <></>
            }
        </div>
    )
}
export default AddressBook;

function AddressCard({ isDefault = false, data, name, index }) {
    return (
        <div className={'address-card shadow-5 ' + (isDefault ? "address-default" : "")}>
            <div className='address-card-div'>
                <div className='address-card-details'>
                    <h4 style={{ marginTop: "0px" }}>
                        {name}
                    </h4>

                    <h5 style={{ margin: "0px" }}>{data?.address}</h5>
                    {/* <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5>
                    <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5> */}

                    <h5>{data?.phone}</h5>

                </div>

                {
                    isDefault ? <div className='address-card-actions'>
                        <Edit />
                    </div> :
                        <div className='address-card-actions'>
                            <div>
                                <Edit style={{
                                    marginRight: "4px"
                                }} />
                                <Delete style={{
                                    borderLeft: "2px solid black",
                                    paddingLeft: "4px"
                                }} />
                            </div>

                            <button>make default</button>

                        </div>
                }


            </div>

        </div>
    )
}

function AddressEdit () {

}