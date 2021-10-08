import { Button, Table, TableRow, TableCell, TableBody} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'
import RecurringBuyForm from 'components/RecurringBuyForm'
import FormModal from 'components/FormModal'
import styled from 'styled-components'
import MyTableHead from 'styledComponents/MyTableHead'
import { useParams } from 'react-router'
import EditPortfolioForm from 'components/EditPortfolioForm'
import MyTableRow from 'styledComponents/MyTableRow'

const Portfolio = () => {

    let { id } = useParams()
    const { state } = useContext(GlobalContext)
    const { portfolioObj } = state.portfolio

    const details = portfolioObj[id]
    
    // MODAL

    const [modalContent, setModalContent] = useState()
    const [open, setOpen] = useState(false);
    
    const handleOpen = (type) => {
        setModalContent(type)
        setOpen(true)
    };
    
    const handleClose = () => setOpen(false);

  
    //If No Portfolio Data...
    if(state.portfolio.portfolioList.length < 1){
        return(
            <>
                Add Details...
            </>
        )
    }

    console.log(state)

    //Create Recurring Buy List
        const recurringBuyList = []

        if('recurringBuys' in details){
            for (const key in details.recurringBuys){
                const buy = details.recurringBuys[key]
                recurringBuyList.push({
                    id: key,
                    purchaseAmount: buy['purchaseAmount'],
                    startDate: buy['startDate'],
                    endDate: buy['endDate']
                })
            }
        }    

    return (
        <>
        {/* MODAL */}
        <FormModal open={open} onClose={handleClose}>
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

            <Box>
                <HeaderRow>
                    <h2>Recurring Buys</h2>
                    <Button 
                        variant='contained' 
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </MyTableHead>
                    <TableBody>
                    {recurringBuyList.map((row) => (
                            <MyTableRow
                                key={row.id}
                            >
                                <TableCell>{row.purchaseAmount}</TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
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
                    <h2>Transactions</h2>
                    <Button variant='contained' onClick={() => setOpen(true)}>Add New</Button>
                </HeaderRow>
                <Table>
                    <MyTableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </MyTableHead>
                    <TableBody>
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
  padding: 1rem;
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
  color: ${props => props.theme.fontColor};
  & h2 {
      justify-self: start;
  }
  & button {
      justify-self: end;
  }
`