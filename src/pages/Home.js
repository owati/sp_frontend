import { useState, useEffect} from 'react';
import { getRequest, postRequest } from '../functions/api';
import { toast } from 'react-toastify';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import shirt from '../assets/shirt.png';
import collage from '../assets/collage.png';
import cap_cat from '../assets/cap-cat.png'
import trous_cat from '../assets/trouser-cat.png'
import shirt_cat from '../assets/shirt-cat.png'
import never_miss from '../assets/never_miss.png'
import '../css/home.css';

function Home() {
    const [loading, setLoading] = useState(false);

    const [bestseller, setBest] = useState([]);
    const [trending, setTrending] = useState([]);

    async function getDetails() {
        setLoading(true);
        const responses = await Promise.all([
            getRequest('trending'),
            getRequest('sku/bestseller')
        ])
        setLoading(false);

        const [best, trend] = responses;

        if (trend?.status === 200) setTrending(trend.data.data)
        if(best?.status === 200) setBest(best.data.data)

    }

    useEffect(
        () => {
            getDetails()
        }, []
    )

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

            <div style={{
                padding : "20px"
            }}>

            {
                trending.length > 0 ? 
                    <SkuCardList title="Hot 'n' Trending" id='hot-trend'>
                        {
                            trending.map(
                                (sku, id) => <SkuCard key={'trending' + id} sku={sku}/>
                            )
                        }
                    </SkuCardList>
                : <></>
            }

            </div>


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
            <div style={{
                padding:"20px"
            }}>
            {
                bestseller.length > 0 ? 
                    <SkuCardList title="Best Sellers" id='best'>
                        {
                            bestseller.map(
                                (sku, id) => <SkuCard key={'trending' + id} sku={sku}/>
                            )
                        }
                    </SkuCardList>
                : <></>
            }
            </div>

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

export function NotifyMe() {
    const [email, setEmail] = useState("")

    async function handleSubmit() {
        if(email) {
            if (email.includes("@")) {
                const res = await postRequest('notify', {email})
                 
                if (res.status === 201) {
                    setEmail("");
                    toast.info("your email address has been added", {
                        icon : false
                    })
                } else {
                    toast.error(res.data.message)
                }
            } else {
                toast.error("the email should contain '@'")
            }
        } else {
            toast.error("please fill the email field")
        }
    }
    return (
        <div className='div-notify'>
            <img src={never_miss} alt="never-miss"/>
            <h4>Get nofied on new promo, collections and much more.</h4>
            <div className='notify-input'>
                <input type="email" placeholder="Enter your email address" 
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />
                <button className='grow'
                    onClick={ () => {
                        handleSubmit()
                    }}
                >Notify Me</button>
            </div>

        </div>
    )
}