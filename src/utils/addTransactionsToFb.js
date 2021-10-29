import { db } from 'firebase'

export const addTransactionsToFb = (list, uid, state, portfolioId) => {
    let newTransactions = {}
    let currentId = Date.now()

    list.forEach(transaction => {

        currentId = currentId + 60

        newTransactions = {
            ...newTransactions,
            [currentId]: transaction
        }
    })

    db.collection('users').doc(uid).update({
        portfolio: {
            ...state.portfolio.portfolioObj,
            [portfolioId]: {
                ...state.portfolio.portfolioObj[portfolioId],
                transactions: {
                    ...state.portfolio.portfolioObj[portfolioId].transactions,
                    ...newTransactions
                }
            }
        }
    })

}