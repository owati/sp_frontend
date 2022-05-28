import {ReactComponent as Plus} from '../assets/plus2.svg'
import {ReactComponent as Minus} from '../assets/minus.svg';
import {ReactComponent as Phone} from '../assets/bi_phone.svg';
import {ReactComponent as Mail} from '../assets/ci_mail.svg';
import '../css/help.css'

function Help() {
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
                marginTop : "50px"
            }}>        
            </div>

            <div className='help-line'>
                <h3>FAQ</h3>
                <h3>Answers to the most frequently asked questions</h3>
            </div>
            {
                helps.map(
                    help => (
                        <div className='help-line' id="help">
                            <div className='help-actions'>
                                <h3>{help}</h3>
                                <Plus />
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
                            marginLeft : "10px"
                        }}/>
                        <div>
                            <h4 style={{margin : "10px"}}>+ 1-234-567-8010</h4>
                            <h4 style={{margin : "4px", color : "rgba(0,0,0,0.3)"}}>8am - 5pm</h4>
                            <h4 style={{margin : "4px", color : "rgba(0,0,0,0.3)"}}>Mon - Sat</h4>
                        </div>
                        

                    </div>
                    <div className='help-contact-type'>
                        <Mail style={{
                            marginLeft : '10px'
                        }}/>

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