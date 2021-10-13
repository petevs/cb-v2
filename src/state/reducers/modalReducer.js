export const TOGGLE_MODAL = "TOGGLE_MODAL"


export const initialModalState = {
    open: false,
}

export const modalReducer = (state, action) => {
    switch (action.type) {
      case TOGGLE_MODAL:
        return {
          ...state,
          open: action.payload,
        };
      default:
        return state;
    }
  };
  