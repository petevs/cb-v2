import { useContext } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { toggleModal } from 'state/actions/modalActions'
import { setModalContent } from 'state/actions/modalActions'
import { setModalData } from 'state/actions/modalActions'
import { updateDrawer } from 'state/actions/themeActions'
import { setCurrentPage } from 'state/actions/settingsActions'

const useModal = () => {

    const { state, dispatch } = useContext(GlobalContext)
    const {
        open,
        content: modalContent 
    } = state.modal
    
    const handleOpen = (type, data) => {
        dispatch(setModalData(data))
        console.log(state.modal.data)
        dispatch(setModalContent(type))
        dispatch(toggleModal(true))
    };

    const handleClose = () => {
        dispatch(updateDrawer(false))
        dispatch(toggleModal(false))
    };


    return [open, modalContent, handleOpen, handleClose]
    
}

export default useModal
