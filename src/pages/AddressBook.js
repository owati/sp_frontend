import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, postRequest, putRequest, deleteRequest } from '../functions/api';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';
import close from '../assets/close.png';

function AddressBook({loading}) {
    const user = useSelector(state => state.user.info);
    const [address, setAddress] = useState(user?.address);
    const [showAddrModal, setShow] = useState(false)

    useEffect( 
        () => {
            setAddress(user?.address)
        }, [user]
    )


    async function addAddress (data) {
        loading(true)
        const res = await postRequest('account/address', data)
        loading(false)
        if(res.status === 201) {
            setAddress(res.data.data);
            toast.success('Address added successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function updateAddress (data) {
        loading(true)
        const res = await putRequest('account/address', data)
        loading(false)
        if(res.status === 200) {
            setAddress(res.data.data);
            toast.success('Address updated successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function deleteAddress (number) {
        loading(true)
        const res = await deleteRequest('account/address?number=' + number)
        loading(false)
        if(res.status === 200) {
            setAddress(res.data.data);
            toast.success('Address deleted successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }
    async function defaultAddress (number) {
        loading(true)
        const res = await putRequest('account/address/default/' + number , {})
        loading(false)
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
                                    addr => (
                                        <AddressCard data={addr} name={user.first_name + ' ' + user.last_name} index={address.indexOf(addr)} />
                                    )
                                )
                        }

                        <button className='address-new-butt' onClick={
                            () =>{
                                console.log('shoe', showAddrModal)
                                setShow(true)
                            }
                        }>ADD NEW</button>
                    </div> : <></>
            }
            <AddressEdit show={showAddrModal} toggle={setShow} actions={
                (data) => {
                    return data ? updateAddress : addAddress  
                }
            }/>
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

function AddressEdit ({show=false, actions={}, data, toggle}) {
    const [details, setDetails] = useState({...data});

    function editDetail(e) {
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })
    }
    return (
        <Modal show={show} direction='center'>
            <div className='address-edit shadow-5' data-aos="fade-down">
            <img src={close} className="address-close" onClick={() => toggle(false)} />
                <h2 style={{
                    margin : "0px",
                    marginBottom : "10px"
                }}>{
                    data ? "Edit this address" : "Create a new address"
                    }</h2>
                <input autoFocus className="address-input" type='text' placeholder='Name' name='name' value={details?.name} 
                 onChange={editDetail}></input>

                <input  className="address-input"  type='tel' placeholder='Phone number' name="phone" value={details?.phone} 
                onChange={editDetail}></input>

                <textarea   className="address-input"  placeholder='addresss' name="address" value={details?.address} 
                onChange={editDetail} />

                <button className="grow" onClick={
                    () => {
                        actions(data)();
                    }
                }>{
                    data  ? "Update" : "Create"
                    }</button>

            </div>
        </Modal>
    )

}