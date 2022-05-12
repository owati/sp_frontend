import { useState } from "react";
import show from '../../assets/show.jpg';
import noshow from '../../assets/noshow.jpg';


function AccountInput({type="text", 
    value,
    onChange,
    name,
    label
}) {
    const [inputType, setInput] = useState(type);
    if (['text', 'email', 'tel'].includes(type)) {
        return(
            <div className="account-edit-div" style={{
                width : "100%",
                display : "flex",
                flexDirection  : "column",
            }}>
                <label><h3>{label}</h3></label>
                <input type={inputType} value={value} onChange={onChange} name={name} style ={{
                    borderRadius : "0px",
                    border : "1px solid black",
                    height : "50px",
                    padding : "0px 10px"
                }} />
            </div>
        )
    } else if(type === 'password') {
        return(
            <div className="account-edit-div" style={{
                width : "100%",
                display : "flex",
                flexDirection  : "column",
            }}>
                <label><h3>{label}</h3></label>
                <div style={{
                    borderRadius : "0px",
                    border : "1px solid black",
                    height : "50px",
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <input type={inputType} value={value} onChange={onChange} name={name} style ={{
                        border : "none",
                        height : "100%",
                        width : "calc(100% - 30px)",
                        padding : "0px 10px", 
                    }} />
                    <img src={inputType === 'text' ? show : noshow} style={{
                        width : "20px",
                        height : "20px",
                        marginRight : "10px",
                        cursor : "pointer"
                    }} onClick= {() => {
                        setInput(inputType === 'text' ? 'password' : 'text')
                    }}/>
                </div>
            </div>
        )

    } else if(type === 'date') {
        return(
            <div className="account-edit-div" style={{
                width : "100%",
                display : "flex",
                flexDirection  : "column",
            }}>
                <label><h3>{label}</h3></label>

                <input type={inputType} value={value?.slice(0,10)} onChange={onChange} name={name} style ={{
                    width : "calc(100% - 25px)",
                    borderRadius : "0px",
                    border : "1px solid black",
                    height : "50px",
                    padding : "0px 10px"
                }} />
            </div>
        )
    } else {
        return (
            <h1>Not a type</h1>
        )
    }
}

export default AccountInput;