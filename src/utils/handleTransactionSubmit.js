import { db } from 'firebase'

export const handleTransactionSubmit = (e, transactionId, portfolioId, state, values, handleClose) => {
    e.preventDefault()

    //Use transactionId if editing or make new id if new transaction
    const firebaseId = transactionId || Date.now()

    db.collection('users').doc(state.user.uid).update({
        portfolio: {
            ...state.portfolio.portfolioObj,
            [portfolioId]: {
                ...state.portfolio.portfolioObj[portfolioId],
                transactions: {
                    ...state.portfolio.portfolioObj[portfolioId].transactions,
                    [firebaseId]: values
                }
            }
        }
    })

    handleClose()
}