import { useParams, useNavigate } from 'react-router-dom';
import '../css/reviews.css'
import close from '../assets/close.png';
import CustomRating from '../components/CustomRating';

function Reviews() {
    const navigate = useNavigate()
    return (
        <div className='result-div'>
            <button className='result-close grow'
            onClick={
                () => {
                    navigate(-1);
                }
            }>
                <img src={close} alt="close" />
            </button>
            <div className='result-header'>
                <h1>Galaxy's Reviews</h1>
                <CustomRating initial={4} readonly/>
                
            </div>

        </div>
    )

}

export default Reviews;

function ResultCard() {
    return (
        <div>

        </div>
    )
}

export function CreateReview() {
    return (
        <div>

        </div>
    )
}