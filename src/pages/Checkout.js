import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getRequest, postRequest } from '../functions/api';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { AddCardInput, AddCardSelect } from './PaymentInfo';
import { ReactComponent as Cart } from '../assets/checkout.svg';
import { getStates } from '../functions/api';
import shirt from '../assets/shirt.png';
import '../css/checkout.css';
import { NoModalLoading } from '../components/Loading';

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.items);
    const user = useSelector(state => state.user.info);

    const [productsList, setProducts] = useState(null);

    const [states, setStates] = useState([]);

    const [discountCode, setDiscountCode] = useState('')
    const [discountData, setDiscountData] = useState(null)

    async function getDiscountData() {
        if(discountCode) {
            const res = await postRequest('discount/use', {code : discountCode});
            if (res?.status === 200) {
                setDiscountData(res.data.data)
            } else {
                if (res?.status === 404) toast.error('The discount is invalid')
                else toast.error(res?.data?.message)
            }
        } else {
            toast.error('Fill add the discount code')
        }
    }

    async function fetchStates(country='Nigeria') {
        const res = await getStates();
        if(Array.isArray(res)) {
            setStates(res)
        }
    }

    const [checkoutData, setChekoutData] = useState({
        delivery: true,
        user_id : null,
        customer : {
            first_name : '',
            last_name : '',
            email : '', 
            phone_no : ''
        },
        shipping : {
            address : '',
            zip_code : '',
            city : '',
            country : ''
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
                            sku: prod_data,
                            discount_price : 0
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
                    const cost = item.data.quantity * (item.discount_price || item.sku.price);
                    total += cost;
                }
            }

            return total
        },[productsList]
    )

    const shippingCost = useMemo(
        () => {
            return delivery ? 2000 : 0
        }, [delivery]
    )

    const finalCost = useMemo(
        () => {
            return totalCost + shippingCost
        }, [shippingCost, totalCost]
    )

    function editCustomerData(field, value) {
        setChekoutData({
            ...checkoutData,
            customer : {
                ...checkoutData.customer,
                [field] : value
            }
        })
    }

    function editShippingData(field, value) {
        setChekoutData({
            ...checkoutData,
            shipping : {
                ...checkoutData.shipping,
                [field] : value
            }
        })
    }

    useEffect( () => {
        if (user) {
            const address = user.address.filter(addr => addr.default)[0]
            setChekoutData({
                ...checkoutData,
                user_id : user._id,
                customer : {
                    first_name : user.first_name,
                    last_name : user.last_name,
                    email : user.email,
                    phone_no : user.phone_no
                },
                shipping : {
                    ...checkoutData.shipping,
                    address : address.address,
                    country : address.country,
                    city : address.state
                }
            })
        }
    }, [user])

    useEffect(() => {
        if (productsList?.length) {
            const {value, list, is_all, fixed } = discountData
            const newProductList = productsList;

            for (let i = 0; i < newProductList.length; i++) {
                if (is_all || list.includes(newProductList[i].sku._id)) {
                    newProductList[i].discount_price =  fixed ? 
                    newProductList[i].sku.price - value : newProductList[i].sku.price * ((100 - value)/ 100)
                }
            }
            setProducts([...newProductList]);
            toast.success('The discount has taken effect.' + (is_all ? '' : 'Note this discount is only for specific products'))
        }
    }, [discountData])



    useEffect(() => {fetchStates()},[])

    const {first_name, last_name, email, phone_no} = checkoutData.customer;
    const {address, zip_code, city, country} = checkoutData.shipping;

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
                                    <AddCardInput label_style={{ backgroundColor: 'white' }} value={first_name} onChange={e => editCustomerData('first_name', e.target.value)} label='First name' />
                                    <AddCardInput label_style={{ backgroundColor: 'white' }} value={last_name} onChange={e => editCustomerData('last_name', e.target.value)} label='Last name' />
                                    <AddCardInput label_style={{ backgroundColor: 'white' }} value={email} onChange={e => editCustomerData('email', e.target.value)} label='Email' />
                                    <AddCardInput label_style={{ backgroundColor: 'white' }} value={phone_no} onChange={e => editCustomerData('phone_no', e.target.value)} label='Phone no' />
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
                                        <AddCardInput label='Street address' value={address} label_style={{ backgroundColor: 'white' }} 
                                        onChange={e => editShippingData('address', e.target.value)}/>
                                    </div>
                                    <AddCardInput label='Zip Code' label_style={{ backgroundColor: 'white' }} value={zip_code}
                                    onChange={e => editShippingData('zip_code', e.target.value)}/>

                                    <AddCardSelect label='City' label_style={{ backgroundColor: 'white' }} 
                                    options={states} value={{label : city, value : city}} onChange={e => editShippingData('city', e.value)}/>

                                    <AddCardSelect label='Country' label_style={{ backgroundColor: 'white' }} 
                                    options={[{label : 'Nigeria', value : 'Nigeria'}]} value={{label : country, value : country}} onChange={e => editShippingData('country', e.value)}/>
                                

                                    <h4 style={{ margin: 0, gridColumn: '1/-1' }}> Shipping Method</h4>

                                    <div className={'checkout-delivery' + (delivery ? ' selected' : '')}>
                                        <h4 style={{ margin: 0 }}>Door delivery</h4>
                                        <input type='radio' name='delivery' checked={delivery} onClick={() => setDelivery(true)} />
                                    </div>

                                    <div className={'checkout-delivery' + (!delivery ? ' selected' : '')}>
                                        <h4 style={{ margin: 0 }}>Pick up</h4>
                                        <input type='radio' name='delivery' checked={!delivery} onClick={() => setDelivery(false)} />
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
                                            const {sku, data, discount_price} = product

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
                                                        {
                                                            discount_price ? 
                                                            <h3 style={{ margin: '3px', color : 'green' }}>&#8358;{(
                                                                () => {
                                                                    const discount_cost = discount_price * data.quantity;
                                                                    return discount_cost.toLocaleString()
                                                                }
                                                            )()}</h3> :<></>
                                                            
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }

                                <div style={{display : 'flex', width : '100%'}}>
                                    <AddCardInput label='discount code' label_style={{ backgroundColor: 'white' }}
                                    value={discountCode} onChange={e => setDiscountCode(e.target.value)} />

                                    <button style={{
                                        backgroundColor : "black",
                                        color : 'white',
                                        borderRadius: '5px',
                                        padding: '0px 15px',
                                        marginLeft : '20px'
                                    }} onClick = {
                                        () => {
                                            getDiscountData()
                                        }
                                    }>Apply</button>
                                </div>


                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Sub Total:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;{totalCost.toLocaleString()}</h4>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Shipping Cost:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;{shippingCost.toLocaleString()}</h4>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Discount:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;</h4>
                                </div>
                                <div style={{ width: '100%', borderBottom: '1px solid black' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <h4 style={{ margin: '8px', color: 'rgba(0,0,0,0.3)' }}>Total:</h4>
                                    <h4 style={{ margin: '8px' }}>&#8358;{finalCost.toLocaleString()}</h4>
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