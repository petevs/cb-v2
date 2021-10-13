import { TOGGLE_MODAL } from "state/reducers/modalReducer"

export const toggleModal = (data) => {
    return { type: TOGGLE_MODAL, payload: data }
}