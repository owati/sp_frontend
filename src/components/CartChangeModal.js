import Modal from './Modal';
import '../css/modal.css';
import close from '../assets/close.png';
import shirt from '../assets/shirt.png';
import NumberInput from './inputs/NumberInput';

function CartChangeModal({ show, closed }) {
    const data = {
        name: "Galactic Ranger 2",
        category: {
            detail: "Unisex Summer Shirt"
        },

        description: "This is very good trouser of high quality which will be able to blend in with an environment colour. You are surely going to feel like a king if this is purchased. Place your order now and dont miss out on this opportunity.",
        price: 10000,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        review : 3
    }
    return (
        <Modal show={show} direction="modal-top">
            <div className='cart-modal' data-aos="fade-down" >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height : "0px"
                }}>
                    <img src={close} onClick={
                        () => {
                            closed();
                        }
                    } />
                </div>

                <div className='cart-modal-info'>
                    <div style={{
                        width: "300px",
                        backgroundColor: "rgba(240, 240, 240, 1)",
                        borderRadius: "10px",
                        marginRight: "10px"
                    }} className="cart-modal-info-2">
                        <img src={shirt} />
                    </div>
                    <div className='cart-modal-info-1'>
                        <h4 style={{ margin: "3px 0px" }}>Galactic Ranger 2</h4>
                        <h5 style={{ margin: "6px 0px" }}>Unisex Summer Shirt</h5>
                        <h5>Please select a size</h5>

                        <div >
                            {
                                data.sizes.map(
                                    size => {
                                        return <button id={size} className="product-size-butt">{size}</button>
                                    }
                                )
                            }
                        </div>

                        <div style={{
                            display: "flex",

                        }}>
                            <div style={{
                                marginRight: "50px"
                            }}>
                                <h4>Colors:</h4>
                                <div>
                                    <button className='product-size-butt'></button>
                                    <button className='product-size-butt'></button>
                                </div>
                            </div>
                            <div style={{
                                width: "30%"
                            }}>
                                <h4>Qty</h4>
                                <NumberInput />
                            </div>
                        </div>
                        <button className='cart-button grow' style={{
                            width : '100%'
                        }}
                         onClick={
                             () => {
                                 closed()
                             }
                         }>
                            UPDATE
                        </button>
                    
                    </div>

                </div>

            </div>
        </Modal>
    )

}

export default CartChangeModal;