import { useRef } from "react";
import Modal from "./Modal";
import '../css/search.css'
import logo from '../assets/logo2.png';
import close from '../assets/close.png';
import search from '../assets/search.png';

function SearchModal({show}) {

    return (
        <Modal show={show} direction={'modal-top'}>
            <div className="search-modal">
                <div className="search-modal-header">
                    <img src={logo} width="70"/>

                    <div className="search-modal-input">
                        <img src={search} width="20px" height="20px"/>
                        <input type="text" autoFocus/>
                    </div>

                    <button className="search-modal-close  grow">
                        <img src={close}/>
                    </button>
                </div>

                <div className="search-modal-result">

                </div>

            </div>
        </Modal>
    )
}

export default SearchModal;