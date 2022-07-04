import { useEffect, useState } from 'react';
import { NotifyMe } from './Home';
import SkuGrid from '../components/SkuGrid';
import SkuCard from '../components/SkuCard';
import { getRequest } from '../functions/api';

function NewReleases() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    async function getProducts() {
        setLoading(true);
        const response = await getRequest('NewReleases')
        setLoading(false);
        if (response?.status === 200) {
            setProducts(response?.data.data)
        }
    }

    useEffect(() => {getProducts()}, [])
    return (
        <div style={{
            padding: "0px 25px",
            display: 'flex',
            flexDirection: 'column',
            alignContent: "center"
        }}>
            <h1 style={{
                fontStyle: "italic",
                fontWeight: "1000"
            }}>New Releases</h1>
            <SkuGrid>
                {
                    products.map((sku, id) => <div key={'sku' + id} style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>

                        <SkuCard sku={sku
                        } styles={{
                            margin: "0px",
                            marginBottom: "40px"
                        }} />
                    </div>)
                }
            </SkuGrid>
            <NotifyMe />
        </div>
    )
}

export default NewReleases;