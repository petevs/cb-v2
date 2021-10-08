export const SET_PORTFOLIOS = "SET_PORTFOLIOS";

export const initialPortfolioState = {
  portfolioList: [],
  portfolioObj: {}
};

export const portfolioReducer = (state, action) => {
  switch (action.type) {
    case SET_PORTFOLIOS:
      return {
        ...state,
        portfolioList: action.payload.portfolioList,
        portfolioObj: action.payload.portfolioObj
      };
    default:
      return state;
  }
};
