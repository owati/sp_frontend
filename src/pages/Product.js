import { useParams } from 'react-router-dom';
import '../css/product.css';
import like from '../assets/like.png';
import liked from '../assets/liked.png';
import shirt from '../assets/shirt.png';
import NumberInput from '../components/inputs/NumberInput';

function Product() {
    const { id } = useParams();

    const data = {
        name : "Galactic Ranger 2",
        category : {
            detail : "Unisex Summer Shirt"
        },

        description : "This is very good trouser of high quality which will be able to blend in with an environment colour. You are surely going to feel like a king if this is purchased. Place your order now and dont miss out on this opportunity.",
        price : 10000,
        sizes : ['S', 'M', 'L', 'XL', 'XXL']
    }
    return (
        <div style={{
            padding: "0px 25px",
            marginBottom : "40px"
        }}>
            <div className='product-info'>
                <div className='product-info-side'>
                    <div className='product-image'>
                        <img src={shirt} alt="product picture"/>
                        <img src={like} className="product-like"/>
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

                        <div>
                            <div>
                                <h4>Colors:</h4>
                                <div>
                                    <button className='product-size-butt'></button>
                                    <button className='product-size-butt'></button>
                                </div>
                            </div>
                            <div style={{
                                width : "50%"
                            }}>
                                <NumberInput />

                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Product;

