import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getRequest, postRequest, putRequest, deleteRequest } from '../functions/api';
import { ReactComponent as Delete } from '../assets/carbon_delete.svg'
import { ReactComponent as MasterCard } from '../assets/mastercard.svg'



function PaymentInfo({ loading }) {

    const [cards, setCards] = useState([])

    

    async function getCards() {
        loading(true);
        const res = await getRequest('account/cards')
        loading(false)
        if (res?.status === 200) {
            setCards(res.data.data)
        }
    }


    async function deleteCard(number) {
        loading(true);
        const res = await deleteRequest('account/cards?number=' + number);
        loading(false)
        if (res?.status === 200) {
            toast.success('The card was deleted successfully');
            setCards(res.data.data)
        } else {
            toast.error(res.message ? res.message : res.data.message);
        }
    }

    async function addNewCard(data) {
        loading(true)
        const res = await postRequest('account/cards', data)
        loading(false)
        if (res?.status === 201) {
            toast.success('The new card was added successfully')
            setCards(res.data.data)
        } else {
            toast.error(res.message ? res.message : res.data.message)
        }
    }

    useEffect(() => {
        getCards();
    }, [])
    return (
        <div className='payment-main'>
            <h2 className='payment-header'>Credit Cards</h2>
            <CardsDisplay cards={cards} rem={deleteCard} />

            <h2 className='payment-header' style={{
                color: "rgba(93, 95, 239, 1)",
                fontStyle: "italic",
                fontWeight: "500",
                marginTop: "40px"

            }}>Add Card</h2>
            <AddCard addNew={addNewCard}/>


        </div>
    )
}

export default PaymentInfo;

function CardsDisplay({ cards, rem }) {
    return (
        <div className='payment-cards-list'>
            {
                cards.length !== 0 ? cards.map(
                    (cards, ind) => (
                        <div className='payment-card'>
                            <div style={{
                                position: "relative",
                                left: "15px",
                                backgroundColor: "white",
                                width: "30px",
                                height: "30px",
                                borderRadius: "25px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    backgroundColor: "blue",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "13px",
                                }}>

                                </div>
                            </div>
                            <div className='payment-card-detail'>
                                <h3 style={{
                                    margin: "0px",
                                    display: "flex",
                                    alignItems: "center"
                                }}>{cards.number} <MasterCard style={{
                                    marginLeft: "15px"
                                }} /></h3>
                                <Delete onClick={
                                    () => {
                                        rem(ind)
                                    }
                                } />
                            </div>
                        </div>
                    )
                ) : <div style={{
                    display: "flex",
                    height: "100%"
                }}>
                    <h2 style={{ margin: "auto", color: "rgba(0,0,0,0.4)" }}>You have no saved cards</h2>
                </div>
            }

        </div>
    )
}

function AddCard({ addNew }) {
    return (
        <div className='payment-add'>
            <div className='payment-add-info'>
                <AddCardInput type='text' label="Card holder's name" name="name" />
                <AddCardInput type='number' label="Card no." name="number" />
                <AddCardInput type='month' label="Expiry date" name="date" />
                <AddCardInput type='number' label="CVV/CVC" name="cvv" />

            </div>
            <div className='payment-add-butt'>
                <button className='grow' onClick={
                    () => {
                        const data = {};
                        Array.from(document.getElementsByClassName('payment-input'))
                            .forEach(field => {
                                const { name, value } = field;
                                data[name] = value;
                            });
                            addNew({
                            card : data
                        })
                    }
                    
                } > ADD CARD </button>
            </div>
        </div>
    )
}
export function AddCardInput({ type, onChange, label, value, name, label_style={}, disabled=false}) {
    return (
        <div className='payment-input-div'>
            <h5 style={{...label_style}}>{label}</h5>
            <input className='payment-input' disabled={disabled} type={type} name={name} value={value} onChange={onChange} />
        </div>
    )
}

export function AddCardSelect({ type, onChange, label, value, options, label_style={}}) {
    const customStyles = {
        control: (base, state) => ({
          ...base,
          boxShadow: "none",
          border: 'none',
          backgroundColor : 'transparent',
          height : '100%'
        }),
    
        menu : styles => (
            {
                ...styles,
                width : '100%'
            }
        )
      };
      
    return (
        <div className='payment-input-div'  style={{height : 'fit-content'}}>
            <h5 style={{...label_style}}>{label}</h5>

            <Select styles={customStyles}
            options={options}
            onChange={e => onChange(e)}
            value={value} />
            {/* <input className='payment-input' type={type} name={name} value={value} onChange={onChange} /> */}
        </div>
    )
}