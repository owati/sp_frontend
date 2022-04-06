
import '../css/home.css';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import shirt from '../assets/shirt.png';
import collage from '../assets/collage.png';
import cap_cat from '../assets/cap-cat.png'
import trous_cat from '../assets/trouser-cat.png'
import shirt_cat from '../assets/shirt-cat.png'
import never_miss from '../assets/never_miss.png'

function Home() {

    const category = {
        trouser : {
            image : trous_cat,
            name : "Jeans"
        },
        shirt : {
            image : shirt_cat,
            name :'Tees'
        },
        cap  : {
            image : cap_cat,
            name : "Caps"
        }
    }
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
                    <CategoryBut category={category.shirt}/>
                </div>
                <div className='home-category-section-2'>
                    <div className='home-sub-category' data-aos="fade-up">
                        <CategoryBut category={category.trouser}/>
                    </div>
                    <div className='home-sub-category' data-aos="fade-down">
                        <CategoryBut category={category.cap}/>
                    </div>

                </div>
            </div>

            <div className='home-collage'>
                <img src={collage} alt="collage-pic" />
                <div>
                    <button className='grow shadow-5 home-butt'>
                        LEARN MORE
                    </button>
                </div>

            </div>

            <NotifyMe />
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
            backgroundImage: "linear-gradient(rgba(252, 231, 9, 1), rgba(217, 44, 39, 1)) ",
            position : "relative",
        }} className="grow">
            <img className="home-cat-image" src={category?.image} alt="cat-image" />
            <h1 className='home-cat-text'>{category?.name}</h1>
        </div>
    )
}

function NotifyMe() {
    return (
        <div className='div-notify'>
            <img src={never_miss} alt="never-miss"/>
            <h4>Get nofied on new promo, collections and much more.</h4>
            <div className='notify-input'>
                <input type="email" placeholder="Enter your email address"/>
                <button className='grow'>Notify Me</button>
            </div>

        </div>
    )
}