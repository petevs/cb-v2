import { useMediaQuery } from '@mui/material'
import { useState, useContext, useMemo} from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import FormModal from 'components/FormModal'
import { useParams } from 'react-router'
import { toggleModal } from 'state/actions/modalActions'


//ICONS
import MySelect from 'styledComponents/MySelect'

//COMPONENTS
import RecurringTransactions from 'components/RecurringTransactions'
import OneOffTransactions from 'components/OneOffTransactions'
import Summary from 'components/Summary'
import PortfolioChart from 'components/PortfolioChart'
import PortfolioHeader from 'components/PortfolioHeader'

//STYLED-COMPONENTS
import PageWrapper from 'styledComponents/PageWrapper'


const Portfolio = () => {

    let { id } = useParams()
    const { state, dispatch } = useContext(GlobalContext)
    const { portfolio } = state
    const { portfolioObj } = state.portfolio

    const { current_price: price} = state.marketData.marketData
    const { currency } = state.settings

    const details = portfolioObj[id]

    console.log(state)

    
    // MODAL

    const [modalContent, setModalContent] = useState()
    
    const handleOpen = (type) => {
        setModalContent(type)
        dispatch(toggleModal(true))
    };
    
    const handleClose = () => dispatch(toggleModal(false));

    const calculatedTransactions = useMemo(() => {
        return portfolio.calculatedTransactions(id, price[currency])
    },[portfolio, id, currency, price])

    //MediaQuery
    const mobile = useMediaQuery('(min-width:1024px')

    //If No Portfolio Data...
    if(state.portfolio.portfolioList.length < 1 ){
        return(
            <>Add Details...</>
        )
    }

    return (
        <>
        {/* MODAL */}
        <FormModal open={state.modal.open} onClose={handleClose}>
            {modalContent}
        </FormModal>

        {/* CONTENT */}
        <PageWrapper>

            <PortfolioHeader 
                details={{...details}}
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
                state={state}
            />

            <Summary
                calculatedTransactions={calculatedTransactions}
                price={price}
                currency={currency}
            />

            <MySelect>
                <option>Portfolio Value Over Time</option>
                <option>Bitcoin Holdings</option>
            </MySelect>

            <PortfolioChart
                calculatedTransactions={calculatedTransactions}
                currency={currency}
                mobile={mobile}
            />

            <RecurringTransactions 
                title='RecurringTransactions'
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
                data={portfolio.recurringBuyList(id)}
            />

            <OneOffTransactions 
                title='One-Off Transactions'
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
                data={portfolio.oneOffTransactions(id, price[currency])}
            />

        </PageWrapper>

        </>
    )
}

export default Portfolio