
import '../css/footer.css';
import logo from '../assets/logo1.png';

function Footer() {
    return (
        <footer>
            <div className='footer'>
                <div className='footer-section-1'>
                    <img src={logo} width="200" height="100" />
                    <div style={{ paddingTop: "70px" }}>
                        <p>Savave Phantom Shop,</p>
                        <p>12 Random Street,</p>
                        <p>City City, Country Country.</p>
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                        <p>superman@savagephantomshop.com</p>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <p>Whatsapp +234 023 3453 23</p>
                    </div>
                </div>
                <div className='footer-section-2'>
                    <div style={{ width: "40%" }}>
                        <h3 className='dull-white'><i>About us</i></h3>
                        <ul style={{ padding: "0px" }}>
                            {
                                ['Newsletter', 'Join us', 'Feedback',]
                                    .map(
                                        x => (
                                            <li key={x} className="dull-white grow">{x}</li>
                                        )
                                    )
                            }
                        </ul>
                    </div>
                    <div style={{ width: "40%" }}>
                        <h3 className='dull-white'><i>Help</i></h3>
                        <ul style={{ padding: "0px" }}>
                            {
                                ['Shipping and delivery', 'Return policy', 'Private policy', 'Terms of Service', 'FAQ']
                                    .map(
                                        x => (
                                            <li key={x} className="dull-white grow">{x}</li>
                                        )
                                    )
                            }
                        </ul>
                    </div>

                </div>
                <div className='footer-section-3'>
                    <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                        <h4>socials</h4>
                    </div>
                    <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                        
                    </div>
                </div>
            </div>
            <div className='footer-foot dull-white'>
                &copy; {new Date().getFullYear()} Savage Phantom. All right reserved.
            </div>
        </footer>
    )
}

export default Footer;