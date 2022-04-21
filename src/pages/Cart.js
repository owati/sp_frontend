import '../css/cart.css';
import shirt from '../assets/shirt.png'

function Cart() {
    return (
        <div style={{
            padding : "0px 20px"
        }}>
            <div className='cart-header'>
                <h1 style={{
                    margin : "3px",
                    fontStyle : "italic",
                    fontWeight : "1000",
                    width : "250px",
                    textAlign: "center",
                    borderBottom : "1px black solid"

                }}>My Cart</h1>
                <h3 style={{
                    margin : "0px",
                    position: "absolute",
                    right: " 0px"
                }}>Total: {10}</h3>
            </div>

            <div className='cart-info'>
                <div className='cart-details'>
                    <div style={{
                        display : "flex"
                    }}>
                        <div className='image-holder'>
                            <img src={shirt} alt="pic" />
                        </div>

                        <div className='cart-details-info'>
                            <h3>Galactic Rangers 2</h3>
                            <h5>unisex summer shirt</h5>
                            <h5>Color : black</h5>
                            
                        </div>

                    </div>

                </div>
                <div className='cart-checkout'>
                    <h1 style={{margin : "0px"}}>Summary</h1>

                    <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent : "space-between",
                        paddingRight : "30px",
                        paddingTop : "40px",
                        borderBottom: "2px solid rgba(0,0,0,0.4)"
                    }}>
                        <h3>Sub Total: </h3>
                        <h3>&#8358;10,000</h3>

                    </div>
                    <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent : "space-between",
                        paddingRight : "30px",
                        borderBottom: "2px solid rgba(0,0,0,0.4)"
                    }}>
                        <h3>Total: </h3>
                        <h3>&#8358;10,000</h3>

                    </div>

                    <div style={{
                        display : "flex",
                        justifyContent : "center",
                        paddingTop : "50px"
                    }}>
                        <button className='grow shadow-5'
                            style={{
                                width : "80%",
                                height : "47px",
                                backgroundColor : "black",
                                color : "white",
                                border: "none",
                                fontWeight : "bolder",
                                borderRadius : "5px"
                            }}
                        >Checkout</button>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default Cart;