import { NotifyMe } from './Home';
import SkuGrid from '../components/SkuGrid';
import SkuCard from '../components/SkuCard';

function Trending() {
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
                        margin : "0px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px"
                    }} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <SkuCard styles={{
                        margin : "0px"
                    }} />
                </div>


            </SkuGrid>
            <NotifyMe />
        </div>
    )
}

export default Trending;