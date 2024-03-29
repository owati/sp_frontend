import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import uuid from 'react-uuid';
import '../css/favourites.css';
import SkuGrid from '../components/SkuGrid'
import { ReactComponent as Cart } from '../assets/moveCart.svg';
import SkuCardList from '../components/SkuCardList';
import SkuCard from '../components/SkuCard';
import close from '../assets/close.png'
import { getRequest, putRequest } from '../functions/api';
import Loading, { NoModalLoading } from '../components/Loading';
import { addCart, clearFave, mergeCart, removerFave } from '../functions/storage';
import { updateItem } from '../redux/slicers/cartSlicer';
import { updateItem as updateFave} from '../redux/slicers/faveSlicer'
import { toast } from 'react-toastify';

function Favourites() {
    const navigate  = useNavigate()
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.info)
    const faves = useSelector(state => state.fave.items);

    const [faveProducts, setFaves] = useState(null);

    const [loading, setLoading] = useState(false);

    async function getFaves() {
        if (faves.length) {
            const res = await getRequest(
                `sku/units/some?list=${JSON.stringify(faves)}`
            )
            console.log(res)
            if (res?.status === 200) {
                console.log(res)
                setFaves(res?.data?.data)
            } 
        } else {
            setFaves([])
        }
    }
    useEffect(
        () => {
            getFaves();
            console.log(faves)
        }, [faves]
    )


    async function addToCart(id, color, size) {

        const cart = addCart({
            id : id,
            _id : uuid(),
            data : {
                quantity : 1,
                color, 
                size
            }
        })

        const faves = removerFave(id)

        console.log(faves)

        console.log(cart);
        if(user) {
            setLoading(true)
            const res = await putRequest('pref/cart', {cart_data : cart});
            const fave_res = await putRequest('pref/faves', {faves})
            setLoading(false)
        }
        
        dispatch(updateFave(faves));
        dispatch(updateItem(cart));

        toast.success('successfully moved to cart')
    }

    async function removeFromFave(id) {
        const faves = removerFave(id);

        if (user) {
            setLoading(true)
            await putRequest('pref/faves', {faves})
            setLoading(false)
        }

        dispatch(updateFave(faves));
    }


    async function moveAllToCart() {
        clearFave();

        const cart_data = faveProducts.map(
            prod => {
                return {
                    id : prod._id,
                    _id : uuid(),
                    data : {
                        quantity : 1,
                        color : prod.colors[0],  
                        size : prod.sizes[0]
                    }
                }
            }
        )

        const cart =  mergeCart(cart_data);
        if (user) {
            setLoading(true)
            const res = await putRequest('pref/cart', {cart_data : cart});
            const fave_res = await putRequest('pref/faves', {faves : []})
            setLoading(false)
        }

        dispatch(updateFave([]));
        dispatch(updateItem(cart));

    }

    return faveProducts ? (
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
                justifyContent: 'space-between',
                marginBottom  : "20px"
            }}>
                <button disabled={faveProducts?.length == 0} style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    border: "none",
                    alignItems: "center"
                }} className="grow" onClick={moveAllToCart}>
                    <Cart />
                    <h4 style={{ margin: "0px 5px" }}>Move all to cart</h4>
                </button>

                <h4 style={{ margin: "0px" }}>Total : {faveProducts?.length}</h4>

            </div>

            {
                faveProducts?.length ? <SkuGrid>
                    {
                        faveProducts.map(
                            product => {
                                return (
                                    <div style={{
                                        display : "flex",
                                        justifyContent : "center"
                                    }}>
                                        <FaveSkuCard data={product} add={addToCart} rem={removeFromFave}/>
                                    </div>
                                )
                            }
                        )
                    }
                </SkuGrid> : <div style={{height : '60vh', display : 'flex'}}>
                    <h3 style={{
                        margin : 'auto',
                        color : 'rgba(0,0,0,0.6)'
                    }}>You currently have no favourites</h3>
                    
                </div>
            }


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
            <Loading show={loading}/>
        </div>
    ) : (
        <div style={{
            height : '70vh'
        }}>
            <NoModalLoading />
        </div>
    )
}

export default Favourites


function FaveSkuCard({data, add, rem}) {
    return (
        <div className='fave-card shadow-4'>
            <button className='fave-close shadow-5 grow' onClick={() => rem(data._id)}>
                <img src={close} alt="closed picture"/>
            </button>
            <div className='fave-image-holder'>
                <img src={data.images[0]} />
            </div>
            <div className='fave-details'>
                <div>
                    <h2>{data.name}</h2>
                    <h3>{data.headline}</h3>
                </div>

                <h2>{data.price.toLocaleString()}</h2>

            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                padding : "20px 10px"
            }}>
                <button className='fave-cart-butt grow' onClick={() => add(data._id, data.colors[0], data.sizes[0])}>
                    ADD TO CART
                </button>
            </div>

        </div>
    )
}
