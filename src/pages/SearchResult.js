import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import SkuCard from '../components/SkuCard';
import SkuGrid from '../components/SkuGrid';
import { getRequest } from '../functions/api';


function SearchResult() {
    const { name } = useParams()
    const [data, setData] = useState([]);

    async function fetchData() {
        const response = await getRequest('sku/search/filter?q=' + name);
        if (response.status === 200) {
            setData(response.data.data);
        } else {
            setData([])
        }
    }

    useEffect(
        () => {
            fetchData();
        }, [name]
    )

    return (
        <div style={{
            padding : '0px 25px'
        }}>
            <h4 style={{fontWeight : "400"}}>Search result for</h4>
            <h1 style={{
                fontStyle : "italic",
                fontWeight : "1000"
            }}>"{name}"</h1>

            {
                data.length === 0 ?
                <div style={{
                    marginBottom : "40px"
                }}>
                    <h1 style={{textAlign : "center"}}>No Item could fit your match</h1>
                    <h3 style={{textAlign : "center", margin: "0px"}}>This means that we find anything that could</h3>
                    <h3 style={{textAlign : "center", margin: "0px"}}>fit your searchword.</h3>

                </div> : 
                <SkuGrid>
                    {/* {
                        data.map( sku => {
                            return <SkuCard />
                        })
                    } */}

                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                    <SkuCard />
                </SkuGrid>
            }
        </div>
    )
}

export default SearchResult;