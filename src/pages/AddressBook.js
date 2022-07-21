import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select'
import { getRequest, postRequest, putRequest, deleteRequest, getStates } from '../functions/api';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';
import { ReactComponent as Plus } from '../assets/plus.svg';
import close from '../assets/close.png';
import axios from 'axios';

function AddressBook({ loading }) {
    const user = useSelector(state => state.user.info);
    const [address, setAddress] = useState(null);
    const [showAddrModal, setShow] = useState(false);
    const [modalData, setData] = useState(null);

    useEffect(
        () => {
            getAddress()
        }, []
    )

    async function getAddress() {
        loading(true);
        const res = await getRequest('account/address');
        loading(false);
        if (res?.status == 200) {
            console.log()
            setAddress(res.data.data);
        }
    }

    async function addAddress(data) {
        loading(true)
        const res = await postRequest('account/address', data)
        loading(false)
        if (res?.status === 201) {
            setAddress(res.data.data);
            toast.success('Address added successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function updateAddress(data) {
        loading(true)
        const res = await putRequest('account/address', data)
        loading(false)
        if (res?.status === 200) {
            setAddress(res.data.data);
            toast.success('Address updated successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    async function deleteAddress(number) {
        loading(true)
        const res = await deleteRequest('account/address?number=' + number)
        loading(false)
        if (res?.status === 200) {
            setAddress(res.data.data);
            toast.success('Address deleted successfully')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }
    async function defaultAddress(number) {
        loading(true)
        const res = await putRequest('account/address/default/' + number, {})
        loading(false)
        if (res?.status === 200) {
            setAddress(res.data.data);
            toast.success('default address has been changed')
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    const addressActions = {
        setDefault: defaultAddress,
        deleteAdd: deleteAddress,
        updateAdd: (data) => {
            setShow(true)
            setData(data)
        }
    }

    return (
        <div className='address-main'>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between'
            }} className="address-header">
                <h3 className='address-title'>Available Addresses</h3>
                <button className='address-new-butt' onClick={
                    () => {
                        console.log('shoe', showAddrModal)
                        setShow(true);
                        setData(null);
                    }
                }>ADD NEW</button>

            </div>

            {
                address && address.length > 0 ?
                    <div className='address-list'>
                        {
                            (() => {
                                const defaultAddress = address.filter(addr => addr.default)[0]
                                return <AddressCard isDefault
                                    data={defaultAddress}
                                    name={user?.first_name + ' ' + user?.last_name}
                                    index={address.indexOf(defaultAddress)}
                                    actions={addressActions} />
                            })()
                        }
                        {
                            address.filter(addr => !addr.default)
                                .map(
                                    addr => (
                                        <AddressCard key={address.indexOf(addr)} data={addr} name={user?.first_name + ' ' + user?.last_name} index={address.indexOf(addr)}
                                            actions={addressActions} />
                                    )
                                )
                        }

                    </div> : <></>
            }
            <AddressEdit show={showAddrModal} toggle={setShow} data={modalData} actions={
                (data) => {
                    return data ? updateAddress : addAddress
                }
            } name={user?.first_name + ' ' + user?.last_name} />

            <button className='address-mobile-add' style={{ display: "none" }} onClick={
                () => {
                    console.log('shoe', showAddrModal)
                    setShow(true);
                    setData(null);
                }
            }>
                <Plus />
            </button>
        </div>
    )
}
export default AddressBook;

function AddressCard({ isDefault = false, data, index, actions }) {
    return (
        <div className={'address-card shadow-5 ' + (isDefault ? "address-default" : "")}>
            <div className='address-card-div'>
                <div className='address-card-details'>
                    {
                        isDefault ? <button className='address-default-butt' style={{
                            marginBottom: "10px"
                        }}>Default Address</button>
                            : <></>
                    }
                    <h4 style={{ marginTop: "0px" }}>
                        {data?.name}
                    </h4>

                    <h5 style={{ margin: "0px" }}>{data?.address}</h5>
                    <h5 style={{margin : '5px'}}>{data?.state + ', '  + data?.country}</h5>
                    {/* <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5>
                    <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5> */}



                    <h5>{data?.phone}</h5>

                </div>
                {
                    isDefault ? <div className='address-card-actions'>
                        <Edit onClick={() => {
                            actions.updateAdd({
                                ...data,
                                index
                            })
                        }} />
                    </div> :
                        <div className='address-card-actions'>
                            <div>
                                <Edit style={{
                                    marginRight: "4px"
                                }} onClick={
                                    () => {
                                        actions.updateAdd({ ...data, index })
                                    }
                                } />
                                <Delete style={{
                                    borderLeft: "2px solid black",
                                    paddingLeft: "4px"
                                }} onClick={
                                    () => actions.deleteAdd(index)
                                } />
                            </div>

                            <button className='address-default-butt' onClick={
                                () => {
                                    actions.setDefault(index)
                                }
                            }>make default</button>

                        </div>
                }
            </div>

        </div>
    )
}

function AddressEdit({ show = false, actions = {}, data, toggle, name }) {

    const [states, setStates] = useState([])

    async function fetchStates(country='Nigeria') {
        const res = await getStates();
        if(Array.isArray(res)) {
            setStates(res)
        }
    }

    const [details, setDetails] = useState({ ...data });

    useEffect(
        () => {
            if (data) setDetails({ ...data });
            else {
                setDetails({ name })
            }
        }, [data, name]
    )

    useEffect(
        () => {
            fetchStates()
        },[]
    )

    function editDetail(e) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Modal show={show} direction='center'>
            <div className='address-edit shadow-5' data-aos="fade-down">
                <img src={close} className="address-close" onClick={() => toggle(false)} />
                <h2 style={{
                    margin: "0px",
                    marginBottom: "10px"
                }}>{
                        data ? "Edit this address" : "Create a new address"
                    }</h2>
                <input autoFocus className="address-input" type='text' placeholder='Name' name='name' value={details?.name}
                    onChange={editDetail}></input>

                <input className="address-input" type='tel' placeholder='Phone number' name="phone" value={details?.phone}
                    onChange={editDetail}></input>

                <textarea className="address-input" placeholder='addresss' name="address" value={details?.address}
                    onChange={editDetail} />

                <div className='address-edit-select'>
                    <div style={{width : '150px', marginBottom: '20px'}}>
                        <Select placeholder="state"
                            options={states}
                            onChange={e => {e.target = {name : 'state', value : e.value}; editDetail(e) }}
                        />
                    </div>
                    <div style={{width : '150px', marginBottom: '20px'}}>
                        <Select placeholder="country" options={[{label : 'Nigeria', value : 'Nigeria'}]}
                        onChange={e => {e.target = {name : 'country', value : e.value}; editDetail(e) }}/>

                    </div>
                </div>

                <button className="grow" onClick={
                    () => {
                        if (!details?.name || !details?.phone || !details?.address) {
                            toast.error('Please fill all the fields ')
                        } else if (details?.name.length < 5) {
                            toast.error('The name is too short, Try entering full name')
                        } else if (details?.phone.length < 6) {
                            toast.error('The phone number seems to small');
                        } else if (details?.address.length < 10) {
                            toast.error('The address is too short, Please try to make it as detailed as possibe')
                        }
                        else {
                            actions(data)({
                                address: {
                                    ...details
                                },
                                number: data?.index
                            }).then(
                                () => {
                                    setDetails({});
                                    toggle(false)
                                }
                            )
                        }
                    }
                }>{
                        data ? "Update" : "Create"
                    }</button>

            </div>
        </Modal>
    )

}