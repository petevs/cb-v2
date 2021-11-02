import FormModal from 'components/FormModal'
import { useParams } from 'react-router'


//ICONS
import MySelect from 'styledComponents/MySelect'

//COMPONENTS
import RecurringTransactions from './components/RecurringTransactions'
import OneOffTransactions from './components/OneOffTransactions'
import Summary from './components/Summary'
import PortfolioChart from './components/PortfolioChart'
import PortfolioHeader from './components/PortfolioHeader'

//STYLED-COMPONENTS
import PageWrapper from 'styledComponents/PageWrapper'
import useModal from 'hooks/useModal'
import usePortfolio from 'hooks/usePortfolio'


const Portfolio = () => {

    //Get Portfolio Id From Params
    let { id } = useParams()

    //Get Portfolio Details
    const {
        details,
        empty,
        calculatedTransactions,
        oneOffTransactions,
        recurringTransactions,
        price,
        currency
    } = usePortfolio(id)


    const [open, modalContent, handleOpen, handleClose] = useModal()

    //If No Portfolio Data...
    if ( empty ) {
        return <>Add Details...</>
    }

    return (
        <>
        {/* MODAL */}
        <FormModal open={open} onClose={handleClose}>
            {modalContent}
        </FormModal>

        {/* CONTENT */}
        <PageWrapper>

            <PortfolioHeader 
                details={{...details}}
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
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
            />

            <RecurringTransactions 
                title='RecurringTransactions'
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
                data={recurringTransactions}
            />

            <OneOffTransactions 
                title='One-Off Transactions'
                handleOpen={handleOpen}
                handleClose={handleClose}
                id={id}
                data={oneOffTransactions}
            />

        </PageWrapper>

        </>
    )
}

export default Portfolio