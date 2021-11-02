import { useContext } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { toggleModal } from 'state/actions/modalActions'
import { setModalContent } from 'state/actions/modalActions'

const useModal = () => {

    const { state, dispatch } = useContext(GlobalContext)
    const {
        open,
        content: modalContent 
    } = state.modal
    
    const handleOpen = (type) => {
        dispatch(setModalContent(type))
        dispatch(toggleModal(true))
    };

    const handleClose = () => dispatch(toggleModal(false));


    return [open, modalContent, handleOpen, handleClose]
    
}

export default useModal
