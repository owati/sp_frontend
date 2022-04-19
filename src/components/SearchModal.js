import { useEffect, useState } from "react";
import { getRequest } from "../functions/api";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import '../css/search.css'
import logo from '../assets/logo2.png';
import close from '../assets/close.png';
import search from '../assets/search.png';

function SearchModal({show, closed}) {
    const navigate = useNavigate()
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
                    firstLoad : false,
                    list : res.data.data
                }
            )
        } else if (res.status === 404) {
            setSku({
                firstLoad : false,
                list : []
            })
        }
    }

    useEffect(() => {
        const enterEvent = e => {
            if(e.key === "Enter") {
                navigate('/search/' + e.target.value);
                closed();
            }
        }
        if(show) {
            let input = document.querySelector('#search-input');
            input.addEventListener('keypress' , enterEvent)
        }
    }, [show])

    useEffect(() => {
        if (searchWord) {
            handleSearch();
        } else {
            setSku( {
                ...sku,
                firstLoad : true
            })
        }
    }, [searchWord])


    return (
        <Modal show={show} direction={'modal-top'}>
            <div className="search-modal">
                <div className="search-modal-header">
                    <img src={logo} width="70" className="logo-search"/>

                    <div className="search-modal-input">
                        <img src={search} width="20px" height="20px" />
                        <input type="text" placeholder="search" id="search-input" autoFocus
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
                    {
                        !searchWord ? 
                        <div className="popular-search">
                            <h3>Popular Searches</h3>
                        </div> : 
                        <div className="popular-search">
                            <h3 className="search-items-first"
                                onClick={
                                () => {
                                    navigate('/search/' + searchWord);
                                    closed();
                                }
                            }
                            >
                                "{searchWord}"
                            </h3> 
                            {
                                sku.list.map(
                                    item => {
                                        return <h3 className="search-items" key={item}
                                            onClick={
                                                () => {
                                                    navigate('/search/' + item);
                                                    closed();
                                                }
                                            }
                                        >{item}</h3>
                                    }
                                )
                            }
                        </div>
                    }
                </div>

            </div>
        </Modal>
    )
}

export default SearchModal;