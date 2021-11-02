import React from 'react'
import ScoreCards from 'styledComponents/ScoreCards'
import Scorecard from '../../../components/Scorecard'

const Summary = ({calculatedTransactions, price, currency}) => {

    const summary = () => {
        const length = calculatedTransactions.length
        const last = calculatedTransactions[length - 1]

        let summary = {
            totalInvested: '0.00',
            balance: '0.00000000',
            value: '0.00',
            profit: '0.00',
            roi: '0.00' 
        }

        if (last){

            const totalInvested = last['totalInvested']
            const balance = last['runningBal'].toFixed(8)
            const value = (Number(balance) * Number(price[currency])).toFixed(2)
            const profit = Math.round(Number(value) - Number(totalInvested))
            const roi = ((Number(profit) / Number(totalInvested)) * 100).toFixed(2)
            const averageCost = (Number(totalInvested) / Number(balance)).toFixed(2)


            summary = {
                ...summary,
                totalInvested: totalInvested,
                balance: balance,
                value: value,
                profit: profit,
                roi: roi,
                averageCost: averageCost
            }
        }

        return [
            {title: 'Total Invested', value: summary.totalInvested  , prefix: '$', suffix: '', thousandSeparator: true},
            {title: 'Bitcoin Holdings', value: summary.balance, prefix: '', suffix: ''},
            {title: 'Current Value', value: summary.value, prefix: '$', suffix: '', thousandSeparator: true},
            {title: 'Average Cost', value: summary.averageCost, prefix: '$', suffix: '', thousandSeparator: true},
            {title: 'Gain / Loss', value: summary.profit, prefix: '$', suffix: '', thousandSeparator: true},
            {title: 'ROI', value: summary.roi, prefix: '', suffix: '%', thousandSeparator: true},
        ]
        }




    return (
        <ScoreCards>
            {
                summary().map(item => (
                    <Scorecard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        thousandSeparator={item.thousandSeparator}
                    />
                ))
            }
        </ScoreCards>
    )
}

export default Summary
