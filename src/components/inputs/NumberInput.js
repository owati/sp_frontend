import { useState } from 'react';
import '../../css/numberinput.css';
import arrow_up from '../../assets/arrow-up.png';
import arrow_down from '../../assets/arrow-down.png'

function NumberInput({ onChange, min = 1, max = 10}) {
    const [number, setNumber] = useState(1)
    return (
        <div style={{
            display: "flex",
            border: "2px solid black",
            borderRadius: "3px",
            width: "100%",
            height: "40px"
        }}>
            <input type="number" className='number-input' value={number} 
                onChange={
                    e => {
                        setNumber(e.target.value)
                    }
                }
            />
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "30%"
            }}>
                <button className='direct-but'
                    onClick = {
                        () => {
                            setNumber(number + 1 > max ? number : number + 1);
                        }
                    }
                >
                    <img src={arrow_up} alt="arrow up" 
                    />
                </button>

                <button className='direct-but'
                    style={{
                        borderTop: "2px solid black"
                    }}
                    onClick = {
                        () => {
                            setNumber(number - 1 < min ? number : number - 1);
                        }
                    }
                >
                    <img src={arrow_down} alt="arrow down" />
                </button>

            </div>
        </div>
    )
}

export default NumberInput;