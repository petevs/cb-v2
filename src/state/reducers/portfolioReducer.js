import moment from 'moment'

export const SET_PORTFOLIOS = "SET_PORTFOLIOS";
export const UPDATE_HISTORICAL_DATA_PF = "UPDATE_HISTORICAL_DATA_PF"

export const initialPortfolioState = {
  portfolioList: [],
  portfolioObj: {},
  historicalData: [],
  historicalDataObj: function(){

    let data = []

      this.historicalData.forEach(item => {

        const friendlyDate = moment(item[0]).format('YYYY-MM-DD')

        data = {
          ...data,
          [friendlyDate]: item[1]
        }
      })

    return data
  }
};

export const portfolioReducer = (state, action) => {
  switch (action.type) {
    case SET_PORTFOLIOS:
      return {
        ...state,
        portfolioList: action.payload.portfolioList,
        portfolioObj: action.payload.portfolioObj
      };
    case UPDATE_HISTORICAL_DATA_PF:
      return {
        ...state,
        historicalData: action.payload
      }
    default:
      return state;
  }
};
