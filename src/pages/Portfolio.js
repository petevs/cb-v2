import { Button, Table, TableRow, TableCell, TableBody} from '@mui/material'
import React, { useState, useContext, useMemo } from 'react'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'
import RecurringBuyForm from 'components/RecurringBuyForm'
import FormModal from 'components/FormModal'
import styled from 'styled-components'
import MyTableHead from 'styledComponents/MyTableHead'
import { useParams } from 'react-router'
import EditPortfolioForm from 'components/EditPortfolioForm'
import MyTableRow from 'styledComponents/MyTableRow'
import TransactionForm from 'components/TransactionForm'
import Chart from 'react-apexcharts'
import { toggleModal } from 'state/actions/modalActions'
import { getDatesBetween } from 'utils/getDatesBetween'
import { recurringTransactions } from 'utils/recurringTransactions'

const Portfolio = () => {

    let { id } = useParams()
    const { state, dispatch } = useContext(GlobalContext)
    const { portfolioObj } = state.portfolio

    const details = portfolioObj[id]
    
    // MODAL

    const [modalContent, setModalContent] = useState()
    
    const handleOpen = (type) => {
        setModalContent(type)
        dispatch(toggleModal(true))
    };
    
    const handleClose = () => dispatch(toggleModal(false));

    //MAKE LIST OF RECURRING BUYS
    const recurringBuyList = () => {

        const buyList = []

        if('recurringBuys' in details){
            for (const buyID in details.recurringBuys){
                const current = details.recurringBuys[buyID]

                buyList.push({
                    id: buyID,
                    purchaseAmount: current['purchaseAmount'],
                    startDate: current['startDate'],
                    endDate: current['endDate'],
                    condition: current['condition']
                })
            }
        }
        return buyList
    }


    // Create Transaction List

    const oneOffTransactions = () => {

        const transactionList = []

        if('transactions'in details){
            for (const transactionID in details.transactions){
                const transaction = details.transactions[transactionID]

                transactionList.push({
                    id: transactionID,
                    amount: transaction['amount'],
                    date: transaction['date'],
                    price: state.portfolio.historicalDataObj[transaction['date']]

                })
            }
        }

        return transactionList

    }

    //Create All Transactions
    
    const calculatedTransactions = useMemo(() => {

        if(state.portfolio.portfolioList.length < 1 ){
            return
        }

        let allTransactions = []


        // Go through each recurring buy and add to all Transactions
        for (const key in recurringBuyList()) {

            const item = recurringBuyList()[key]
            
            const buyList = recurringTransactions(
                item.purchaseAmount,
                item.startDate,
                item.endDate,
                state.portfolio.historicalDataObj
            )

            allTransactions = [...allTransactions, ...buyList]
        
        }

        allTransactions = [...allTransactions, ...oneOffTransactions()]


        //Sort by Date
        allTransactions = allTransactions.sort(function(a,b){
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })


        // Get Running Balance and Other Calculations for All Transactions

        let runningBal = 0
        let totalInvested = 0

        const finalCalculatedTransactions = allTransactions.map(item => {

            totalInvested = Number(totalInvested) + Number(item.amount)
            const bitcoinAdded = Number((item.amount / item.price))
            runningBal = runningBal + bitcoinAdded
            const value = (item.price * runningBal).toFixed(2);
            const profit = value - totalInvested;
            const roi = ((value - totalInvested) / totalInvested) * 100;


            return {
                date: item.date,
                price: item.price,
                amount: item.amount,
                totalInvested: totalInvested,
                runningBal: runningBal,
                value: value,
                profit: profit,
                roi: roi

            }

        })

        return finalCalculatedTransactions

    },[details])


        //If No Portfolio Data...
        if(state.portfolio.portfolioList.length < 1 ){
            return(
                <>
                    Add Details...
                </>
            )
        }
      


    //CHART SERIES & OPTIONS

    const options = {
        chart: {
          toolbar: {
            show: false,
            // tools: {
            //     download: false,
            // }
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            show: false,
            // formatter: function (value) {
            //   return "$" + numberWithCommas(value);
            // },
            // style: {
            //   colors: ["#fff"],
            // },
          },
          // opposite: true,
        },
        xaxis: {
          type: "datetime",
          categories: calculatedTransactions.map((item) => {
            return item.date;
          }).reverse(),
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        colors: ["#2E99FE", "#FF2F30"],
        tooltip: {
          x: {
            format: "dd MMM HH:mm",
          },
          theme: "dark",
        },
        annotations: {
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: {
            colors: "#fff",
          },
        },
      };
    
      const series = [
        {
          name: `Portfolio Value (${state.settings.currency})`,
          data: calculatedTransactions.map((item) => {
            return item.value;
          }).reverse(),
        },
      ];


    return (
        <>
        {/* MODAL */}
        <FormModal open={state.modal.open} onClose={handleClose}>
            {modalContent}
        </FormModal>

        {/* CONTENT */}
        <Wrapper>
            <h2>{details.portfolioName}</h2>
            <p>{details.portfolioDescription}</p>

            {/* EDIT PORTFOLIO BUTTON - OPENS MODAL WITH EDIT FORM */}
            <Button
                variant='contained' 
                onClick={() => handleOpen(

                    <EditPortfolioForm 
                        details={details}
                        handleClose={handleClose}
                        id={id}
                    />

                )} 
            >
                Edit
            </Button>
            <ChartWrapper>
                <Chart
                        series={series}
                        options={options}
                        type='area'
                        width='100%'
                        height="400px"
                    />
            </ChartWrapper>

            <Box>
                <HeaderRow>
                    <h2>Recurring Transactions</h2>
                    <Button 
                        variant='contained'
                        size='small' 
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
                    {recurringBuyList().map((row) => (
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
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </MyTableHead>
                    <TableBody>
                        {
                            oneOffTransactions() && oneOffTransactions().map(row =>
                                <MyTableRow key={row.id}> 
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleOpen(
                                                <TransactionForm
                                                    type='edit'
                                                    handleClose={handleClose}
                                                    portfolioId={id}
                                                    {...row}
                                                />
                                            )}
                                        >
                                            Edit
                                        </Button>
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

const ChartWrapper = styled.div`
    margin: 0 0 0 -1rem;
`