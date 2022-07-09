import { useState } from 'react';
import Select from 'react-select';
import { AddCardInput } from './PaymentInfo';
import { ReactComponent as Cart } from '../assets/checkout.svg';
import shirt from '../assets/shirt.png';
import '../css/checkout.css';

function Checkout() {
    const [checkoutData, setChekoutData] = useState({
        delivery : true,
        payment_method : 'paystack'
    })

    const {
        delivery,
        payment_method
    } = 
    
    function setDelivery(value) {
        setChekoutData({
            ...checkoutData,
            delivery : value
        })
    }

    function setPayemtMethod(value) {
        setChekoutData({
            ...checkoutData,
            payment_method : value
        })
    }

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
                                <input type='radio' name='delivery'  checked={delivery} onClick={() => console.log(delivery)}/>
                            </div>

                            <div className={'checkout-delivery' + (!delivery ? ' selected' : '')}>
                                <h4 style={{ margin: 0 }}>Pick up</h4>
                                <input type='radio' name='delivery' checked={!delivery} onClick={() =>  console.log(delivery)}/>
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
                        <div className='checkout-person'>
                            
                            <h4 style={{gridColumn : '1 / -1', margin : 0}}>Select the payment method: </h4>
                            <Select 
                            options={[
                                {label : 'Use default card', value : 'card'},
                                {label : 'Use another card ', value : 'nocard'}
                            ]}
                            onChange={
                                e => {
                                    setPayemtMethod(e.value)
                                }
                            }
                            styles={{height : '100%'}}
                            defaultValue={{
                                label : 'Use default card', value : 'card'
                            }}
                            />
                            <p style={{gridColumn : '1/ -1 ' }}>
                                Payment 
                            </p>
                            
                            
                        </div>
                    </div>

                </div>
                <div className='checkout-payment'>
                    <div className='checkout-payment-main shadow-5'>
                        <h3>Order Checkout</h3>

                        <div className='checkout-sku'>
                            <div className='checkout-sku-img'>
                                <img style={{margin : 'auto'}} src={shirt} alt='shirt'/>
                            </div>
                            <div className='checkout-sku-details'>
                                <h3 style={{margin : '3px'}}>Galactic ranger</h3>
                                <h3 style={{margin : '3px' , color : 'rgba(0,0,0,0.3)'}}>Color : black</h3>
                                <h3 style={{margin : '3px' , color : 'rgba(0,0,0,0.3)'}}>Size : M</h3>
                                <h3 style={{margin : '3px' , color : 'rgba(0,0,0,0.3)'}}>3 Units</h3>
                                <h3 style={{margin : '3px'}}>N19,000</h3>
                            </div>
                        </div>

                        <AddCardInput label='discount code' label_style={{backgroundColor : 'white'}}/>

                        <div style={{display : 'flex', justifyContent : 'space-between', width : '100%'}}>
                            <h4 style={{margin : '8px' , color : 'rgba(0,0,0,0.3)'}}>Shipping Cost:</h4>
                            <h4 style={{margin : '8px'}}>22,000</h4>
                        </div>
                        <div style={{display : 'flex', justifyContent : 'space-between', width : '100%'}}>
                            <h4 style={{margin : '8px' , color : 'rgba(0,0,0,0.3)'}}>Shipping Cost:</h4>
                            <h4 style={{margin : '8px'}}>22,000</h4>
                        </div>
                        <div style={{display : 'flex', justifyContent : 'space-between', width : '100%'}}>
                            <h4 style={{margin : '8px' , color : 'rgba(0,0,0,0.3)'}}>Shipping Cost:</h4>
                            <h4 style={{margin : '8px'}}>22,000</h4>
                        </div>
                        <div style={{width : '100%', borderBottom : '1px solid black'}}></div>
                        <div style={{display : 'flex', justifyContent : 'space-between', width : '100%'}}>
                            <h4 style={{margin : '8px' , color : 'rgba(0,0,0,0.3)'}}>Shipping Cost:</h4>
                            <h4 style={{margin : '8px'}}>22,000</h4>
                        </div>

                        <button className='grow shadow-5' style={{
                            backgroundColor : 'black',
                            color : 'white',
                            borderRadius : '5px',
                            border : 'none',
                            width : '100%',
                            height : '60px',
                            marginTop : '20px',
                            fontSize : '32px',
                            fontWeight : 'bolder'
                        }}>
                            Checkout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Checkout;