import '../css/favourites.css';
import SkuGrid from '../components/SkuGrid'
import { ReactComponent as Cart } from '../assets/moveCart.svg';
import shirt from '../assets/shirt.png';
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import SkuCardList from '../components/SkuCardList';
import SkuCard from '../components/SkuCard';

function Favourites() {
    return (
        <div style={{
            padding: "20px"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: "center"
            }}>
                <h1 className='fave-header'>Favourites</h1>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between'
            }}>
                <button style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    alignItems: "center"
                }} className="grow">
                    <Cart />
                    <h4 style={{ margin: "0px 5px" }}>Move all to cart</h4>
                </button>

                <h4 style={{ margin: "0px" }}>Total : 10</h4>

            </div>

            <SkuGrid>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <FaveSkuCard />
                </div>
            </SkuGrid>

            <SkuCardList title="You will also like">
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
                <SkuCard />
                <SkuCard />

            </SkuCardList>

        </div>
    )
}

export default Favourites


function FaveSkuCard() {
    return (
        <div className='fave-card shadow-4'>
            <div className='fave-image-holder'>
                <img src={shirt} />
            </div>
            <div className='fave-details'>
                <div>
                    <h2>Galactic Ranger 2</h2>
                    <h3>unisex t-shirt</h3>
                </div>

                <h2>10,000</h2>

            </div>
            <button style={{
                display: "flex",
                border: "none",
                backgroundColor: "transparent",
                alignItems: "center",
            }} onClick={
                () => {

                }
            }>
                <Edit />
                <h5 style={{
                    margin: "0px",

                }}>Edit details</h5>
            </button>

            <div style={{
                display: "flex",
                justifyContent: "center",
                padding : "20px 10px"
            }}>
                <button className='fave-cart-butt grow '>
                    ADD TO CART
                </button>
            </div>

        </div>
    )
}