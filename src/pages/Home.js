
import '../css/home.css';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import shirt from '../assets/shirt.png';
import collage from '../assets/collage.png';

function Home() {
    return (
        <>
            <div className="home-bg">
                <div className='home-bg-2'>
                    <button className='home-shop-butt grow ' data-aos='fade-up'>
                        <i>SHOP NOW</i>
                    </button>
                </div>
            </div>

            <SkuCardList title="Hot 'n' Trending">
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
            </SkuCardList>

            <div className='home-collection'>
                <div className='home-collection-image-holder'>
                    <img src={shirt} alt="collection image" />
                </div>

                <div className='home-collection-text'>
                    <h1>S24 Collections</h1>
                    <h4>The perfect clothing collection for the hammarttan, the end product is the best was have get you copu now</h4>
                    <button className='grow shadow-5 home-butt'>
                        SHOP NOW
                    </button>
                </div>

            </div>

            <SkuCardList title="Best Sellers">
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
            </SkuCardList>

            <h1 style={{
                fontWeight: "400",
                fontStyle: "italic",
                textAlign:"center"

            }}>Categories</h1>
            <div className='home-category'>
                <div className='home-category-section-1' data-aos="fade-left">
                    <CategoryBut />
                </div>
                <div className='home-category-section-2'>
                    <div className='home-sub-category' data-aos="fade-up">
                        <CategoryBut />
                    </div>
                    <div className='home-sub-category' data-aos="fade-down">
                        <CategoryBut />
                    </div>

                </div>
            </div>

            <div className='home-collage'>
                <img src={collage} alt="collage-pic" />
                <div>
                    <button className='grow shadow-5 home-butt'
                        style={{
                            width: "140px",
                            height: "35px",
                        }}>
                        LEARN MORE
                    </button>
                </div>

            </div>
        </>
    )
}
export default Home;


function CategoryBut({ category }) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            backgroundImage: "linear-gradient(rgba(252, 231, 9, 1), rgba(217, 44, 39, 1)) "

        }}>

        </div>
    )
}