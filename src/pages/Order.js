import { useState } from "react";
import shirt from '../assets/shirt.png'


function Order({ loading }) {
    const [orders, setOrders] = useState(true)

    return (
        <div>
            {
                orders ? <div style={{display : "flex", padding : "20px"}}>
                    <div style={{margin : "auto", width : "100%", maxWidth: "1000px"}}>
                        <h3 style={{margin : "0px"}}>Total: 4</h3>
                        
                        <div className="order-container">
                            <div className="order-div shadow-5 grow">
                                <div className="order-time">
                                    <h3 style={{margin : "0px"}}>25</h3>
                                    <h4 style={{margin : "0px"}}>June</h4>
                                    <h5 style={{margin : "0px"}}>2022</h5>
                                </div>
                                <div className="order-details">
                                    <h1>#012391</h1>
                                    <h4>5 Items</h4>
                                </div>
                                <div>
                                <h4>Total</h4>
                                <h3>N90923</h3>
                                </div>
                                <div>
                                    <h5>processing</h5>
                                </div>
                                
                            </div>
                        </div>


                    </div>

                </div> :
                    <div style={{ width: "100%", height: "400px", display: "flex" }}>
                        <h1 style={{ margin: "auto", color: "rgba(0,0,0,0.3)" }}>You currently have no orders</h1>
                    </div>
            }
        </div>
    )
}


export default Order;