import { SET_MARKET_DATA, TOGGLE_THEME, UPDATE_DRAWER} from "state/reducers/appReducer";

export const updateDrawer = (data) => {
    return { type: UPDATE_DRAWER, payload: data}
}

export const toggleTheme = (data) => {
    return { type: TOGGLE_THEME, payload: data}
}

export const setMarketData = (data) => {
    return { type: SET_MARKET_DATA, payload: data}
}