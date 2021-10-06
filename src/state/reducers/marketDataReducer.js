export const SET_MARKET_DATA = "SET_MARKET_DATA"


export const initialMarketData = {
    loading: true,
}

export const marketDataReducer = (state, action) => {
    switch(action.type) {
        case SET_MARKET_DATA:
            return {
                ...state,
                marketData: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}