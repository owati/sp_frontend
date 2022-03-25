import { Formik } from "formik";
import "../css/signup.css"
import Modal from "./Modal";

const SignupModal = ({show}) => {
    return (
        <Modal show={show}>
            <div className="sign-div">
                <Formik
                    initialValues={
                        {
                            
                        }
                    }
                >
                    <form>

                    </form>
                </Formik>
            </div>
        </Modal>
    )

}

export default SignupModal;