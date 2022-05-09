import ReactLoading from 'react-loading'
import Modal from './Modal';
import '../css/loading.css'

function Loading({show=false}) {
    return (
        <Modal show={show} direction="center" added="loading">
            <ReactLoading type='bars' color='rgb(208,40,38)' />
        </Modal>
    )
}

export default Loading;