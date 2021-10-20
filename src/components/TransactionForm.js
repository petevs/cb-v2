import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import { Button, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select, Switch, FormControl, ButtonGroup } from '@mui/material'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { db } from 'firebase'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { SiBitcoinsv } from 'react-icons/si'
import { render } from '@testing-library/react'
import IconButton from 'styledComponents/IconButton'
import { numberWithCommas } from 'utils/formatting'
import * as yup from 'yup'
import { useFormik, Field} from 'formik'

const TransactionForm = (props) => {

    const { state } = useContext(GlobalContext)

    const initialValues = {
        amount: props.amount || 0,
        date: props.date || moment().format('YYYY-MM-DD'),
        type: 'buy'
    }

    const [inputs, setInputs] = useState(initialValues)


    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (values, e) => {
        e.preventDefault()

        const firebaseId = props.id || Date.now()

        db.collection('users').doc(state.user.uid).update({
            portfolio: {
                ...state.portfolio.portfolioObj,
                [props.portfolioId]: {
                    ...state.portfolio.portfolioObj[props.portfolioId],
                    transactions: {
                        ...state.portfolio.portfolioObj[props.portfolioId].transactions,
                        [firebaseId]: inputs
                    }
                }
            }
        })

        props.handleClose()
    }

    const handleDelete = (e) => {
        const updatedPortfolio = {...state.portfolio.portfolioObj}
        delete updatedPortfolio[props.portfolioId].transactions[props.id]

        db.collection('users').doc(state.user.uid).update({
            portfolio:
                {
                    ...updatedPortfolio
                }
        })
        props.handleClose()
    }

     //TOGGLE FORM TYPE
     const initialFormType = {
        type: 'buy',
        buyButton: 'contained',
        sellButton: ''
    }
    
    const [formType, setFormType] = useState(initialFormType)

    const handleFormChange = () => {

        if (formType.type === 'buy'){
            setFormType({
                type: 'sell',
                buyButton: '',
                sellButton: 'contained'
            })
        }
        
        else {
            setFormType(
                initialFormType
            )
        }
    }


    return (
            <Form onSubmit={handleSubmit}>
                <h2>{props.type === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
                <Group>
                    <ButtonGroup >
                        <Button variant={formType.buyButton} onClick={handleFormChange}>Buy</Button>
                        <Button variant={formType.sellButton} onClick={handleFormChange}>Sell</Button>
                    </ButtonGroup>
                </Group>
                <InputField
                    
                    name='date'
                    label='Date'
                    type='date'
                    value={inputs.date}
                    size='medium'
                    onChange={handleChange}
                    inputProps={{inputMode: 'date'}}
                />
                <OtherFields className={formType.type}>          
                    <InputField
                    name='amount'
                    label={formType.type === 'buy' ? 'From: Dollars' : 'To: Dollars'}
                    type='numeric'
                    value={inputs.amount}
                    size='medium'
                    onChange={handleChange}
                    inputProps={{inputMode: 'numeric'}}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                    }}
                />
                <InputField
                    label='Price'
                    value={state.portfolio.historicalData[inputs.date]}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'>1 BTC =</InputAdornment>)
                    }}
                />
                {/* <InputField
                    name='amount'
                    label={formType.type === 'buy' ? 'To: Bitcoin' : 'From: Bitcoin'}
                    type='numeric'
                    value={autoFields.bitcoinAmount}
                    size='medium'
                    onChange={formik.handleChange}
                    inputProps={{inputMode: 'numeric'}}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><SiBitcoinsv/></InputAdornment>)
                    }}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                    disabled={!customValues}
                    /> */}
                </OtherFields>
                
                <Button variant='contained' size='large' type='submit'>
                {props.type === 'add' ? 'Add Transaction' : 'Save Changes'}
                </Button>
                {
                    props.type === 'edit' &&
                <Button variant='contained' size='small' color='warning' onClick={handleDelete}>
                    Delete
                </Button>
                }
            </Form>
    )
}

export default TransactionForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

    & h2 {
        text-align: center;
    }

    & svg {
        color: #F7931A;
    }

`

const Group = styled.div`
    display: grid;
    justify-content: center;
`

const OtherFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.sell{
        flex-direction: column-reverse;
    }
`
