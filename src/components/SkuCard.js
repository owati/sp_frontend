import {useState} from 'react';
import '../css/sku.css';
import shirt from'../assets/shirt.png'
import like from '../assets/like.png';
import liked from '../assets/liked.png';

function SkuCard({styles, sku}) {
    return (
        <div className='sku-card shadow-5' style={{...styles}}>
            <div className='sku-card-header'>
                <img src={shirt} alt={sku?.name} style={{
                    width : "80%",
                    height : "80%",
                    position : "absolute",
                    top : "10%",
                    left : "10%",
                    objectFit : 'cover'
                }}/>

                <img src={like} alt="like" 
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

export default SkuCard;