import { getDatesBetween } from "./getDatesBetween"


export const recurringTransactions = (purchaseAmount, start, end, historicalData, currentPrice) => {

    const dateList = getDatesBetween(start, end)
    
    return dateList.map(item => {

        const price = historicalData[item] || currentPrice

        return {
            date: item,
            price: price,
            amount: purchaseAmount,
            bitcoin: Number(purchaseAmount / price).toFixed(8)
        }
    })

}