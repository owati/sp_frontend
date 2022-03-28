import { useEffect } from 'react';
import '../css/sidebar.css';
import Modal from '../components/Modal';

function SideBar({ show }) {
    
    useEffect ( () => {
        if (show) {
            let side = document.getElementsByClassName('sidebar')[0];
            side.style.width = "300px";
        }
    }, [show])
    return (
        <Modal show={show} direction='left' added="no-mode">
            <div className='sidebar'>

            </div>
        </Modal>
    )
}

export default SideBar;