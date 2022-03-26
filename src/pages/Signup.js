import SignupModal from "../components/SignupModal";
import back from '../assets/back.png'

function Signup () {
    console.log(back)
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
            <SignupModal show={true} />
        </div>
    )
}

export default Signup;