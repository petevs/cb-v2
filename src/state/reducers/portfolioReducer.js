import moment from 'moment'
import { makeFillerTransactions } from 'utils/makeFillerTransactions';
import { recurringTransactions } from 'utils/recurringTransactions';

export const SET_PORTFOLIOS = "SET_PORTFOLIOS";
export const UPDATE_HISTORICAL_DATA_PF = "UPDATE_HISTORICAL_DATA_PF"
export const UPDATE_HISTORICAL_DATA_OBJ = "UPDATE_HISTORICAL_DATA_OBJ"

export const initialPortfolioState = {
  portfolioList: [],
  portfolioObj: {},
  historicalData: {},
  recurringBuyList: function(id){
    const buyList = []

    const details = this.portfolioObj[id]

    if(details && 'recurringBuys' in details){
      for (const buyID in details.recurringBuys){
          const current = details.recurringBuys[buyID]

          buyList.push({
              id: buyID,
              purchaseAmount: current['purchaseAmount'],
              startDate: current['startDate'],
              endDate: current['endDate'],
              condition: current['condition']
          })
        }
    }

    return buyList

  },
  oneOffTransactions: function(id, currentPrice){
    const transactionList = []

    const details = this.portfolioObj[id]

    if(details && 'transactions' in details){
      for (const transactionID in details.transactions){
        const transaction = details.transactions[transactionID]

        transactionList.push({
            id: transactionID,
            amount: transaction['amount'],
            date: transaction['date'],
            price: transaction['price'] || this.historicalData[transaction['date']] || currentPrice,
            type: transaction['type'],
            historicalPrice: this.historicalData[transaction['date']] || currentPrice,
            bitcoin: transaction['bitcoin']

        })
      }
    }

    return transactionList.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  },
  calculatedTransactions: function(id, currentPrice){

    let oneOffPortfolioList = []

    if(this.oneOffTransactions(id, currentPrice).length >= 1){
      oneOffPortfolioList = makeFillerTransactions(
        this.oneOffTransactions(id, currentPrice), 
        this.historicalData,
        currentPrice
        )
    }

    oneOffPortfolioList = [...oneOffPortfolioList, ...this.oneOffTransactions(id,currentPrice)]

    // Create All Transactions

    if(this.portfolioList.length < 1){
      return
    }

    let allTransactions = []

    // Go through each recurring buy and add to all transactions

    for (const key in this.recurringBuyList(id)) {
      const item = this.recurringBuyList(id)[key]

      const buyList = recurringTransactions(
        item.purchaseAmount,
        item.startDate,
        item.endDate,
        this.historicalData,
        currentPrice
      )

      allTransactions = [...allTransactions, ...buyList]
    }

    allTransactions = [...allTransactions, ...oneOffPortfolioList]

    //Sort by Date
    allTransactions = allTransactions.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    // Get running balance and other calculations for all transactions

    let runningBal = 0
    let totalInvested = 0

    const finalCalculatedTransactions = allTransactions.map(item => {

          let bitcoinAdded
          let value
          let profit
          let roi

          if(item.type === 'buy'){
            
              totalInvested = Number(totalInvested) + Number(item.amount)
              bitcoinAdded = Number((item.amount / item.price))
              runningBal = runningBal + bitcoinAdded
          }

          if(item.type === 'sell'){
            runningBal = runningBal - Number(item.bitcoin)
          }

          value = (item.historicalPrice * runningBal).toFixed(2);
          profit = value - totalInvested;
          roi = ((value - totalInvested) / totalInvested) * 100;


            return {
                date: item.date,
                price: item.price,
                amount: Number(item.amount),
                totalInvested: totalInvested,
                runningBal: runningBal,
                value: value,
                profit: profit,
                roi: roi

            }
    })

    return finalCalculatedTransactions
  },
  summary: function(id){
    const length = this.calculatedTransactions(id).length

    return this.calculatedTransactions(id)[length - 1]
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
      };
    case UPDATE_HISTORICAL_DATA_OBJ:
      return {
        ...state,
        historicalData: action.payload
      };
    default:
      return state;
  }
};
