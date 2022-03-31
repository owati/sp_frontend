import { useEffect } from "react";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../redux/slicers/userSlicer'
import "../css/signup.css"
import Modal from "./Modal";
import SignupInput from "./inputs/SignupInput";
import logo from '../assets/logo1.png';
import { postRequest } from "../functions/api";
import { login } from '../functions/auth';

const LoginModal = ({ show }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout( () => {
            toast.info("fill the form to login ",{
                icon : false
            });
        }, 1000)
    }, [])

    return (
        <Modal show={show}>
            <div className="log-div">
                <img src={logo} className="sign-img"/>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: ""
                        }
                    }
                    onSubmit={
                        (values, { setSubmitting }) => {
                            let {email } = values
                            if(email && !email.includes('@')) {
                                toast.error("enter a valid email");
                                setSubmitting(false);
                            } else {
                                postRequest('account/login', values)
                                .then(response => {
                                    if(response.status === 200){
                                        toast.success(response.data.message);
                                        login(response.data.userInfo.token);
                                        dispatch(setUser(response.data.userInfo));
                                        setTimeout(() => {
                                            navigate('/')
                                        }, 1000)
                                    } else {
                                        toast.error(response.data.message)
                                        setSubmitting(false)
                                    }
                                })
                                
                            }
                        }
                    }
                >
                    {
                        ({ values,
                            handleSubmit,
                            handleChange,
                            errors,
                            handleBlur,
                            isSubmitting
                        }) => (
                            <form onSubmit={e => {handleSubmit(e)}} className="sign-form">
                                {
                                    (() => {
                                        let comp = []
                                        for (let i in values) {
                                            comp.push(
                                                <SignupInput
                                                    key={i}
                                                    value={values[i]}
                                                    name={i}
                                                    onblur={handleBlur}
                                                    onchange={handleChange}
                                                />
                                            )
                                        }
                                        return comp;
                                    })()
                                }
                                <button type="submit" 
                                className={
                                    `sign-submit grow shadow-5 ${( isSubmitting   ||  !values.email || !values.password ) ? "sign-submit-disable" : ""}`
                                 }
                                disabled={isSubmitting || 
                                    !values.email    || !values.password }
                                >
                                    SIGN IN</button>
                            </form>
                        )
                    }

                </Formik>
                <h4>Haven't registered? <Link to='/signup'>Sign up</Link></h4>
            </div>
        </Modal>
    )

}

export default LoginModal;