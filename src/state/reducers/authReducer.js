export const SET_USER = "SET_USER";

export const initialAuthState = {};

export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        isAnonymous: action.payload.isAnonymous
      };
    default:
      return state;
  }
};
