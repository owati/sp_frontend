import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getRequest } from '../functions/api';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { AddCardInput } from './PaymentInfo';
import { ReactComponent as Cart } from '../assets/checkout.svg';
import shirt from '../assets/shirt.png';
import '../css/checkout.css';
import { NoModalLoading } from '../components/Loading';

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.items);
    const user = useSelector(state => state.user.info);

    const [productsList, setProducts] = useState(null);

    const [checkoutData, setChekoutData] = useState({
        delivery: true,
        user_id : null,
        customer : {
            first_name : '',
            last_name : '',
            email : '', 
            phone : ''
        },
        shipping : {
            address : '',
            zip_code : '',
            city : '', 
        }
    })

    const {
        delivery,
        payment_method
    } = checkoutData;

    function setDelivery(value) {
        setChekoutData({
            ...checkoutData,
            delivery: value
        })
    }

    function setPayemtMethod(value) {
        setChekoutData({
            ...checkoutData,
            payment_method: value
        })
    }

    async function getProducts() {
        if (cart.length) {
            const res = await getRequest(
                `sku/units/some?list=${JSON.stringify(cart.map(_cart => _cart.id))}`
            );

            if (res?.status === 200) {
                const products = res.data.data
                const newCartList = [];
                for (const item of cart) {
                    const [prod_data] = products.filter(prod => prod._id === item.id);
                    if (prod_data.availability) {
                        newCartList.push({
                            ...item,
                            sku: prod_data
                        })
                    }
                }

                if (newCartList.length < cart.length) toast.info('The unavailable products are not included')

                setProducts(newCartList)
            }
        }
    }

    useEffect(
        () => {
            getProducts()
        }, [cart]
    )

    const sizeMap = {
        small : 'S',
        medium : 'M',
        large : 'L',
        xlarge : 'XL'
    }

    const totalCost = useMemo(
        () => {
            let total = 0;
            if (productsList?.length) {
                for(const item of productsList) {
                    const cost = item.data.quantity * item.sku.price;
                    total += cost;
                }
            }

            return total
        },[productsList]
    )

    return productsList ? (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Cart /> <h1 style={{ margin: 0, paddingLeft: '20px', fontSize: '35px' }}>CHECKOUT</h1>
            </header>
            {
                productsList.length ?
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
                                        <input type='radio' name='delivery' checked={delivery} onClick={() => console.log(delivery)} />
                                    </div>

                                    <div className={'checkout-delivery' + (!delivery ? ' selected' : '')}>
                                        <h4 style={{ margin: 0 }}>Pick up</h4>
                                        <input type='radio' name='delivery' checked={!delivery} onClick={() => console.log(delivery)} />
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

                                    <h4 style={{ gridColumn: '1 / -1', margin: 0 }}>Select the payment method: </h4>
                                    <Select
                                        options={[
                                            { label: 'Use default card', value: 'card' },
                                            { label: 'Use another card ', value: 'nocard' }
                                        ]}
                                        onChange={
                                            e => {
                                                setPayemtMethod(e.value)
                                            }
                                        }
                                        styles={{ height: '100%' }}
                                        defaultValue={{
                                            label: 'Use default card', value: 'card'
                                        }}
                                    />
                                    <p style={{ gridColumn: '1/ -1 ' }}>
                                        Payment
                                    </p>


                                </div>
                            </div>

                        </div>
                        <div className='checkout-payment'>
                            <div className='checkout-payment-main shadow-5'>
                                <h3>Order Checkout</h3>

                                {
                                    productsList.map(
                                        product => {
                                            const {sku, data} = product

                                            const cost = sku.price * data.quantity
                                            return (
                                                <div className='checkout-sku'>
                                                    <div className='checkout-sku-img'>
                                                        <img style={{ margin: 'auto' }} src={sku.images[0]} alt='shirt' />
                                                    </div>
                                                    <div className='checkout-sku-details'>
                                                        <h3 style={{ margin: '3px' }}>{sku.name}</h3>
                                                        <h5 style={{ margin: '3px', color: 'rgba(0,0,0,0.3)' }}>Color : <span style={{
                                                            width : '20px',
                                                            height : '20px',
                                                            backgroundColor : data.color,
                                                            color : data.color,
                                                        }}>.....</span></h5>
                                                        <h5 style={{ margin: '3px', color: 'rgba(0,0,0,0.3)' }}>Size : {sizeMap[sku.size]}</h5>
                                                        <h5 style={{ margin: '3px', color: 'rgba(0,0,0,0.3)' }}>{data.quantity} Unit{data.quantity === 1 ? '' : 's'}</h5>
                                                        <h3 style={{ margin: '3px' }}>&#8358;{cost.toLocaleString()}</h3>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }

                                <AddCardInput label='discount code' label_style={{ backgroundColor: 'white' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Sub Total:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;{totalCost.toLocaleString()}</h4>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Shipping Cost:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;22,000</h4>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Shipping Cost:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;22,000</h4>
                                </div>
                                <div style={{ width: '100%', borderBottom: '1px solid black' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Total:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;22,000</h4>
                                </div>

                                <button className='grow shadow-5' style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderRadius: '5px',
                                    border: 'none',
                                    width: '100%',
                                    height: '60px',
                                    marginTop: '20px',
                                    fontSize: '32px',
                                    fontWeight: 'bolder'
                                }}>
                                    Checkout
                                </button>

                            </div>

                        </div>

                    </div> : <></>
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

export default Checkout;