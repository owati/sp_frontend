import { useState } from "react";


function Order({loading}) {
    const [orders, setOrders] = useState(null)
    
    return (
        <div>
            {
                orders ? <div>
                    </div> :
            <div style={{width : "100%", height : "400px", display : "flex" }}>
                <h1 style={{margin : "auto", color : "rgba(0,0,0,0.3)"}}>You currently have no orders</h1>
            </div>
            }
        </div>
    )
}


export default Order;