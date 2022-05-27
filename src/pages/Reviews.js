import { useParams, useNavigate } from 'react-router-dom';
import '../css/reviews.css'
import close from '../assets/close.png';
import CustomRating from '../components/CustomRating';
import {ReactComponent as Verified} from '../assets/verified.svg'
import {ReactComponent as Check} from '../assets/check.svg'
import {ReactComponent as NoCheck} from '../assets/nocheck.svg'

function Reviews() {
    const navigate = useNavigate();
    const {id} = useParams();
    return (
        <div className='review-div'>
            <button className='review-close grow'
            onClick={
                () => {
                    navigate(-1);
                }
            }>
                <img src={close} alt="close" />
            </button>
            <div className='review-header'>
                <h1>Galaxy's Reviews</h1>
                <CustomRating initial={4} readonly/>
                <button className='review-butt grow' onClick={
                    () => {
                        navigate('../../writereview/pass')
                    }
                }>
                    Write a review on this product
                </button>
                
            </div>
            <div style={{overflowY : 'scroll', height : 'calc(100% - 140px)'}}>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />

            </div>


        </div>
    )

}

export default Reviews;

function ReviewCard() {
    return (
        <div className='review-card'>
            <div className='profile-pic'>

            </div>
            <div className='review-details'>
                <div className='review-content'>
                    <div>
                        <h3>Comfortable and stylish</h3>
                        <CustomRating  red={false} initial={3} readonly/>
                        <h3>Bashiru John</h3>

                    </div>
                    <h4>November 21, 2021</h4>
                </div>

                <p className='review-story'>lorem rerm er emr eremr emr em rme rme rme rme m ewmqmw emqw me mqw emq wme qmw emqw em qwme mqw emqwmeqmweqmwemqweqmwemqweqweqwe qweqwemqwe qwe qwe qwe qwe qwe qw eqwe we qw e </p>
                <div className='review-metrics'>
                    <div className='review-metrics-content'>
                        <h4>Size: </h4>
                        <h5>Accurate</h5>
                    </div>
                    <div className='review-metrics-content'>
                        <h4>Comfort:</h4>
                        <h5>Accurate</h5>
                    </div>
                    <div className='review-metrics-content'>
                        <h4>Durability:</h4>
                        <h5>Accurate</h5>
                    </div>
                </div> 
                <div className='review-card-base'>
                    <div>
                        <h4 style={{display : 'inline-block', margin : 0}}>Was this helpful ?</h4>
                        <button className='review-butt-2 grow'>Yes <Check /></button>
                        <button className='review-butt-2 grow'>No <NoCheck /></button>
                    </div>

                    <h4 className='review-verified'><Verified /> verified user</h4>
                </div>
            </div>

        </div>
    )
}

export function CreateReview() {
    const {id} = useParams();
    const navigate = useNavigate();
    return (
        <div className='review-div' style={{padding : "20px 0px"}}>
            <button className='review-close grow'
            onClick={
                () => {
                    navigate(-1);
                }
            }>
                <img src={close} alt="close" />
            </button>
            
            <div className='review-header' style={{
                borderBottom : "1px solid black"
            }}>
                <h1>Write A Review</h1>
                <h4>Tell us how you feel about our product </h4>
            </div>

            <div className='review-create-main'>
                <h3>Tap to Rate</h3>
                <CustomRating onChange={
                    e => {
                        console.log(e)
                    }
                }/>

                <h3>Review headline</h3>
                <textarea  className='review-header-input' placeholder='Give our product a unique description'/>

                <h3>My Overall Review {'(optional)'}</h3>
                <textarea  className='review-header-input-2' placeholder='Type exactly how you feel about this product. It must be atleast 50 characters long.'/>
                
                <h3>Size</h3>
                <input type='range' min={0} max={100}/>
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <h5 className='review-range-text'>Small</h5>
                    <h5 className='review-range-text'>Accurate</h5>
                    <h5 className='review-range-text'>Big</h5>
                </div>

                <h3>Comfort</h3>
                <input type='range' min={0} max={100} />
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <h5 className='review-range-text'>Not Comfortable</h5>
                    <h5 className='review-range-text'>Average</h5>
                    <h5 className='review-range-text'>Very Comfortable</h5>
                </div>

                <h3>Durability</h3>
                <input type='range' min={0} max={100}/>
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <h5 className='review-range-text'>Not Durable</h5>
                    <h5 className='review-range-text'>Average</h5>
                    <h5 className='review-range-text'>Very Durable</h5>
                </div>


                <div style={{display : "flex", marginBottom : "40px", marginTop : "20px"}}>
                    <button className='review-post-butt shadow-5 grow'>Post Review</button>
                </div>
            </div>


        </div>
    )
}