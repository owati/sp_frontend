import { memo } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import '../css/sku.css';
import { getFave } from '../functions/storage';
import like from '../assets/like.png';
import liked from '../assets/liked.png';

function SkuCard({styles, sku}) {

    const faves = useSelector(state => state.fave.items);

    const navigate = useNavigate()

    const is_liked = (function (){
        return faves.includes(sku?._id) ? liked : like
    })()
    return (
        <div className='sku-card shadow-5' style={{...styles}} onClick={
            () => {
                navigate('/product/' + sku._id)
            }
        }>
            <div className='sku-card-header'>
                <img src={sku?.images[0]} alt={sku?.name} style={{
                    width : "80%",
                    height : "80%",
                    position : "absolute",
                    top : "10%",
                    left : "10%",
                    objectFit : 'cover'
                }}/>

                <img src={is_liked} alt="like" 
                    className='grow'
                    style={{
                        position : "absolute",
                        top : "10px",
                        right : "10px"
                    }}
                />
                
            </div>
            <div className='sku-card-footer'>
                <div style={{width : '60%'}}>
                    <h3 className='small-marg' style={{fontWeight : "bolder"}}>{sku?.name}</h3>
                    <h5 className='small-marg'>{sku?.headline.split(' ').slice(0,4).join(' ') + '...'}</h5>
                    <h5 className='small-marg'>{sku?.colors?.length} colors</h5>
                </div>
                <div>
                    <h3 className='small-marg'>&#8358;{sku?.price?.toLocaleString()}</h3>
                </div>
            </div>
        </div>
    )
}

export default memo(SkuCard);