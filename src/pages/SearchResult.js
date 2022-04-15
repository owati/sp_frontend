import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getRequest } from '../functions/api';


function SearchResult() {
    const {name} = useParams()
    const [data, setData] = useState([]);

    async function fetchData () {
        const response = await getRequest('search/filter?q=' + name);
        if (response.status === 200) {
            setData(response.data.data);
        }
    }

    useEffect(
        () => {
            fetchData();
        }, []
    )

    return (
        <>
            <h2>{name}</h2>
        </>
    )
}

export default SearchResult;