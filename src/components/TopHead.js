import { useState, useEffect } from 'react';
import '../css/tophead.css';
import { getRequest } from '../functions/api';

function TopHead() {
    let [infos, setInfo] = useState([]);
    let [current, setCurr] = useState(0);


    useEffect(async () => {
        const response = await getRequest('info');
        if (response.status === 200) {
            setInfo(response.data.data);
        }
    }, [])
    
    useEffect(() => {
        var timer; 
        timer = setInterval(() => {
            setCurr(current => {
                if (current >= infos.length - 1) {
                    return 0;
                } else {
                    return current + 1;
                }
            })
        }, 5000)
        return function cleanup () {
            clearInterval(timer);
        }
    }, [infos])

    function slideInfo(add = true) {
        if (add) {
            if (current >= infos?.length - 1) {
                setCurr(0)
            } else {
                setCurr(current + 1);
            }
        } else {
            if (current <= 0) {
                setCurr(infos.length - 1)
            } else {
                setCurr(current - 1);
            }
        }
    }

    return infos.length !== 0 ? (
        <div className='top'>
            <h3 className="off" style={{ margin: "0px" }}
                onClick={() => { slideInfo(false) }}>{'<'}</h3>

            <h5 className="slide">{infos[current].details}</h5>

            <h3 className="off" style={{ margin: "0px" }}
                onClick={() => { slideInfo() }}>{'>'}</h3>
        </div>
    ) : <></>
}

export default TopHead;