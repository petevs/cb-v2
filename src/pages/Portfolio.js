import { Button, Table, TableRow, TableCell} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'
import RecurringBuyForm from 'components/RecurringBuyForm'
import FormModal from 'components/FormModal'
import styled from 'styled-components'
import MyTableHead from 'styledComponents/MyTableHead'

const Portfolio = () => {

    const [portfolio, setPortfolio] = useState('')
    const [inputs, setInputs] = useState({
        startDate: '2020-01-01',
        endDate: '2021-10-01',
        purchaseAmount: 5,
    })


    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const [transactions, setTransactions] = useState([])

    const { state } = useContext(GlobalContext)

    const [userPortfolios, setUserPortfolios] = useState()

    const { user } = state

    const handleChange = (e) => {
        setPortfolio(e.target.value)
    }

    const handleDateChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const portTrans = recurringBuy(
    //         inputs.purchaseAmount,
    //         inputs.startDate,
    //         inputs.endDate,
    //         state.calculators.dca.historicalData
    //     )

    //     db.collection('users').doc(user.uid).collection('portfolios').doc().set({
    //         name: portfolio,
    //         transactions: portTrans
    //     })
    //     setPortfolio('')
    // }

    // useEffect(() => {
    //     db.collection('users').doc(user.uid).collection('portfolios').onSnapshot(snapshot => {
    //         const result = snapshot.docs.map(doc => {
    //             const data = doc.data()
    //             const id = doc.id
    //             return { id, ...data}
    //         })
    //         setUserPortfolios(result)
    // })
    // },[])


    // if(userPortfolios.length < 1){
    //     return(
    //         <>
    //         ...loading
    //         </>
    //     )
    // }

    return (
        <Wrapper>
            <FormModal open={open} onClose={handleClose}>
                <RecurringBuyForm />
            </FormModal>

            <div>
                {/* {userPortfolios.map(item => <p>{item.name}</p>)} */}
                {/* {userPortfolios[0].transactions.map(item => 
                    <div>
                        <h2>{item.date} {item.runningBal}</h2>
                        <EditButton {...item} />
                    </div>
                )} */}

            </div>
            <Box>
                <HeaderRow>
                    <h2>Recurring Buys</h2>
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
                </Table>
            </Box>

        </Wrapper>
    )
}

export default Portfolio

const Wrapper = styled.div`
    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
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