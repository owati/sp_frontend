
import '../css/sku.css';
import right from '../assets/Vector3.png';
import left from '../assets/Vector2.png';

function SkuCardList({title, children}) {
    function handleScrolling(right) {
        let div = document.getElementById("sku-list");
        div.scrollTo(
            {
                left : div.scrollLeft + (right ? 500 : -500),
                behavior : 'smooth'
            }
        )
    }
    return (
        <div style={{
            padding : "20px"
        }}>
            <div className='sku-card-list-header'>
                <h1><i>{title}</i></h1>
                <div style={{
                    display : "flex",
                    width : "fit-content"
                }}>
                    <button className='scroll-butt grow'
                        onClick={
                            () => {
                                handleScrolling(false)
                            }
                        }
                        >
                        <img src={left}/>
                    </button>
                    <button className='scroll-butt grow'
                        onClick={
                            () => {
                                handleScrolling(true)
                            }
                        }
                        >
                        <img src={right}/>
                    </button>

                </div>
            </div>
            <div className='sku-card-list' id="sku-list">
                {children}
            </div>
        </div>
    )
}

export default SkuCardList;