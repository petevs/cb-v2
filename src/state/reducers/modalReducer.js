export const TOGGLE_MODAL = "TOGGLE_MODAL"
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT'
export const SET_MODAL_DATA = 'SET_MODAL_DATA'

export const initialModalState = {
    open: false,
    content: null,
    data: {}
}

export const modalReducer = (state, action) => {
    switch (action.type) {
      case TOGGLE_MODAL:
        return {
          ...state,
          open: action.payload,
        };
      case SET_MODAL_DATA:
        return {
          ...state,
          data: action.payload
        }
      case SET_MODAL_CONTENT:
        return {
          ...state,
          content: action.payload
        }
      default:
        return state;
    }
  };
  