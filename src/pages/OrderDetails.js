import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useMatch } from 'react-router-dom'
import { ReactComponent as Status } from '../assets/status.svg'
import shirt from '../assets/shirt.png';
import goback from '../assets/goback.png';
import { getRequest } from '../functions/api';
import { NoModalLoading } from '../components/Loading';

function OrderDetails() {
    const params = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    async function getOrder() {
        const res = await getRequest('orders/user?id=' + params.orderId);
        if (res?.status === 200) {
            setOrder(res.data.data);
        } else {
            // handle the error
        }
    }

    useEffect(
        () => {
            getOrder()
        }, []
    )

    const sizeMap = {
        small: 'S',
        medium: 'M',
        large: 'L',
        xlarge: 'XL'
    }
    const quantity = useMemo(
        () => {
            if (order) {
                let totalCount = 0;
                console.log(order.order_list, order)
                order.order_list.forEach(item => { totalCount += item.data.quantity });

                return totalCount;
            } return 0
        }, [order]
    )


    return order ? (
        <div className='order-details-main'>
            <div className='order-details-header'>
                <button className='order-details-back grow'
                    onClick={
                        () => {
                            navigate('../Orders')
                        }
                    }>
                    <img src={goback} />
                </button>
                <h1 style={{ margin: 0 }}>Order #{params.orderId}</h1>
                <h5 style={{ margin: 0 }}>Total: {quantity}</h5>
            </div>
            <OrderStatus status={order.status} />


            <div>

                {
                    order.order_list.map(
                        item => {
                            const { sku, data } = item

                            return (
                                <div className='order-detail-div'>
                                    <div className='order-image flex'>
                                        <img style={{ margin: 'auto' }} src={sku.images[0]} />
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0 }}> {sku.name} </h2>
                                        <h4 >{sku.headline} </h4>

                                        <div style={{ display: "flex", color: 'rgba(0,0,0,0.4)' }}>
                                            <h5>Color: <span style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: data.color,
                                                color: data.color,
                                            }}>.....</span></h5>
                                            <h5 style={{ paddingLeft: "30px" }}>Size: {sizeMap[data.size]}</h5>
                                            <h5 style={{ paddingLeft: "30px" }}> Quantity : {data.quantity}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    ) : (
        <div style={{ height: '70vh' }}>
            <NoModalLoading />
        </div>
    )
}

export default OrderDetails;

function OrderStatus({ status }) {
    const status_map = {
        placed : 'placed',
        process : 'in progress', 
        delivery : 'in transit', 
        done : 'delivered'
    }
    const status_array = useMemo(
        () => {
            const array = []
            for (let i = 0; i < 4; i++) {
                const stat = status[i]
                array.push(
                    <div className='order-status-div'>
                        {
                            stat ? 
                            <Status style={{ margin: 'auto' }} />
                            : <div style={{
                                margin : 'auto',
                                width : '36px',
                                height : '36px',
                                borderRadius : '36px', 
                                backgroundColor : 'rgb(93, 95, 239)'
                            }}>
                            </div>
                        }
                        <h5 style={{ margin: "4px" }}>{stat ? status_map[stat.status] : Object.values(status_map)[i]}</h5>
                        <h5 style={{ margin: "4px" , whiteSpace : 'nowrap'}}>{ stat ? new Date(stat.date).toLocaleDateString() : '--/--/--'}</h5>
                    </div>
                )
            }

            return array
        }, [status]
    )
    return (
        <div style={{ marginTop: "30px" }}>
            <div className='order-status-line'>
            </div>
            <div className='order-status'>
                {status_array}
                {/* <div className='order-status-div'>
                    <Status style={{ margin: 'auto' }} />
                    <h5 style={{ margin: "4px" }}>placed</h5>
                    <h5 style={{ margin: "4px" }}>llas</h5>
                </div>
                <div className='order-status-div'>
                    <Status style={{ margin: 'auto' }} className='order-stats' />
                    <h5 style={{ margin: "4px" }}>in progress</h5>
                    <h5 style={{ margin: "4px" }}>2/22/2002</h5>
                </div>
                <div className='order-status-div' >
                    <Status style={{ margin: 'auto' }} className='order-stats' />
                    <h5 style={{ margin: "4px" }}>on transit</h5>
                    <h5 style={{ margin: "4px" }}>2/22/2002</h5>
                </div>
                <div className='order-status-div'>
                    <Status style={{ margin: 'auto' }} className='order-stats' />
                    <h5 style={{ margin: "4px" }}>delivered</h5>
                    <h5 style={{ margin: "4px" }}>2/22/2002</h5>
                </div> */}
            </div>
        </div>
    )
}