import moment from 'moment'

export const recurringBuy = (purchaseAmount, start, end, historicalData) => {

    const dataLength = historicalData.length

    if(dataLength < 1){
        return null
    }

    const today = moment()
    const endDate = moment(end)
    const startDate = moment(start)

    const daysDiff = today.diff(startDate, 'days')
    const daysFromEnd = today.diff(endDate, 'days')

    const startIndex = dataLength - daysDiff - 1
    const endIndex = dataLength - daysFromEnd - 1

    let runningBal = 0
    let totalInvested = 0

    const calculatedValues = historicalData.slice(startIndex, endIndex).map(item => {
        
        const friendlyDate = moment(item[0]).format('YYYY-MM-DD')
        const price = item[1]

        totalInvested = Number(totalInvested) + Number(purchaseAmount)
        const bitcoinAdded = Number((purchaseAmount / price))
        runningBal = runningBal + bitcoinAdded
        const value = Number((price * runningBal).toFixed(2));
        const profit = value - totalInvested;
        const roi = ((value - totalInvested) / totalInvested) * 100;

        return {
            date: friendlyDate,
            price: Math.round(price),
            totalInvested: Math.round(totalInvested),
            runningBal: runningBal.toFixed(8),
            value: Math.round(value),
            profit: Math.round(profit),
            roi: roi.toFixed(2),
            days: daysDiff
        }
    })

    return calculatedValues

}