import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/CustomRating';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import FaveModal from '../components/FaveModal';
import CartModal from '../components/CartModal';
import '../css/product.css';
import like from '../assets/like.png';
import liked from '../assets/liked.png';
import shirt from '../assets/shirt.png';
import NumberInput from '../components/inputs/NumberInput';
import drop from '../assets/drop.png';
import {ReactComponent as VeriSvg} from '../assets/verified.svg';

function Product() {
    const { id } = useParams();
    const [showFave, setFave] = useState(false);
    const [showCart, setCart] = useState(false);

    const data = {
        name: "Galactic Ranger 2",
        category: {
            detail: "Unisex Summer Shirt"
        },

        description: "This is very good trouser of high quality which will be able to blend in with an environment colour. You are surely going to feel like a king if this is purchased. Place your order now and dont miss out on this opportunity.",
        price: 10000,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        review : 3
    }
    return (
        <div style={{
            padding: "0px 25px",
            marginBottom: "40px"
        }}>
            <div className='product-info'>
                <div className='product-info-side'>
                    <div className='product-image'>
                        <img src={shirt} alt="product picture" />
                        <img src={like} className="product-like"
                            onClick={
                                () => {
                                    setFave(!showFave)
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
                            <img src={shirt} alt="other image"/>
                        </div>
                        <div className='product-other-image'>
                            <img src={shirt} alt="other image"/>
                        </div>
                        <div className='product-other-image'>
                            <img src={shirt} alt="other image"/>
                        </div>
                        <div className='product-other-image'>
                            <img src={shirt} alt="other image"/>
                        </div>
                    </div>
                </div>
                <div className='product-info-side'>
                    <div className='product-details'>
                        <h2>{data.name}</h2>
                        <h4>{data.category.detail}</h4>
                        <h5>{data.description}</h5>
                        <h2>&#8358;{data.price.toLocaleString()}</h2>
                        <h5>Please select a size</h5>

                        <div >
                            {
                                data.sizes.map(
                                    size => {
                                        return <button id={size} className="product-size-butt">{size}</button>
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
                                    <button className='product-size-butt'></button>
                                    <button className='product-size-butt'></button>
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
    )
}

export default Product;

