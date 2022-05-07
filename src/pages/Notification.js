
import {ReactComponent as PackageSkg} from '../assets/package.svg';
import {ReactComponent as ShippedSkg} from '../assets/shipped.svg';
import {ReactComponent as TimeSvg} from '../assets/time.svg';

function Notification() {
    return  (
        <div className="notify-main">
            <Notify />

        </div>
    )
}

export default Notification;


function Notify () {
    const data = {
        type : "stock",
        title : "Your order has been confirmed",
        body  : "The order of number 120230123 has been confirmed"
    }

    const selectTypeIcon = {
        stock : <PackageSkg />,
        shipped : <ShippedSkg />
    }

    return (
        <div className="notify-div" >
            <div style={{
                paddingRight : "20px"
            }}>
                {selectTypeIcon[data.type]}
            </div>

            <div className='notify-details'>
                <div>
                    <h3>
                        Back in stock
                    </h3>
                    <h5>
                        4 min ago
                    </h5>
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}