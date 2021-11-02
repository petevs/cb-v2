import { useMediaQuery } from '@mui/material'
import { useState, useContext, useMemo} from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import FormModal from 'components/FormModal'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { toggleModal } from 'state/actions/modalActions'
import PortfolioChart from 'components/PortfolioChart'
import PortfolioHeader from 'components/PortfolioHeader'


//ICONS
import MySelect from 'styledComponents/MySelect'

//COMPONENTS
import RecurringTransactions from 'components/RecurringTransactions'
import OneOffTransactions from 'components/OneOffTransactions'
import Summary from 'components/Summary'


const Portfolio = () => {

    let { id } = useParams()
    const { state, dispatch } = useContext(GlobalContext)
    const { portfolio } = state
    const { portfolioObj } = state.portfolio

    const { current_price: price} = state.marketData.marketData
    const { currency } = state.settings

    const details = portfolioObj[id]

    
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
            <>
                Add Details...
            </>
        )
    }


    //CHART SERIES & OPTIONS

      const categories = calculatedTransactions.map((item) => {
        return item.date;
      }).reverse()

      const series = [
        {
          name: `Portfolio Value (${state.settings.currency})`,
          data: calculatedTransactions.map((item) => {
            return { 
                x: item.date, 
                y: Number(item.value), 
                price: Math.round(item.price),
                totalInvested: item.totalInvested
            };
          }).reverse(),
        },
        // {
        //     name: 'Total Invested',
        //     data: calculatedTransactions.map((item) => {
        //         return {
        //             x: item.date,
        //             y: Number(item.totalInvested)
        //         }
        //     })
        // }
      ];

      const tooltip = {
          custom: function({series, seriesIndex, dataPointIndex, w}){
              const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
              return `
              <div style='padding: 2rem;'>
              Total Invested: ${data.totalInvested}
              <br />
              Portfolio Value: ${data.y} <br /> Price: ${data.price} 
              </div>
              `
          }
      }

      const customOptions = {
        yaxis: {
              show: mobile ? true : false,
        }
      }

    return (
        <>
        {/* MODAL */}
        <FormModal open={state.modal.open} onClose={handleClose}>
            {modalContent}
        </FormModal>

        {/* CONTENT */}
        <Wrapper>

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
                categories={categories}
                data={series}
                tooltip={tooltip}
                customOptions={customOptions}
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

        </Wrapper>

        </>
    )
}

export default Portfolio

const Wrapper = styled.div`
    display: grid;
    align-content: start;
    background-color: ${props => props.theme.body};
    gap: 2rem;
    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
    }
    color: #fff;
    padding: 2rem;

    & button {
        justify-self: start;
    }
`