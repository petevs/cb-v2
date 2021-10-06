import { SET_CURRENCY } from "state/reducers/settingsReducer";

export const setCurrency = (data) => {
    return { type: SET_CURRENCY, payload: data}
}