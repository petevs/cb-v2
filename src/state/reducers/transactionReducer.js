import moment from 'moment'

export const initialTransaction = {
    date: moment().format('YYYY-MM-DD'),
    historicalPrice: 0,
    customDollars: 0,
    customPrice: 0,
    customBitcoin: 0,
    calculatedDollars: function(){
        return 1000
    },
    calculatedPrice: function(){
        return 10000
    },
    calculatedBitcoin: function(){
        return 10
    },

}

export const transactionReducer = (state, action) => {
    switch (action.type) {
        default: 
            return state
    }
}