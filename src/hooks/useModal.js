import { useState, useContext } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { toggleModal } from 'state/actions/modalActions'

const useModal = () => {

    const { dispatch } = useContext(GlobalContext)
    const [modalContent, setModalContent] = useState()
    
    const handleOpen = (type) => {
        setModalContent(type)
        dispatch(toggleModal(true))
    };

    const handleClose = () => dispatch(toggleModal(false));

    return [modalContent, handleOpen, handleClose]
    
}

export default useModal
