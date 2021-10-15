export const SET_CURRENCY = 'SET_CURRENCY'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export const initialSettings = {
    currency: 'cad',
    currentPage: ''
}

export const settingsReducer = (state, action) => {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}