import { useState, useEffect } from 'react';


function SignupInput({ value, name, onchange, onblur }) {
    let [placeholder, setPlace] = useState();
    let [type, setType] = useState("text");

    useEffect(() => {
        switch (name) {
            case "first_name":
                setPlace("First name");
                break;
            case "last_name":
                setPlace("Last name");
                break;
            case "emal":
                setPlace("Email address");
                break;
            case "password":
                setPlace("password");
                break;
            case "password2":
                setPlace("reset password");
                break;
            default:
                setPlace(name);
                break;
        }
        setType(name.includes("password") ? "password" :
            name === "email" ? "email" : "text")
    }, [])
    if (name.includes("password")) {
        return (
            <div className='sign-pass-div'>
                <input
                    className="sign-input pass-input"
                    type={type}
                    value={value}
                    name={name}
                    onChange={onchange}
                    onBlur={onblur}
                    placeholder={placeholder}
                />
                <div className={`pass-show ${type === 'text' ? "noshow" : "show"}`}
                onClick={() => {
                    setType(type === "text" ? "password" : "text");
                }}
                >
                </div>
            </div>
        )
    }
    else return (
        <input
            className="sign-input"
            type={type}
            value={value}
            name={name}
            onChange={onchange}
            onBlur={onblur}
            placeholder={placeholder}
        />
    )
}

export default SignupInput;