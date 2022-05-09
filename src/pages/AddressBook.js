
import { ReactComponent as Edit } from '../assets/carbon_edit.svg';
import { ReactComponent as Delete } from '../assets/carbon_delete.svg';

function AddressBook() {
    return (
        <div className='address-main'>
            <h3 className='address-title'>Available Addresses</h3>

            <div className='address-list'>
                <AddressCard isDefault />
                <AddressCard />
                <AddressCard />

                <button className='address-new-butt'>ADD NEW</button>

            </div>



        </div>
    )
}

export default AddressBook;

function AddressCard({ isDefault = false, }) {
    const data = {
        name: "Adeyemi John",
        address: "3, Adeyemi John Street, Along Onipede Expresweay, "
    }
    console.log(isDefault)
    return (
        <div className={'address-card shadow-5 ' + (isDefault ? "address-default" : "")}>
            <div className='address-card-div'>
                <div className='address-card-details'>
                    <h4 style={{ marginTop: "0px" }}>
                        {data.name}
                    </h4>

                    <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5>
                    <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5>
                    <h5 style={{ margin: "0px" }}>3, police arena, avanuew</h5>

                    <h5>+234 090 2323 12</h5>

                </div>

                {
                    isDefault ? <div className='address-card-actions'>
                        <Edit />
                    </div> :
                        <div className='address-card-actions'>
                            <div>
                                <Edit style={{
                                    marginRight : "4px"
                                }} />
                                <Delete style={{
                                    borderLeft : "2px solid black",
                                    paddingLeft : "4px"
                                }} />
                            </div>

                            <button>make default</button>

                        </div>
                }


            </div>

        </div>
    )
}