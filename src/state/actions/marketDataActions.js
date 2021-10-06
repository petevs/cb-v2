import { SET_MARKET_DATA } from "state/reducers/marketDataReducer";


export const setMarketData = (data) => {
    return { type: SET_MARKET_DATA, payload: data}
}