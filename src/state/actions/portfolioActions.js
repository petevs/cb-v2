import { SET_PORTFOLIOS, UPDATE_HISTORICAL_DATA_PF, UPDATE_HISTORICAL_DATA_OBJ } from "../reducers/portfolioReducer";

export const setPortfolios = (data) => {
  return { type: SET_PORTFOLIOS, payload: data };
};

export const updateHistoricalDataPF = (data) => {
  return { type: UPDATE_HISTORICAL_DATA_PF, payload: data };
};


export const updateHistoricalDataObj = (data) => {
  return { type: UPDATE_HISTORICAL_DATA_OBJ, payload: data}
}