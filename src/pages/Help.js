import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ReactComponent as Plus } from '../assets/plus2.svg'
import { ReactComponent as Minus } from '../assets/minus.svg';
import { ReactComponent as Phone } from '../assets/bi_phone.svg';
import { ReactComponent as Mail } from '../assets/ci_mail.svg';
import { ReactComponent as ThumbsUp } from '../assets/thumbsup.svg';
import { ReactComponent as ThumbsDown } from '../assets/thumbsdown.svg';

import '../css/help.css'

function Help() {
    const navigate = useNavigate();
    const helps = [
        'Shipping and Delivery',
        'Returns',
        'Orders',
        'Offers',
        'Company Info'
    ]
    return (
        <div className="help">
            <div className="help-header">
                <h1>Help</h1>
            </div>

            <div className='help-line' style={{
                marginTop: "50px"
            }}>
            </div>

            <div className='help-line'>
                <h3>FAQ</h3>
                <h3>Answers to the most frequently asked questions</h3>
            </div>
            {
                helps.map(
                    (help, index) => (
                        <div className='help-line help-disp' style={{
                            height: '60px'
                        }} id={`help${index}`}>
                            <div className='help-actions'>
                                <h3>{help}</h3>
                                <button onClick={
                                    e => {
                                        const div = document.getElementById('help' + index);
                                        console.log(div.style)
                                        if (div.style.height === '60px') {
                                            div.style.height = '160px'
                                        } else {
                                            div.style.height = '60px'
                                        }
                                    }
                                }>
                                    <Plus />
                                </button>

                            </div>
                            <div style={{
                                height: '100px',
                                overflowY: "scroll"
                            }}>
                                <h3 style={{ margin: 0 }} onClick={
                                    () => {
                                        navigate('../help/details')
                                    }
                                }>How do you have the solution ?</h3>
                                <h3 style={{ margin: 0 }} onClick={
                                    () => {
                                        navigate('../help/details')
                                    }
                                }>How do you have the solution ?</h3>
                                <h3 style={{ margin: 0 }} onClick={
                                    () => {
                                        navigate('../help/details')
                                    }
                                }>How do you have the solution ?</h3>
                                <h3 style={{ margin: 0 }} onClick={
                                    () => {
                                        navigate('../help/details')
                                    }
                                }>How do you have the solution ?</h3>
                            </div>
                        </div>
                    )
                )
            }


            <div className='help-contact'>
                <h4>Contact information</h4>
                <div className='help-contact-details'>
                    <div className='help-contact-type'>
                        <Phone style={{
                            marginLeft: "10px"
                        }} />
                        <div>
                            <h4 style={{ margin: "10px" }}>+ 1-234-567-8010</h4>
                            <h4 style={{ margin: "4px", color: "rgba(0,0,0,0.3)" }}>8am - 5pm</h4>
                            <h4 style={{ margin: "4px", color: "rgba(0,0,0,0.3)" }}>Mon - Sat</h4>
                        </div>


                    </div>
                    <div className='help-contact-type'>
                        <Mail style={{
                            marginLeft: '10px'
                        }} />

                        <div>
                            <h4>help@savagephantomstore.com</h4>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}


export default Help;

export function HelpDetail() {
    return (
        <div className="help">
            <div className="help-header">
                <h1>Help</h1>
            </div>

            <div className='help-line' style={{
                marginTop: "50px"
            }}>
            </div>
            <div className='help-details'>
                <h4>How do I cheack my order ?</h4>
                <p style={{color : 'black'}}>You have the opportunity to always check the status of your order. You can do this by looging in to your Account via your E-mail address and Password. After this, you can check the status of your order in the Orders Page or Click here</p>
                <p style={{color : 'black', marginTop : '10px'}}>You have the opportunity to always check the status of your order. You can do this by looging in to your Account via your E-mail address and Password. After this, you can check the status of your order in the Orders Page or Click here</p>
               
                <div style={{display : 'flex', alignItems : 'center', marginBottom : '50px'}}>
                    <h3 style={{width : 'fit-content'}}>Was the information useful ?</h3>
                    <ThumbsUp  style={{margin : '0px 10px'}}/>
                    <ThumbsDown  style={{margin : '0px 10px'}}/>
                </div>
            </div>

        </div>
    )
}