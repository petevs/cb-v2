export const SET_PORTFOLIOS = "SET_PORTFOLIOS";

export const initialPortfolioState = {
  portfolios: []
};

export const portfolioReducer = (state, action) => {
  switch (action.type) {
    case SET_PORTFOLIOS:
      return {
        ...state,
        portfolios: action.payload
      };
    default:
      return state;
  }
};
