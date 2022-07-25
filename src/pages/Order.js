import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import shirt from '../assets/shirt.png'
import { NoModalLoading } from "../components/Loading";
import { getRequest } from "../functions/api";


const status = {
    placed : {name : 'new order', color : 'green'},
    process : {name : 'processing', color : 'orange'},
    delivery : {name : 'in transit', color : 'blue'},
    done : {name : 'completed', color : 'red'}
}


function Order({ loading }) {
    const [orders, setOrders] = useState(null)
    async function getOrders () {
        const res = await getRequest('orders/user');
        console.log(res)
        if (res?.status === 200) {
            setOrders(res.data.data.reverse())
        } else {
            toast.error('Erro while fetching the orders: ' + res?.data?.message || res?.message)
        }
    }

    useEffect(() => {
        getOrders();
    }, [])
    return orders ? (
        <div>
            {
                orders.length > 0 ? <div style={{ display: "flex", padding: "20px" }}>
                    <div style={{ margin: "auto", width: "100%", maxWidth: "1000px" }}>
                        <h3 style={{ margin: "0px" }}>Total: {orders.length}</h3>

                        {
                            orders.map(
                                order => {
                                    console.log(order);
                                    let totalCount = 0
                                    order.order_list.forEach(item => {totalCount += item.data.quantity});

                                    const date_list = new Date(order.date_created).toDateString().split(' ');
                                    
                                    const current_status = status[order.status[order.status.length - 1].status]
                                    
                                    return <div className="order-container">
                                        <div className="order-div shadow-5 grow">
                                            <div className="order-time">
                                                <h3 style={{ margin: "0px" }}>{date_list[2]}</h3>
                                                <h3 style={{ margin: "0px", fontWeight : "bolder" }}>{date_list[1]}</h3>
                                                <h5 style={{ margin: "0px" }}>{date_list[3]}</h5>
                                            </div>
                                            <div className="order-details">
                                                <h1 style={{ margin: 0 }}>#{order._id.slice(15)}</h1>
                                                <h4 style={{ margin: 0 }}>{totalCount} Items</h4>
                                            </div>
                                            <div style={{
                                                display : "flex",
                                                flexDirection : "column",
                                                alignItems : "center"
                                            }}>
                                                <h4 style={{ margin: 0 }}>Total</h4>
                                                <h2 style={{ margin: 0 }}>&#8358;{order.finalCost.toLocaleString()}</h2>
                                            </div>
                                            <div style={{
                                                display : "flex",
                                                justifyContent : "flex-end",
                                                alignItems : "center"
                                            }}>
                                                <h5 style={{
                                                    color : current_status.color,
                                                    margin : 0
                                                }}>{current_status.name}</h5>
                                            </div>
            
                                        </div>
                                    </div>

                                }    
                            )        
                        }


                    </div>

                </div> :
                    <div style={{ width: "100%", height: "400px", display: "flex" }}>
                        <h1 style={{ margin: "auto", color: "rgba(0,0,0,0.3)" }}>You currently have no orders</h1>
                    </div>
            }
        </div>
    ) : (
        <div style={{
            height: '70vh'
        }}>
            <NoModalLoading />
        </div>
    )
}


export default Order;