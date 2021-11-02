import { SET_MODAL_CONTENT, SET_MODAL_DATA, TOGGLE_MODAL } from "state/reducers/modalReducer"

export const toggleModal = (data) => {
    return { type: TOGGLE_MODAL, payload: data }
}

export const setModalContent = (data) => {
    return { type: SET_MODAL_CONTENT, payload: data}
}

export const setModalData = (data) => {
    return { type: SET_MODAL_DATA, payload: data}
}