import { CatchingPokemonSharp } from '@mui/icons-material';
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

  },
  recurringBuyTransactions: function() {

    let parentRbTrans = {}
  
    if(this.recurringBuyList()){

      //GO THROUGH EACH PORTFOLIO IN RECURRING BUY LIST
      for (const portfolio in this.recurringBuyList()){
        const currentPortfolio = this.recurringBuyList()[portfolio]

        let portfolioTransactions = []

        //GO THROUGH EACH RECURRING BUY IN CURRENT PORTFOLIO
        for(const buy in currentPortfolio){

          const dataLength = this.historicalData.length

          const currentBuy = currentPortfolio[buy]
            
          const today = moment()
          const endDate = moment(currentBuy.endDate)
          const startDate = moment(currentBuy.startDate)

          const daysFromStart = today.diff(startDate, 'days')
          const daysFromEnd = today.diff(endDate, 'days')

          const startIndex = dataLength - daysFromStart - 1
          const endIndex = dataLength - daysFromEnd - 1

          const currentBuyTransactions = this.historicalData.slice(startIndex, endIndex).map(item => {
            const friendlyDate = moment(item[0]).format('YYYY-MM-DD')
            const price = item[1]

            return {
              date: friendlyDate,
              price: Math.round(price),
              amount: Number(currentBuy.purchaseAmount)
            }
          })

          portfolioTransactions = [...portfolioTransactions, ...currentBuyTransactions]

        }

        //SORT PORTFOLIO TRANSACTIONS BY DATE

        portfolioTransactions = portfolioTransactions.sort((a,b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        //ADD TRANSACTIONS TO PARENT RECURRING BUY TRANSACTIONS

        parentRbTrans = {
          ...parentRbTrans,
          [portfolio]: portfolioTransactions
        }

      }
    }

    return parentRbTrans
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
