import { useParams, useNavigate } from 'react-router-dom';
import '../css/reviews.css'
import close from '../assets/close.png';
import CustomRating from '../components/CustomRating';
import {ReactComponent as Verified} from '../assets/verified.svg'
import {ReactComponent as Check} from '../assets/check.svg'
import {ReactComponent as NoCheck} from '../assets/nocheck.svg'

function Reviews() {
    const navigate = useNavigate()
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
                <button className='review-butt grow'>
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
    return (
        <div>
            <h1>Create Review</h1>
        </div>
    )
}