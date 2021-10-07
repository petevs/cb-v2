import { SET_PORTFOLIOS } from "../reducers/portfolioReducer";

export const setPortfolios = (data) => {
  return { type: SET_PORTFOLIOS, payload: data };
};
