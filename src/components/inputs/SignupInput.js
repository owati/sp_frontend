
function SignupInput ({ type, value, name, onchange, onblur, placeholder}) {
    return( 
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