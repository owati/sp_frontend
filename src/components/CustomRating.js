import Rating from "react-rating";
import {ReactComponent as Star} from '../assets/star.svg';
import {ReactComponent as Redstar} from '../assets/redstar.svg';
import {ReactComponent as Blackstar} from '../assets/blackstar.svg';

function CustomRating({red = true, initial=0, readonly=false}, onChange) {
    return(
        <Rating
            initialRating={initial}
            emptySymbol={<Star/>}
            fullSymbol={red ? <Redstar /> : <Blackstar />}
            readonly={readonly}
            onChange={onChange}
        />
    )
}

export default CustomRating;