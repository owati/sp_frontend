import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import {addFave} from '../functions/storage'

function Product() {
    const { id } = useParams();
    const user = useSelector(state => state.user.info);

    console.log(user)

    const [sku, setSku] = useState(null);

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
            setSku(res.data.data)
        }
        
    }

    async function addToFave() {
        const faves = addFave(id);
        if (user) {
            const res = await putRequest('pref/faves', {faves});
            if (res?.status) {
                setFave(true)
            } else {
            }
        } else {
            setFave(true)
        }
    }

    useEffect(() => {getProduct()},[])

    return sku ? (
        <div style={{
            padding: "0px 25px",
            marginBottom: "40px"
        }}>
            <div className='product-info'>
                <div className='product-info-side'>
                    <div className='product-image'>
                        <img src={sku?.images[0]} alt="product picture" />
                        <img src={like} className="product-like"
                            onClick={
                                () => {
                                    addToFave()
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
                                    size => {
                                        return <button key={size} id={size} className="product-size-butt">{sizeMap[size]}</button>
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
                                            color => 
                                            <button className='product-size-butt' key={color} style={{backgroundColor : color}}></button>
                                        )
                                    }
                                </div>
                            </div>
                            <div style={{
                                width: "30%"
                            }}>
                                <h4>Qty</h4>
                                <NumberInput />
                            </div>
                        </div>

                        <button className='cart-button grow' 
                            onClick={ 
                                () => {
                                    setCart(!showCart)
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
            />
            <CartModal 
                show={showCart}
                closed = {
                    () => {
                        setCart(!showCart)
                    }
                }
            />

        </div>
    ) : (
        <div style={{height : '80vh'}}>
            <NoModalLoading />
        </div>
    )
}

export default Product;

