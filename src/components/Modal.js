import "../css/modal.css";

function Modal({ show, children }) {
    return show ? (
        <div className="modal">
            {children}
        </div>
    ) : (
        <></>
    )
}

export default Modal;