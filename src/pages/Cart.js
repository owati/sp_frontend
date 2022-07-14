import { useState } from 'react';
import '../css/cart.css';
import shirt from '../assets/shirt.png'
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import NumberInput from '../components/inputs/NumberInput';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import CartChangeModal from '../components/CartChangeModal';

function Cart() {
    const [showChange, setShow] = useState(false)

    return (
        <div style={{
            padding: "0px 20px"
        }}>
            <div className='cart-header'>
                <h1 style={{
                    margin: "3px",
                    fontStyle: "italic",
                    fontWeight: "1000",
                    width: "250px",
                    textAlign: "center",
                    borderBottom: "1px black solid"

                }}>My Cart</h1>
                <h3 style={{
                    margin: "0px",
                    position: "absolute",
                    right: " 0px"
                }} className="none-mobile">Total: {10}</h3>
            </div>

            <div className='cart-info'>
                <div className='cart-details'>
                    <div>
                        <div style={{
                            display: "flex",
                            height: "fit-content",
                            justifyContent: "space-between",
                            borderBottom: '1px solid black',
                            marginBottom: "40px"
                        }}>
                            <div className='image-holder'>
                                <img src={shirt} alt="pic" />
                            </div>

                            <div className='cart-details-info'>
                                <h3 style={{ margin: "0px" }}>Galactic Rangers 2</h3>
                                <h5>unisex summer shirt</h5>
                                <h5>Color : black</h5>
                                <h5>Size : M</h5>
                                <h5 className='invert-none' style={
                                    {
                                        marginTop: "7px",
                                        color: "black",
                                    }
                                }>&#8358;10,000</h5>
                                <h5 className='invert-none' style={{
                                    marginTop : "7px"
                                }}
                                >Quantity : 1</h5>



                                <button style={{
                                    display: "flex",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    alignItems: "center",
                                    position: "absolute",
                                    bottom: "0px"
                                }} onClick = {
                                    () => {
                                        setShow(true)
                                    }
                                }>
                                    <Edit />
                                    <h5 style={{
                                        margin: "0px",

                                    }}>Edit details</h5>
                                </button>

                                <button  className="cart-del" style={{
                                    border: "none",
                                    backgroundColor: "transparent"
                                }}>
                                    <Delete />
                                </button>
                            </div>

                            <div className='cart-details-info-2 none-mobile'>
                                <h3 style={{
                                    margin: "0px"
                                }}>&#8358;10,000</h3>
                                <div style={{
                                    width: "100px"
                                }}>
                                    <NumberInput onChange={() => {}}/>
                                </div>

                                <button style={{
                                    border: "none",
                                    backgroundColor: "transparent"
                                }}>
                                    <Delete />
                                </button>
                            </div>

                        </div>

                    </div>
                    
                </div>
                <div className='cart-checkout'>
                    <h1 style={{ margin: "0px" }}>Summary</h1>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                        paddingTop: "40px",
                        borderBottom: "2px solid rgba(0,0,0,0.4)"
                    }}>
                        <h3>Sub Total: </h3>
                        <h3>&#8358;10,000</h3>

                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: "30px",
                        borderBottom: "2px solid rgba(0,0,0,0.4)"
                    }}>
                        <h3>Total: </h3>
                        <h3>&#8358;10,000</h3>

                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "50px"
                    }}>
                        <button className='grow shadow-5'
                            style={{
                                width: "80%",
                                height: "47px",
                                backgroundColor: "black",
                                color: "white",
                                border: "none",
                                fontWeight: "bolder",
                                borderRadius: "5px"
                            }}
                        >Checkout</button>

                    </div>


                </div>

            </div>

            <SkuCardList title="You might also like">
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
            </SkuCardList>

            <CartChangeModal show={showChange} closed={
                ()=> {
                    setShow(false)
                }
            }/>

        </div>
    )
}

export default Cart;