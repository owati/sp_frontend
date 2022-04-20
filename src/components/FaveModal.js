import Modal from './Modal';
import '../css/modal.css';
import close from '../assets/close.png';
import shirt from '../assets/shirt.png';
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

                <div className='fave-modal-info'> 
                    <div className='fave-modal-info-1'>
                        <div style={{
                            width : "150px",
                            backgroundColor : "rgba(240, 240, 240, 1)",
                            borderRadius : "10px",
                            marginRight : "10px"
                        }}>
                            <img src={shirt} />
                        </div>
                        <div>
                            <h4 style={{margin : "3px 0px"}}>Galactic Ranger 2</h4>
                            <h5 style={{margin : "6px 0px"}}>Unisex Summer Shirt</h5>
                            <div style={{
                                display :"flex",
                                marginTop : "20px"
                            }}>
                                <div style={{
                                    marginRight : "30px"
                                }}>
                                    <h5 style={{margin : "3px 0px", color: "rgb(0,0,0,0.4)"}}>Color</h5>
                                    <div className='fave-color'>

                                    </div>
                                </div>
                                <div>
                                    <h5 style={{margin : "3px 0px", color: "rgb(0,0,0,0.4)"}} >Size</h5>
                                    <h5 style={{margin : "3px 0px"}} className='fave-size'>M</h5>
                                </div>
                            </div >
                        </div>
                    </div>
                    <h3 style= {{margin : "3px 0px" , width : "100%", textAlign:"end"}}>&#8358;20,000</h3>
                </div>

                <button className='fave-view grow shadow-5'>
                    View Favorites
                </button>

            </div>
        </Modal>
    )
}

export default FaveModal;