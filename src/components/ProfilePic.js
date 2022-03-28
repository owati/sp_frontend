

function ProfilePic ({ link }) {
    return (
        <div style={{
            width : "30px",
            height : "30px",
            borderRadius :"20px",
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