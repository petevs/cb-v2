import { Button, Table, TableRow, TableCell, TableBody, useMediaQuery } from '@mui/material'
import React, { useState, useContext, useEffect, useMemo } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import RecurringBuyForm from 'components/RecurringBuyForm'
import FormModal from 'components/FormModal'
import styled from 'styled-components'
import MyTableHead from 'styledComponents/MyTableHead'
import { useParams } from 'react-router'
import EditPortfolioForm from 'components/EditPortfolioForm'
import MyTableRow from 'styledComponents/MyTableRow'
import TransactionForm from 'components/TransactionForm'
import { toggleModal } from 'state/actions/modalActions'
import PortfolioChart from 'components/PortfolioChart'
import { setCurrentPage } from 'state/actions/settingsActions'
import ScoreCards from 'styledComponents/ScoreCards'
import Scorecard from 'components/Scorecard'
import PortfolioHeader from 'components/PortfolioHeader'
import NumberFormat from 'react-number-format'


//ICONS
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MySelect from 'styledComponents/MySelect'
import DeleteTransaction from 'components/DeleteTransaction'
import Currency from 'components/Currency'


const Portfolio = () => {

    let { id } = useParams()
    const { state, dispatch } = useContext(GlobalContext)
    const { portfolio } = state
    const { portfolioObj } = state.portfolio

    const { current_price: price} = state.marketData.marketData
    const { currency } = state.settings

    useEffect(() => {
        dispatch(setCurrentPage(id))
    },[id])

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
    },[portfolio, id])

    //MediaQuery
    const mobile = useMediaQuery('(min-width:1024px')


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
            {title: 'Total Invested', value: summary.totalInvested  , prefix: '$', suffix: ''},
            {title: 'Bitcoin Holdings', value: summary.balance, prefix: '', suffix: ''},
            {title: 'Current Value', value: summary.value, prefix: '$', suffix: ''},
            {title: 'Average Cost', value: summary.averageCost, prefix: '$', suffix: ''},
            {title: 'Gain / Loss', value: summary.profit, prefix: '$', suffix: ''},
            {title: 'ROI', value: summary.roi, prefix: '', suffix: '%'},
        ]
        }


    //If No Portfolio Data...
    if(state.portfolio.portfolioList.length < 1 ){
        return(
            <>
                Add Details...
            </>
        )
    }

    console.log(calculatedTransactions)


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


            <ScoreCards>
                {
                    summary().map(item => 
                        <Scorecard
                            key={item.title}
                            title={item.title}
                            value={item.value}
                            prefix={item.prefix}
                            suffix={item.suffix}
                        />
                        )
                }
            </ScoreCards>
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
            <Box> 
                <HeaderRow>
                    <h2>Recurring Transactions</h2>
                    <Button 
                        variant='contained'
                        size='small'
                        startIcon={<AddIcon />} 
                        onClick={() => handleOpen(
                            <RecurringBuyForm 
                                handleClose={handleClose} 
                                portfolioId={id} 
                                type='add'
                            />
                        )}>
                        Add New
                    </Button>
                    
                </HeaderRow>
                <Table>
                    <MyTableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </MyTableHead>
                    <TableBody>
                    {portfolio.recurringBuyList(id).map((row) => (
                            <MyTableRow
                                key={row.id}
                            >
                                <TableCell>{row.purchaseAmount}</TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
                                <TableCell>{row.condition && row.condition}</TableCell>
                                <TableCell>
                                    <Button
                                        color='info'
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpen(
                                            <RecurringBuyForm
                                                type='edit'
                                                portfolioId={id}
                                                handleClose={handleClose}
                                                {...row}
                                            >
                                                Edit Recurring Buy
                                            </RecurringBuyForm>
                                        )}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </MyTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box>
                <HeaderRow>
                    <h2>One-Off Transactions</h2>
                    <Button 
                        variant='contained'
                        size='small'
                        startIcon={<AddIcon />}  
                        onClick={() => handleOpen(
                            <TransactionForm 
                                type='add' 
                                handleClose={handleClose}
                                portfolioId={id}
                            />
                        )}
                    >Add New</Button>
                </HeaderRow>
                <Table>
                    <MyTableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </MyTableHead>
                    <TableBody>
                        {
                            portfolio.oneOffTransactions(id, price[currency]) && portfolio.oneOffTransactions(id, price[currency]).map(row =>
                                <MyTableRow key={row.id}> 
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell><Currency value={row.amount} /></TableCell>
                                    <TableCell><Currency value={row.price} /></TableCell>
                                    <TableCell>
                                        <Button
                                            startIcon={<EditIcon />}
                                            onClick={() => handleOpen(
                                                <TransactionForm
                                                    fType='edit'
                                                    handleClose={handleClose}
                                                    portfolioId={id}
                                                    {...row}
                                                />
                                            )}
                                        >
                                            Edit
                                        </Button>
                                        <Button startIcon={<ContentCopyIcon />}>Clone</Button>
                                        <DeleteTransaction 
                                            portfolioId={id}
                                            transactionId={row.id}
                                        />
                                    </TableCell>
                                </MyTableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </Box>

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

const Headline = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: start;
    align-items: center;
    gap: 1rem;

    & button {
        justify-self: end;
    }
`

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 3rem 1.5rem;
  background-color: #212b36;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;
  border-radius: 1rem;
  overflow-x: scroll;
  & h3 {
    padding: 1rem;
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: end;
  padding-bottom: 1rem;
  color: ${props => props.theme.fontColor};
  & h2 {
      justify-self: start;
  }
  & button {
      justify-self: end;
  }
`