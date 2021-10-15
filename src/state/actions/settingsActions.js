import { SET_CURRENCY, SET_CURRENT_PAGE } from "state/reducers/settingsReducer";

export const setCurrency = (data) => {
    return { type: SET_CURRENCY, payload: data}
}
export const setCurrentPage = (data) => {
    return { type: SET_CURRENT_PAGE, payload: data}
}