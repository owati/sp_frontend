import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import '../css/modal.css';
import close from '../assets/close.png';
import shirt from '../assets/shirt.png';
import NumberInput from './inputs/NumberInput';
import {updateItem} from '../redux/slicers/cartSlicer'
import { updateCart } from '../functions/storage';
import {putRequest} from '../functions/api'

function CartChangeModal({ show, closed }) {
    const dispatch = useDispatch();
    const [cartItem, setItem] = useState({})
    const {_id, data, sku} = cartItem;

    const user = useSelector(state =>  state.user.info)

    useEffect(() => {
        if (show) {
            //console.log(show)
            setItem(show)
        }
    }, [show])

        
    const sizeMap = {
        small : 'S',
        medium : 'M',
        large : 'L',
        xlarge : 'XL'
    }

    function editChanges(type, value) {
        if (['color', 'size'].includes(type)) {
            if (data.color !== value) {
                setItem(cartItem => ({
                    ...cartItem, 
                    data : {
                        ...cartItem.data,
                        [type] : value
                    }
                }))
            }
        } else {
            setItem(cartItem => ({
                ...cartItem, 
                data : {
                    ...cartItem.data,
                    [type] : value
                }
            }))
        }
    }


    function updateTheCart() {
        const cart = updateCart(_id, data);

        console.log(cart)
        
        if (user) {
            putRequest('pref/cart', {cart_data : cart});
        }
        dispatch(updateItem(cart));
        closed();
    }

    return (
        <Modal show={show} direction="modal-top">
            <div className='cart-modal' data-aos="fade-down" >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height : "0px"
                }}>
                    <img src={close} onClick={
                        () => {
                            closed();
                        }
                    } />
                </div>

                <div className='cart-modal-info'>
                    <div style={{
                        width: "300px",
                        backgroundColor: "rgba(240, 240, 240, 1)",
                        borderRadius: "10px",
                        marginRight: "10px"
                    }} className="cart-modal-info-2">
                        <img style={{
                            height : '100%',
                            objectFit : 'contain'
                        }} src={sku?.images[0]} />
                    </div>
                    <div className='cart-modal-info-1'>
                        <h4 style={{ margin: "3px 0px" }}>{sku?.name}</h4>
                        <h5 style={{ margin: "6px 0px" }}>{sku?.headline}</h5>
                        <h5>Please select a size</h5>

                        <div >
                            {
                                sku?.sizes.map(
                                    size => {
                                        return <button id={size} className={`product-size-butt ${data?.size === size ? 'cart-selected' : ''}`} 
                                        onClick={
                                            () => {
                                                editChanges('size', size)
                                            }
                                        }>{sizeMap[size]}</button>
                                    }
                                    )
                                }
                        </div>

                        <div style={{
                            display: "flex",
                            
                        }}>
                            <div style={{
                                marginRight: "50px"
                            }}>
                                <h4>Colors:</h4>
                                <div>
                                    {
                                        sku?.colors.map(
                                            color => {
                                                return <button className={`product-size-butt ${data?.color === color ? 'cart-selected' : ''}`} 
                                                onClick={
                                                    () => {
                                                        editChanges('color', color)
                                                    }
                                                } style={{backgroundColor : color}}></button>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                            <div style={{
                                width: "30%"
                            }}>
                                <h4>Qty</h4>
                                <NumberInput defaultValue={data?.quantity} onChange={e => editChanges('quantity', e)}/>
                            </div>
                        </div>
                        <button className='cart-button grow' style={{
                            width : '100%'
                        }}
                         onClick={
                             () => {
                                 updateTheCart()
                             }
                         }>
                            UPDATE
                        </button>
                    
                    </div>

                </div>

            </div>
        </Modal>
    )

}

export default CartChangeModal;