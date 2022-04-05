
import '../css/home.css';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';
import shirt from '../assets/shirt.png';

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
                <img src={shirt} alt="collection image"/>

                <div className='home-collection-text'>

                </div>

            </div>

            <SkuCardList title="Best Sellers.">
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
                <SkuCard />
            </SkuCardList>
        </>
    )
}
export default Home;