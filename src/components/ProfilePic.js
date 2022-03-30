

function ProfilePic ({ link, size }) {
    let length = size === "small" ? "30px" : size === "medium" ? "50px" : "80px"
    return (
        <div style={{
            width : length,
            height : length,
            borderRadius :"100px",
            overflow : "hidden",
            backgroundColor : "black",
            marginLeft : "10px"
        }}> 
            { link ? 
                <img  src={link} height="30" width="30"/>
                : <></>}
        </div>
    )
}

export default ProfilePic;