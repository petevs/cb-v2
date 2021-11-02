import { useState, useContext } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { toggleModal } from 'state/actions/modalActions'

const useModal = () => {

    const { state, dispatch } = useContext(GlobalContext)
    const [modalContent, setModalContent] = useState()
    
    const handleOpen = (type) => {
        setModalContent(type)
        dispatch(toggleModal(true))
    };

    const handleClose = () => dispatch(toggleModal(false));

    const open = state.modal.open

    return [open, modalContent, handleOpen, handleClose]
    
}

export default useModal
