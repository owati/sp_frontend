import "../css/modal.css";

function Modal({ show, children, direction, added}) {
    return show ? (
        <div className={"modal " + direction + " " + added}>
            {children}
        </div>
    ) : (
        <></>
    )
}

export default Modal;