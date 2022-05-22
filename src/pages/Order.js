import { useState } from "react";
import shirt from '../assets/shirt.png'


function Order({ loading }) {
    const [orders, setOrders] = useState(true)

    return (
        <div>
            {
                orders ? <div style={{ display: "flex", padding: "20px" }}>
                    <div style={{ margin: "auto", width: "100%", maxWidth: "1000px" }}>
                        <h3 style={{ margin: "0px" }}>Total: 4</h3>

                        <div className="order-container">
                            <div className="order-div shadow-5 grow">
                                <div className="order-time">
                                    <h3 style={{ margin: "0px" }}>25</h3>
                                    <h3 style={{ margin: "0px", fontWeight : "bolder" }}>June</h3>
                                    <h5 style={{ margin: "0px" }}>2022</h5>
                                </div>
                                <div className="order-details">
                                    <h1 style={{ margin: 0 }}>#012391</h1>
                                    <h4 style={{ margin: 0 }}>5 Items</h4>
                                </div>
                                <div style={{
                                    display : "flex",
                                    flexDirection : "column",
                                    alignItems : "center"
                                }}>
                                    <h4 style={{ margin: 0 }}>Total</h4>
                                    <h2 style={{ margin: 0 }}>N90923</h2>
                                </div>
                                <div style={{
                                    display : "flex",
                                    justifyContent : "flex-end",
                                    alignItems : "center"
                                }}>
                                    <h5 style={{
                                        color : "orange",
                                        margin : 0
                                    }}>processing</h5>
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