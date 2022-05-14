import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRequest, postRequest, putRequest } from '../functions/api';
import { setUser } from '../redux/slicers/userSlicer';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ReactComponent as Logout } from '../assets/logout.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as NotifySvg } from '../assets/notify.svg';
import { ReactComponent as Clock } from '../assets/clock.svg';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import Modal from '../components/Modal';
import { Notify } from './Notification';
import AccountInput from '../components/inputs/AccountInput';
import close from '../assets/close.png'

function Account({ loading }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.info);
    const [defAddress, setAddr] = useState(null);
    const [changePass, showPass] = useState(false);

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
                        <h4 className='account-details-header'>Account Details <Edit onClick={
                            () => {
                                navigate('../Account Edit')
                            }
                        } /></h4>
                        <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                        <h5>{user?.email}</h5>

                        <button style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "red"
                        }} onClick={
                            () => {
                                showPass(true)
                            }
                        }> Channge Password</button>

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
                    marginBottom: "20px"
                }}>
                    <div className='account-profile-pic' style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "10px"
                    }}>

                    </div>
                    <div>
                        <h3 style={{ margin: "0px" }}>{user?.first_name + ' ' + user?.last_name}</h3>
                        <h4 style={{ margin: "0px", color: "rgba(0,0,0,0.3)" }}>{user?.email}</h4>
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
                                        border: "none",
                                        margin: "10px 0px",
                                        fontSize: "15px",
                                        fontWeight: "400"
                                    }}>{action[0]}</h3>
                                </div>
                            }
                        )
                    }

                </div>

                <h3>Account Settings</h3>
                <div className='account-mobile-settings'>
                    <Link to='../Account Edit'><h4 className='account-mobile-settings-list'>Details</h4></Link>
                    <Link to='../Address Book'><h4 className='account-mobile-settings-list'>Address Book</h4></Link>
                    <Link to='../Payment Info'><h4 className='account-mobile-settings-list'>Payment Info</h4></Link>
                    <h4 className='account-mobile-settings-list' style={{ border: "none" }} onClick={
                        () => {
                            showPass(true)
                        }
                    }>Change Password</h4>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        backgroundColor: "transparent"

                    }}
                    ><Logout style={{ marginRight: "10px" }} /> <h4>Logout</h4></button>
                </div>


            </div>
            <ChangePassword toggle={showPass} show={changePass} loading={loading} />
        </div>
    )
}

export default Account;


export function AccountEdit({ loading }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.info);

    async function updateUserInfo(data) {
        loading(true)
        const res = await putRequest('account/info', data);
        loading(false)
        if (res?.status === 202) {
            console.log(res)
            dispatch(setUser(res.data.userInfo));
            toast.success('user info has been updated')
            navigate('../Account')
        } else {
            toast.error(res?.data?.message)
        }
    }

    function getInputDetail(name) {
        const name_array = name.split('_')
        let capitalized = ''
        name_array.forEach(
            el => {
                let el_new = el[0].toUpperCase() + el.slice(1);
                capitalized = capitalized.concat(el_new + ' ');
            }
        )


        return {
            new_name: name_array.includes('birth') ? 'Date of Birth' : capitalized,
            type: name_array.includes('birth') ? 'date' : name_array.includes('email') ? 'email'
                : name_array.includes('phone') ? 'tel' : 'text'
        }
    }

    return <div style={{
        display: "flex",
        justifyContent: "center"
    }}>
        <Formik
            initialValues={
                {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user?.email,
                    confirm_email: user?.email,
                    phone_no: user?.phone_no,
                    birth_date: user?.birth_date
                }
            }

            onSubmit={
                (values) => {
                    const { first_name, last_name, email,
                        confirm_email, phone_no, birth_date } = values

                    if (!first_name || !last_name || !email ||
                        !confirm_email || !phone_no) {
                        toast.error('Pleas fill all the fields')
                    }
                    else if (first_name?.lenght < 2) {
                        toast.error('first name is too short')
                    }
                    else if (last_name?.lenght < 2) {
                        toast.error('last name is too short')
                    }
                    else if (first_name?.lenght > 20) {
                        toast.error('first name is too long')
                    }
                    else if (last_name?.lenght > 20) {
                        toast.error('last name is too long')
                    } else if (email !== confirm_email) {
                        toast.error('emails do not match')
                    } else if (phone_no.lenght < 8) {
                        toast.error('phone number not valid')
                    } else {
                        updateUserInfo({ ...values })
                    }

                }
            }
        >
            {
                ({ values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => {
                    return <form onSubmit={e => handleSubmit(e)} className="account-edit">

                        {
                            Object.entries(values)
                                .map(
                                    ([name, value]) => {
                                        const { new_name, type } = getInputDetail(name)
                                        return (
                                            <AccountInput label={new_name} name={name} value={value} type={type} onChange={handleChange} />
                                        )
                                    }
                                )
                        }
                        <div></div>
                        <div className='account-edit-butt'>
                            <button type='submit'>UPDATE</button>

                        </div>
                    </form>
                }
            }

        </Formik>
    </div>
}

function ChangePassword({ show = false, toggle, loading }) {

    const [details, setDetails] = useState({
        old: '',
        new_pass: '',
        confirm_new_pass: ''
    });


    const edit = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    async function postPassword(data) {
        loading(true);
        const res = await postRequest('account/info', data)
        loading(false)
        if (res?.status === 202) {
            toast.success('password changed successfully')
            toggle(false);
            setDetails({
                old : '',
                new_pass: '',
                confirm_new_pass: ''
            })
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <Modal show={show} direction='center'>
            <div className='address-edit shadow-5' data-aos="fade-down" style={{
                height: "500px"
            }}>
                <img src={close} className="address-close" onClick={() => {
                    toggle(false)
                    setDetails({
                        old : '',
                        new_pass: '',
                        confirm_new_pass: ''
                    })
                } }/>
                <h2 style={{
                    margin: "0px",
                    marginBottom: "10px"
                }}>Confirm Password</h2>

                <AccountInput label='Old password' value={details.old} type="password" name="old" onChange={edit} />
                <AccountInput label='New password' value={details.new_pass} type="password" name="new_pass" onChange={edit} />
                <AccountInput label='Confirm password' value={details.confirm_new_pass} type="password" name="confirm_new_pass" onChange={edit} />

                <button className="grow" onClick={
                    () => {
                        const { old, new_pass, confirm_new_pass } = details
                        if (!new_pass || !old || !confirm_new_pass) {
                            toast.error("Please fill all the fields")
                        }
                        else if (new_pass.length < 6) {
                            toast.error('password is too short')
                        } else if (new_pass.length > 20) {
                            toast.error('password is too long')
                        } else if (new_pass !== confirm_new_pass) {
                            toast.error('password and confirm password not the same')
                        } else {
                            postPassword({ password: { ...details } })
                        }

                    }
                } style={{
                    width: "200px",
                    marginTop: "20px",
                    height: "50px",
                    borderRadius: "10px"
                }}>Change password</button>

            </div>
        </Modal>
    )
}
