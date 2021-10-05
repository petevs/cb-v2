export const UPDATE_DRAWER = "UPDATE_DRAWER"

export const initialApp = {
    drawer: false
}

export const appReducer = (state, action) => {
    switch(action.type) {
        case UPDATE_DRAWER:
            return {
                ...state,
                drawer: action.payload
            };
        default:
            return state;
    }
}