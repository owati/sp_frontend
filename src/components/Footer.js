
import '../css/footer.css';
import logo from '../assets/logo1.png';
import insta from '../assets/insta.png'
import twitter from '../assets/twitter.png'
import youtube from '../assets/youtube.png'
import face from '../assets/face.png'

function Footer() {
    return (
        <footer>
            <div className='footer'>
                <div className='footer-section-1'>
                    <img src={logo} width="200" height="100" />
                    <div className="reduce" style={{ paddingTop: "70px" }}>
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
                <div className='footer-section-3 dull-white'>
                    <div style={{display : "flex", flexDirection : "column",justifyContent : "center", alignItems : "center"}}>
                        <h4><i>Socials</i></h4>
                        <div> 
                            {
                                [insta, face, twitter, youtube]
                                .map(
                                    x => (
                                        <img src={x} alt={x} key={x} height="40" width="40" className='grow'/>
                                    )
                                )
                            }            
                        </div>
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