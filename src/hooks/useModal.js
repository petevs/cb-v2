import { useState, useContext } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { toggleModal } from 'state/actions/modalActions'

const useModal = () => {

    const { state, dispatch } = useContext(GlobalContext)
    const [modalContent, setModalContent] = useState()
    const [modalData, setModalData] = useState()
    
    const handleOpen = (type, data) => {
        setModalContent(type)
        if(data){
            setModalData(data)
        }
        dispatch(toggleModal(true))
    };

    const handleClose = () => dispatch(toggleModal(false));

    const open = state.modal.open

    const modalDetails = {
        modalData,
        modalContent,
        open,
    }

    return [modalDetails, handleOpen, handleClose]
    
}

export default useModal
