import Modal from './Modal';
import '../css/modal.css';
import close from '../assets/close.png';
import {ReactComponent as TickSvg} from '../assets/tick.svg'

function FaveModal({show=true, closed}) {
    
    return (
        <Modal show={show} direction="modal-top">
            <div className='fave-modal' data-aos="fade-down">
                <div style={{
                    display: "flex",
                    alignItems : "center",
                    justifyContent : "space-between",
                    borderBottom : "2px solid rgba(0,0,0,0.3)"
                    
                }}>
                    <div
                        style={{
                            display : "flex",
                            alignItems : "center"
                        }}
                    >
                    <TickSvg />
                    <h3 style={{
                        margin : "4px",
                        fontWeight : "1000",
                        fontStyle : "italic",
                        fontSize : "20px"
                    }}>Item added to Favorite</h3>
                    </div>
                    <img src={close} onClick={
                        () => {
                            closed();
                        }
                    }/>

                </div>

            </div>
        </Modal>
    )
}

export default FaveModal;