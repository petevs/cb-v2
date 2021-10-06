export const SET_CURRENCY = 'SET_CURRENCY'

export const initialSettings = {
    currency: 'cad'
}

export const settingsReducer = (state, action) => {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        default:
            return state;
    }
}