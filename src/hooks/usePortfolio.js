
import { useContext, useMemo } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'

const usePortfolio = (id) => {

    const { state }  = useContext(GlobalContext)
    const { portfolio } = state
    
    const { portfolioObj } = state.portfolio
    const details = portfolioObj[id]

    const { current_price: price } = state.marketData.marketData
    const { currency } = state.settings

    const empty = state.portfolio.portfolioList.length < 1

    const calculatedTransactions = useMemo(() => {
        return portfolio.calculatedTransactions(id, price[currency])
    },[portfolio, id, currency, price])

    const oneOffTransactions = portfolio.oneOffTransactions(id, price[currency])
    const recurringTransactions = portfolio.recurringBuyList(id)

    const portfolioDetails = {
        details,
        empty,
        calculatedTransactions,
        oneOffTransactions,
        recurringTransactions,
        price,
        currency
    }

    return portfolioDetails

}

export default usePortfolio
