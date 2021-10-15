import { getDatesBetween } from "./getDatesBetween"
import moment from 'moment'


export const makeFillerTransactions = (transactions, historicalData, currentPrice) => {

    const dateList = getDatesBetween(transactions[0].date, moment().format('YYYY-MM-DD'))
    
    return dateList.map(item => {

        const price = historicalData[item] || currentPrice

        return {
            date: item,
            price: price,
            amount: 0,
            bitcoin: 0
        }
    }).slice(1)

}