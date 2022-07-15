import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../css/cart.css';
import shirt from '../assets/shirt.png'
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import NumberInput from '../components/inputs/NumberInput';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import CartChangeModal from '../components/CartChangeModal';
import { NoModalLoading } from '../components/Loading';
import { getRequest, putRequest } from '../functions/api';
import { removeCart } from '../functions/storage';
import { updateItem } from '../redux/slicers/cartSlicer';


function Cart() {
    const dispatch = useDispatch();

    const [showChange, setShow] = useState(null);

    const user = useSelector(state => state.user.info)
    const cart = useSelector(state => state.cart.items);

    const [productsList, setProduct] = useState(null);

    async function getProducts() {
        if (cart.length) {
            const res = await getRequest(
                `sku/units/some?list=${JSON.stringify(cart.map(_cart => _cart.id))}`);
            if (res?.status === 200) {
                const products = res.data.data;
                const newCartList = [];
                for (const item of cart) {
                    const [prod_data] = products.filter(prod => prod._id === item.id);
                    if (prod_data) {
                        newCartList.push({
                            ...item,
                            sku: prod_data
                        })
                    }
                }

                setProduct(newCartList);
            }
        }
    }

    function removeFromCart(id) {
        const new_cart = removeCart(id)
        if (user) {
            const res = putRequest('pref/cart', {cart_data : new_cart});
        }

        dispatch(updateItem(new_cart))
    }
    useEffect(() => {
        getProducts()
    }, [cart])

    

    return productsList ? (
        <div style={{
            padding: "0px 20px"
        }}>
            <div className='cart-header'>
                <h1 style={{
                    margin: "3px",
                    fontStyle: "italic",
                    fontWeight: "1000",
                    width: "250px",
                    textAlign: "center",
                    borderBottom: "1px black solid"

                }}>My Cart</h1>
                <h3 style={{
                    margin: "0px",
                    position: "absolute",
                    right: " 0px"
                }} className="none-mobile">Total: {cart.length}</h3>
            </div>
            {
                productsList.length ?
                    <div className='cart-info'>
                        <div>
                            {
                                productsList.map(
                                    (product, index) => {
                                        const { sku, data, _id } = product;

                                        return <div className='cart-details' key={'cart '+index}>
                                            <div>
                                                <div style={{
                                                    display: "flex",
                                                    height: "fit-content",
                                                    justifyContent: "space-between",
                                                    borderBottom: '1px solid black',
                                                    marginBottom: "40px"
                                                }}>
                                                    <div className='image-holder'>
                                                        <img src={sku.images[0]} alt="pic" />
                                                    </div>

                                                    <div className='cart-details-info'>
                                                        <h3 style={{ margin: "0px" }}>{sku.name}</h3>
                                                        <h5 style={{marginTop : '10px'}}>{sku.headline}</h5>
                                                        <h5 style={{marginTop : '10px'}}>Color : black</h5>
                                                        <h5 style={{marginTop : '10px'}}>Size : {sku.name}</h5>
                                                        <h5 className='invert-none' style={
                                                            {
                                                                marginTop: "10px",
                                                                color: "black",
                                                            }
                                                        }>&#8358;{sku.price.toLocaleString()}</h5>
                                                        <h5 style={{
                                                            marginTop: "10px"
                                                        }}
                                                        >Quantity : {data.quantity}</h5>



                                                        <button style={{
                                                            display: "flex",
                                                            border: "none",
                                                            backgroundColor: "transparent",
                                                            alignItems: "center",
                                                            position: "absolute",
                                                            bottom: "0px"
                                                        }} onClick={
                                                            () => {
                                                                setShow(product)
                                                            }
                                                        }>
                                                            <Edit />
                                                            <h5 style={{
                                                                margin: "0px",

                                                            }}>Edit details</h5>
                                                        </button>

                                                        <button className="cart-del" style={{
                                                            border: "none",
                                                            backgroundColor: "transparent"
                                                        }}>
                                                            <Delete onClick={() => removeFromCart(_id)} />
                                                        </button>
                                                    </div>

                                                    <div className='cart-details-info-2 none-mobile'>
                                                        <h3 style={{
                                                            margin: "0px"
                                                        }}>&#8358;10,000</h3>
                                                        {/* <div style={{
                                                            width: "100px"
                                                        }}>
                                                            <NumberInput onChange={() => { }} />
                                                        </div> */}

                                                        <button style={{
                                                            border: "none",
                                                            backgroundColor: "transparent"
                                                        }}>
                                                            <Delete onClick={() => removeFromCart(_id)} />
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    }
                                )
                            }
                        </div>
                        <div className='cart-checkout'>
                            <h1 style={{ margin: "0px" }}>Summary</h1>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingRight: "30px",
                                paddingTop: "40px",
                                borderBottom: "2px solid rgba(0,0,0,0.4)"
                            }}>
                                <h3>Sub Total: </h3>
                                <h3>&#8358;10,000</h3>

                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingRight: "30px",
                                borderBottom: "2px solid rgba(0,0,0,0.4)"
                            }}>
                                <h3>Total: </h3>
                                <h3>&#8358;10,000</h3>

                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "50px"
                            }}>
                                <button className='grow shadow-5'
                                    style={{
                                        width: "80%",
                                        height: "47px",
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "none",
                                        fontWeight: "bolder",
                                        borderRadius: "5px"
                                    }}
                                >Checkout</button>

                            </div>


                        </div>

                    </div> : <></>
            }

            <SkuCardList title="You might also like">
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
            </SkuCardList>

            <CartChangeModal show={showChange}  closed={
                () => {
                    setShow(null)
                }
            } />

        </div>
    ) : (
        <div style={{
            height: '70vh'
        }}>
            <NoModalLoading />
        </div>
    )
}

export default Cart;