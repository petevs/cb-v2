import { useContext } from 'react'
import { toggleModal } from 'state/actions/modalActions'
import { GlobalContext } from 'state/contexts/GlobalContext'

const useCloseModal = () => {

    const { dispatch } = useContext(GlobalContext)
    dispatch(toggleModal(false))
}

export default useCloseModal
