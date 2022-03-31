import { useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import "../css/signup.css"
import Modal from "./Modal";
import SignupInput from "./inputs/SignupInput";
import logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
import { postRequest } from "../functions/api";

const SignupModal = ({ show }) => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout( () => {
            toast.info("fill the form to sign up ",{
                icon : false
            });
        }, 1000)
    }, [])

    return (
        <Modal show={show}>
            <div className="sign-div">
                <img src={logo} className="sign-img"/>
                <Formik
                    initialValues={
                        {
                            first_name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            password2:""
                        }
                    }
                    onSubmit={
                        (values, { setSubmitting }) => {
                            let {email, first_name, last_name, password, password2} = values
                            if(email && !email.includes('@')) {
                                toast.error("enter a valid email");
                                setSubmitting(false);
                            } 
                            else if(first_name && first_name.length < 2) {
                                toast.error("first name is too short");
                                setSubmitting(false);
                            } else if (last_name && last_name.length < 2) {
                                toast.error("last name is too short");
                                setSubmitting(false);
                            } else if (password && password.length < 6) {
                                toast.error("password is too short");
                                setSubmitting(false);
                            } else if (password && password.length > 15) {
                                toast.error("password is too long");
                                setSubmitting(false);
                            } else if( password && password2 && password !== password2) {
                                toast.error ("password do not match");
                                setSubmitting(false);
                            } else {
                                postRequest('account/signup', values)
                                .then(response => {
                                    if(response.status === 201){
                                        toast.success(response.data.message);
                                        setTimeout(() => {
                                            navigate('/login');
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
                                    `sign-submit grow shadow-5 ${( isSubmitting    || !values.first_name  || !values.last_name   ||  !values.email || !values.password || !values.password2) ? "sign-submit-disable" : ""}`
                                 }
                                disabled={isSubmitting || 
                                    !values.first_name  || 
                                    !values.last_name   || 
                                    !values.email       || !values.password || !values.password2}
                                >
                                    SIGN UP</button>
                            </form>
                        )
                    }

                </Formik>
                <h4>already registered? <Link to="/login">sign in</Link></h4>
            </div>
        </Modal>
    )

}

export default SignupModal;