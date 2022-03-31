import SignupModal from "../components/SignupModal";
import back from '../assets/back.png'
import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar";

function SignupLogin ({login}) {
    return (
        <div style={{
            width : "100%",
            height : "100vh",
            background : `url(${back})`,
            backgroundSize : "900px 125vh",
            backgroundPosition :" top -50px left -100px",
            backgroundRepeat : "no-repeat",
            position :"fixed",

        }}>
            { login ?
                <LoginModal show={true} /> :
                <SignupModal show={true} />
                }
        </div>
    )
}

export default SignupLogin;