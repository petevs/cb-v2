import { useContext } from 'react'
import { setModalContent, toggleModal } from 'state/actions/modalActions'
import { GlobalContext } from 'state/contexts/GlobalContext'

const useOpenModal = (content) => {

    const { dispatch } = useContext(GlobalContext)

    dispatch(setModalContent(content))
    dispatch(toggleModal(true))

}

export default useOpenModal
