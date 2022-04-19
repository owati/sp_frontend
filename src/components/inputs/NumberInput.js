import { useState } from 'react';
import '../../css/numberinput.css';
import arrow_up from '../../assets/arrow-up.png';
import arrow_down from '../../assets/arrow-down.png'

function NumberInput({ onChange }) {
    const [number, setNumber] = useState(1)
    return (
        <div style={{
            display: "flex",
            border: "2px solid black",
            width: "100%",
            height: "40px"
        }}>
            <input type="number" className='number-input' value={number} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "30%"
            }}>
                <button className='direct-but'>
                    <img src={arrow_up} alt="arrow up" />
                </button>

                <button className='direct-but'
                    style={{
                        borderTop: "2px solid black"
                    }}
                >
                    <img src={arrow_down} alt="arrow down" />
                </button>

            </div>
        </div>
    )
}

export default NumberInput;