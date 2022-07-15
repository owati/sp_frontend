import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid'
import Rating from '../components/CustomRating';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import FaveModal from '../components/FaveModal';
import draftToHtml from "draftjs-to-html";
import CartModal from '../components/CartModal';
import '../css/product.css';
import like from '../assets/like.png';
import liked from '../assets/liked.png';
import shirt from '../assets/shirt.png';
import NumberInput from '../components/inputs/NumberInput';
import drop from '../assets/drop.png';
import {ReactComponent as VeriSvg} from '../assets/verified.svg';
import { getRequest, putRequest } from '../functions/api';
import Loading, {NoModalLoading} from '../components/Loading';
import {addFave, getFave, addCart} from '../functions/storage';
import { updateItem } from '../redux/slicers/faveSlicer';
import { updateItem as updateCart } from '../redux/slicers/cartSlicer';
import { toast } from 'react-toastify';

function Product() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.info);

    const faves = useSelector(state => state.fave.items)

    const [sku, setSku] = useState(null);

    const [cartPref, setCartPref] = useState({
        id,
        data : {}
    })

    function editCartRef(type, value) {
        setCartPref(
            cart => ({
                ...cart,
                data : {
                    ...cart.data,
                    [type] : value
                }
            })
        )
    }

    const [showFave, setFave] = useState(false);
    const [showCart, setCart] = useState(false);
    const [loading, setLoading] = useState(false)

    const data = {
        name: "Galactic Ranger 2",
        category: {
            detail: "Unisex Summer Shirt"
        },

        description: "This is very good trouser of high quality which will be able to blend in with an environment colour. You are surely going to feel like a king if this is purchased. Place your order now and dont miss out on this opportunity.",
        price: 10000,
        sizes: ['S', 'M', 'L', 'XL', 'XL'],
        review : 3
    }

    
    const sizeMap = {
        small : 'S',
        medium : 'M',
        large : 'L',
        xlarge : 'XL'
    }



    async function getProduct() {
        const res = await getRequest('sku/units/'+id)
        if (res?.status === 200){
            setSku(res.data.data);
            setCartPref({
                ...cartPref,
                data : {
                    quantity : 1,
                    color : res.data.data.colors[0],
                    size : res.data.data.sizes[0]
                }
            })
        }
        
    }

    const is_liked = useMemo(
        () => {
            return faves.includes(id) ? liked : like
        },[id,showFave]
    )

    async function addToFave() {
        const faves = addFave(id);
        dispatch(updateItem(faves));
        if (user) {
            const res = await putRequest('pref/faves', {faves});
            if (res?.status === 200) {
                setFave(true)
            } else {
                toast.error(res.data.message)
            }
        } else {
            setFave(true)
        }
    }

    async function addToCart() {
        const cart_data = addCart({
            ...cartPref,
            _id : uuid()
        });
        dispatch(updateCart(cart_data));
        if (cart_data) {
            if (user) {
                const res = await putRequest('pref/cart', {cart_data});
                if (res?.status === 200) {
                    setCart(true)
                } else {
                    toast.error(res.data.message)
                }
            } else {
                setCart(true)
            }
        } else {
            toast.info('The item is already in the cart')
        }
    }

    useEffect(() => {getProduct()},[])

    const {quantity, color, size} = cartPref.data;

    return sku ? (
        <div style={{
            padding: "0px 25px",
            marginBottom: "40px"
        }}>
            <div className='product-info'>
                <div className='product-info-side'>
                    <div className='product-image'>
                        <img src={sku?.images[0]} alt="product picture" />
                        <img src={is_liked} className="product-like"
                            onClick={
                                () => {
                                    if (is_liked == like) addToFave()
                                }
                            }
                         />
                    </div>
                    <div style={{
                        display : "flex",
                        flexWrap : "wrap",
                        justifyContent : "space-between",
                        marginTop : "20px"
                        
                    }}>
                        <div className='product-other-image'>
                            <img src={sku?.images[1]} alt="other image"/>
                        </div>
                        <div className='product-other-image'>
                            <img src={sku?.images[2]} alt="other image"/>
                        </div>
                        <div className='product-other-image'>
                            <img src={sku?.images[3]} alt="other image"/>
                        </div>
                    </div>
                </div>
                <div className='product-info-side'>
                    <div className='product-details'>
                        <h2>{sku?.name}</h2>
                        <h4>{sku?.headline}</h4>
                        <h5 className='description-tag' dangerouslySetInnerHTML={{__html : sku?.description && draftToHtml(JSON.parse(sku?.description))}}></h5>
                        <h2>&#8358;{sku?.price?.toLocaleString()}</h2>
                        <h5>Please select a size</h5>

                        <div >
                            {
                                sku?.sizes.map(
                                    size_ => {
                                        return <button key={size_} id={size_} className={`product-size-butt ${size === size_ ? 'selected' : ''}`}
                                            onClick={() => editCartRef('size', size_)}
                                        >{sizeMap[size_]}</button>
                                    }
                                )
                            }
                        </div>

                        <div style={{
                            display: "flex",

                        }}>
                            <div style={{
                                marginRight: "50px"
                            }}>
                                <h4>Colors:</h4>
                                <div>
                                    {
                                        sku?.colors.map(
                                            col => 
                                            <button className={`product-size-butt ${color === col ? 'selected' : ''}`} key={col}  style={{backgroundColor : col}}
                                                onClick={() => editCartRef('color', col)}
                                            ></button>
                                        )
                                    }
                                </div>
                            </div>
                            <div style={{
                                width: "30%"
                            }}>
                                <h4>Qty</h4>
                                <NumberInput onChange={e => editCartRef('quantity', e )}/>
                            </div>
                        </div>

                        <button className='cart-button grow' 
                            onClick={ 
                                () => {
                                    addToCart()
                                }
                            }
                        >
                            ADD TO CART
                        </button>
                    </div>

                    <div className='rating-div'>
                        <h3>Rating</h3>
                        <div style={{
                            display : "flex"
                        }}>
                            <Rating 
                                initial={data.review}
                                readonly
                            />
                            <button
                                onClick = {
                                    (e) => {
                                        let show = document.querySelector('#rating-show');
                                        e.target.style.transform = show.style.height === '0px' ? "rotate(180deg)" : "rotate(0deg)"
                                        show.style.height = show.style.height === '0px' ? "300px" : "0px";
                                    }
                                }

                                style={{
                                    marginLeft : "8px",
                                    border: "none",
                                    backgroundColor:"transparent"
                                }}
                                
                            >

                            <img src={drop} alt=""
                                style={{
                                    transition : "ease all 0.8s"
                                }}
                            />

                            </button>
                        </div>
                    </div>
                    <div id="rating-show">
                        
                    <div className='ratings-message'>
                        <h3>Comfortable and Stylish</h3>
                        <div style={{
                            display : "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <h4>Toafeek James</h4>
                            <Rating
                                red={false}
                                initial={3}
                                readonly
                            />
                        </div>

                        <h5>This trouser is very comfortable and 
                            i love the material that as used to make it.  
                            The colour is also awesome.</h5>

                        <div style={{
                            display : "flex",
                            alignItems: "center",
                            justifyContent : "flex-end",
                            marginBottom : "5px"
                        }}>
                        <VeriSvg />
                        <h5 style={{
                            margin : "3px",
                            paddingLeft : "5px"
                        }}>Verified customer</h5>
                        </div>
                    </div>

                    </div>


                </div>
            </div>

            <SkuCardList title="Similar Products">
                <SkuCard/>
                <SkuCard/>
                <SkuCard/>
                <SkuCard/>
                <SkuCard/>
                <SkuCard/>
            </SkuCardList>

            <FaveModal 
                show={showFave}
                closed={
                    () => {
                        setFave(!showFave)
                    }
                }
                sku={sku}
                />
            <CartModal 
                show={showCart}
                closed = {
                    () => {
                        setCart(!showCart)
                    }
                }
                data={cartPref.data}
                sku={sku}
            />

        </div>
    ) : (
        <div style={{height : '80vh'}}>
            <NoModalLoading />
        </div>
    )
}

export default Product;

