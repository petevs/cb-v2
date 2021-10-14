import { getDatesBetween } from "./getDatesBetween"


export const recurringTransactions = (purchaseAmount, start, end, historicalData) => {

    const dateList = getDatesBetween(start, end)
    
    return dateList.map(item => {

        const price = historicalData[item]

        return {
            date: item,
            price: price,
            amount: purchaseAmount,
            bitcoin: Number(purchaseAmount / price).toFixed(8)
        }
    })

}