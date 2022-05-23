import {useParams} from 'react-router-dom'
import {ReactComponent as Status} from '../assets/status.svg'
import shirt from '../assets/shirt.png';

function OrderDetails() {
    return (
        <div className='order-details-main'>
            <h5>Total: 5</h5>
            <OrderStatus />

            <div>
                <div className='order-detail-div'>
                    <div className='order-image'>
                    <img  src={shirt} />
                    </div>
                    <div>
                        <h2 style={{margin : 0}}>Galactic Ranger 2 </h2>
                        <h4 >Unisex T-shirt </h4>

                        <div style={{display : "flex", color : 'rgba(0,0,0,0.4)'}}> 
                            <h5>Color: black</h5>
                            <h5 style={{paddingLeft : "30px"}}>Size: M</h5>
                            <h5 style={{paddingLeft : "30px"}}> Quantity : 3</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails;

function OrderStatus ({status}) {
    return(
        <div style={{marginTop : "30px"}}>
            <div className='order-status-line'>
            </div>
            <div className='order-status'>
                <div className='order-status-div'>
                    <Status style={{margin : 'auto'}}/>
                    <h5 style={{margin : "4px"}}>placed</h5>
                    <h5 style={{margin : "4px"}}>2/22/2002</h5>
                </div>
                <div className='order-status-div'>
                    <Status  style={{margin : 'auto'}} className='order-stats'/>
                    <h5 style={{margin : "4px"}}>in progress</h5>
                    <h5 style={{margin : "4px"}}>2/22/2002</h5>
                </div>
                <div className='order-status-div' >
                    <Status   style={{margin : 'auto'}} className='order-stats'/>
                    <h5 style={{margin : "4px"}}>on transit</h5>
                    <h5 style={{margin : "4px"}}>2/22/2002</h5>
                </div>
                <div className='order-status-div'>
                    <Status  style={{margin : 'auto'}} className='order-stats'/>
                    <h5 style={{margin : "4px"}}>delivered</h5>
                    <h5 style={{margin : "4px"}}>2/22/2002</h5>
                </div>
            </div>
        </div>
    )
}