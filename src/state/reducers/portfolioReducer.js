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
  },
  recurringBuyList: function(){

    let recurringBuyList = {}

    //If portfolio object not empy
    if(this.portfolioObj){


      //Loop through each portfolio
      for (const portfolioID in this.portfolioObj){

        //Current Portfolio
        const current = this.portfolioObj[portfolioID]

        //Initiate empty recurring buy list for current portfolio
        const currentRecurringBuyList = []

        //If there is a recurring buys object in the current portfolio
        if('recurringBuys' in current){

          //Loop through each recurring buy
          for (const buyID in current.recurringBuys){
            const currentBuy = current.recurringBuys[buyID]

            //Push the details to the current portfolio recurring buy list
            currentRecurringBuyList.push({
              id: buyID,
              purchaseAmount: currentBuy['purchaseAmount'],
              startDate: currentBuy['startDate'],
              endDate: currentBuy['endDate'],
              condition: currentBuy['condition']
            })
          }
        }

        //Take the current portfolio ID and the currentRecurring Buy List and add to Parent Recurring Buy List

        recurringBuyList = {
          ...recurringBuyList,
          [portfolioID]: currentRecurringBuyList
        }
      }

    }

    return recurringBuyList

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
