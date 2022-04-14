import { useEffect, useState } from "react";
import { getRequest } from "../functions/api";
import Modal from "./Modal";
import '../css/search.css'
import logo from '../assets/logo2.png';
import close from '../assets/close.png';
import search from '../assets/search.png';

function SearchModal({show, closed}) {
    const [sku, setSku] = useState({
        firstLoad : true, 
        list : []
    });
    const [searchWord, setWord] = useState("")

    async function handleSearch() {
        const res = await getRequest('sku/search/suggest?q=' + searchWord);
        if (res.status === 200) {
            setSku(
                {
                    ...sku,
                    firstLoad : false,
                    list : res.data.data
                }
            )
        }
    }
    useEffect(() => {
        handleSearch();
    }, [searchWord])
    return (
        <Modal show={show} direction={'modal-top'}>
            <div className="search-modal">
                <div className="search-modal-header">
                    <img src={logo} width="70" className="logo-search"/>

                    <div className="search-modal-input">
                        <img src={search} width="20px" height="20px" />
                        <input type="text" placeholder="search" autoFocus
                            value={searchWord}
                            onChange={
                                e => {
                                    setWord(e.target.value)
                                }
                            }
                        />
                    </div>

                    <button className="search-modal-close  grow"
                        onClick={
                            () => {
                                closed();
                            }
                        }
                    >
                        <img src={close}/>
                    </button>
                </div>

                <div className="search-modal-result">
                    <div className="popular-search">
                        <h3>Popular Searches</h3>

                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default SearchModal;