import { useNavigate } from 'react-router';
import Modal from './Modal';
import '../css/modal.css';
import close from '../assets/close.png';
import shirt from '../assets/shirt.png';
import {ReactComponent as TickSvg} from '../assets/tick.svg'

function CartModal({show=true, closed, data, sku}) {
    const navigate = useNavigate()

    const sizeMap = {
        small : 'S',
        medium : 'M',
        large : 'L',
        xlarge : 'XL'
    }
    
    return (
        <Modal show={show} direction="modal-top">
            <div className='fave-modal' data-aos="fade-down" >
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
                    }}>Item added to Cart</h3>
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
                            marginRight : "10px",
                            height : '155px'
                        }}>
                            <img src={sku.images[0]} style={{objectFit : 'contain', height:'100%'}}/>
                        </div>
                        <div>
                            <h4 style={{margin : "3px 0px"}}>{sku?.name}</h4>
                            <h5 style={{margin : "6px 0px"}}>{sku?.headline}</h5>
                            <div style={{
                                display :"flex",
                                marginTop : "20px"
                            }}>
                                <div style={{
                                    marginRight : "30px"
                                }}>
                                    <h5 style={{margin : "3px 0px", color: "rgb(0,0,0,0.4)"}}>Color</h5>
                                    <div className='fave-color' style={{backgroundColor : data.color}}>

                                    </div>
                                </div>
                                <div style={{
                                    marginRight : "30px"
                                }}>
                                    <h5 style={{margin : "3px 0px", color: "rgb(0,0,0,0.4)"}} >Size</h5>
                                    <h5 style={{margin : "3px 0px"}} className='fave-size'>{sizeMap[data.size]}</h5>
                                </div>

                                <div>
                                    <h5 style={{margin : "3px 0px", color: "rgb(0,0,0,0.4)"}} >Quantity</h5>
                                    <h5 style={{margin : "3px 0px", backgroundColor :'white'}} className='fave-size'>{data.quantity}</h5>
                                </div>
                            </div >
                        </div>
                    </div>
                    <h3 style= {{margin : "3px 0px" , width : "100%", textAlign:"end"}}>&#8358;{sku?.price?.toLocaleString()}</h3>
                </div>
                <div style={{
                    display :"flex",
                    justifyContent : "space-between"
                }} >
                <button className='cart-view grow shadow-5' style={{
                    border : "1px solid black",
                    backgroundColor : "white",
                    color : "black"
                }} onClick={
                    () => navigate('/cart')
                }>
                    View Cart
                </button>
                <button className='cart-view grow shadow-5'
                    onClick={() => navigate('/checkout')}
                >
                    Checkout
                </button>

                </div>

            </div>
        </Modal>
    )
}

export default CartModal;