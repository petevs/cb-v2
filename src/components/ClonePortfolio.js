import React from 'react'
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { db } from 'firebase'
import { useHistory } from 'react-router-dom'

const ClonePortfolio = ({details, state, id}) => {

    const history = useHistory()

    const handleClone = () => {

        const inputs = {
            portfolioName: details.portfolioName,
            portfolioDescription: details.portfolioDescription
        }

        const inputCopy = {
            ...inputs,
            portfolioName: `${inputs.portfolioName} (COPY) `
        }

        const newPortfolioId = Date.now()
        db.collection('users').doc(state.user.uid).update({
            portfolio: 
                {
                    ...state.portfolio.portfolioObj,
                    [newPortfolioId]: {
                        ...state.portfolio.portfolioObj[id],
                        ...inputCopy
                    }
                }
        })

        history.push(`/portfolio/${newPortfolioId}`)
    }

    return (
        <Button
        startIcon={<ContentCopyIcon />}
        onClick={handleClone}
    >
        Clone
    </Button>
    )
}

export default ClonePortfolio
