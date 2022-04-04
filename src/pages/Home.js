
import '../css/home.css';
import SkuCard from '../components/SkuCard';
import SkuCardList from '../components/SkuCardList';

function Home() {
    return (
        <>
            <div className="home-bg">
                <div className='home-bg-2'>
                    <button className='home-shop-butt' data-aos='fade-up'>
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

        </>
    )
}
export default Home;