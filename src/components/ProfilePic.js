import {ReactComponent as Profile} from '../assets/profile.svg';

function ProfilePic ({ link, size }) {
    let length = size === "small" ? "30px" : size === "medium" ? "50px" : "80px"
    return (
        <div style={{
            width : length,
            height : length,
            borderRadius :"100px",
            overflow : "hidden",
            backgroundColor : "grey",
            marginLeft : "10px"
        }}> 
            { link ? 
                <img  src={link} width={length} height={length} style={{objectFit : 'cover'}}/>
                : <Profile />}
        </div>
    )
}

export default ProfilePic;