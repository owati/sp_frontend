import { AddCardInput } from './PaymentInfo';
import { ReactComponent as Cart } from '../assets/checkout.svg';
import '../css/checkout.css';
import { useState } from 'react';

function Checkout() {
    const [delivery, setDelivery] = useState(true)
    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Cart /> <h1 style={{ margin: 0, paddingLeft: '20px', fontSize: '35px' }}>CHECKOUT</h1>
            </header>

            <div className='checkout-main'>
                <div className='checkout-info'>
                    <div className='checkout-data'>
                        <div>
                            <div className='shadow-5' style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '20px',
                                border: '4px solid white',
                                backgroundColor: 'black',
                                color: 'white',
                                display: 'flex',
                            }}>
                                <h4 style={{ margin: 'auto' }}>1</h4>
                            </div>
                            <h5 style={{ margin: 0 }}>PERSONAL DETAILS</h5>
                        </div>
                        <div className='checkout-person'>
                            <AddCardInput label_style={{ backgroundColor: 'white' }} label='First name' />
                            <AddCardInput label_style={{ backgroundColor: 'white' }} label='Last name' />
                            <AddCardInput label_style={{ backgroundColor: 'white' }} label='Email' />
                            <AddCardInput label_style={{ backgroundColor: 'white' }} label='Phone no' />
                        </div>

                    </div>
                    <div className='checkout-data'>
                        <div>
                            <div className='shadow-5' style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '20px',
                                border: '4px solid white',
                                backgroundColor: 'black',
                                color: 'white',
                                display: 'flex',
                            }}>
                                <h4 style={{ margin: 'auto' }}>2</h4>
                            </div>
                            <h5 style={{ margin: 0 }}>SHIPPING DETAILS</h5>
                        </div>
                        <div className='checkout-address'>
                            <h4 style={{ margin: 0, gridColumn: '1 / -1' }}>Shipping Address</h4>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <AddCardInput label='Street address' label_style={{ backgroundColor: 'white' }} />
                            </div>
                            <AddCardInput label='Zip Code' label_style={{ backgroundColor: 'white' }} />
                            <AddCardInput label='City' label_style={{ backgroundColor: 'white' }} />
                            <AddCardInput label='Country' label_style={{ backgroundColor: 'white' }} />

                            <h4 style={{ margin: 0, gridColumn: '1/-1' }}> Shipping Method</h4>

                            <div className={'checkout-delivery' + (delivery ? ' selected' : '')}>
                                <h4 style={{ margin: 0 }}>Door delivery</h4>
                                <input type='radio' name='delivery'  checked={delivery} onClick={() => setDelivery(true)}/>
                            </div>

                            <div className={'checkout-delivery' + (!delivery ? ' selected' : '')}>
                                <h4 style={{ margin: 0 }}>Pick up</h4>
                                <input type='radio' name='delivery' checked={!delivery} onClick={() => setDelivery(false)}/>
                            </div>


                        </div>

                    </div>
                    <div className='checkout-data'>
                        <div>
                            <div className='shadow-5' style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '20px',
                                border: '4px solid white',
                                backgroundColor: 'black',
                                color: 'white',
                                display: 'flex',
                            }}>
                                <h4 style={{ margin: 'auto' }}>3</h4>
                            </div>
                            <h5 style={{ margin: 0 }}>PAYMENT METHOD</h5>
                        </div>
                        <div className='checkout-form'>
                            
                        </div>

                    </div>

                </div>
                <div className='checkout-payment'>

                </div>

            </div>

        </div>
    )
}

export default Checkout;