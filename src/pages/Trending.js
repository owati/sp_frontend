import { useEffect, useState } from 'react';
import { NotifyMe } from './Home';
import SkuGrid from '../components/SkuGrid';
import SkuCard from '../components/SkuCard';
import { getRequest } from '../functions/api';

function Trending() {
    const [loading , setLoading ] = useState(false);

    async function getProducts() {
        setLoading(true);
        const response = await getRequest('trending')
        setLoading(false);
        if (response?.status === 200) {

        }
    }
    return (
        <div style={{
            padding: "0px 25px",
            display: 'flex',
            flexDirection: 'column',
            alignContent: "center"
        }}>
            <h1 style={{
                fontStyle : "italic",
                fontWeight : "1000"
            }}>Trending</h1>
            <SkuGrid>
                
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px",
                        marginBottom : "40px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px",
                        marginBottom : "40px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px",
                        marginBottom : "40px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px",
                        marginBottom : "40px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px",
                        marginBottom : "40px"
                    }} />
                </div>


            </SkuGrid>
            <NotifyMe />
        </div>
    )
}

export default Trending;
