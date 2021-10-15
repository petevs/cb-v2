import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import { Button, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select, Switch, FormControl } from '@mui/material'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { db } from 'firebase'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { SiBitcoinsv } from 'react-icons/si'
import { render } from '@testing-library/react'
import IconButton from 'styledComponents/IconButton'
import { numberWithCommas } from 'utils/formatting'

const TransactionForm = (props) => {

    const { state } = useContext(GlobalContext)

    const initialForm = {
        amount: props.amount || 0,
        date: props.date || moment().format('YYYY-MM-DD')
    }

    const [inputs, setInputs] = useState(initialForm)

    const fields = [
        {name: 'date', label: 'Date', type: 'date'},
        {name: 'amount', label: 'Amount', type: 'numeric', adornment: '$'},
    ]

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
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

    const [from, setFrom] = useState('Dollars')

    const handleFromChange = (event) => {
        setFrom(event.target.value)
    }


    return (
            <Form onSubmit={handleSubmit}>
                <h2>{props.type === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
                <TypeSwitchBox>
                    <IconButton>
                        <CompareArrowsIcon fontSize='large' color='primary'/>
                    </IconButton>
                    <div>
                        From: Dollars <br />
                        To: Bitcoin
                    </div>
                </TypeSwitchBox>
                <InputField
                    name='date'
                    label='Date'
                    type='date'
                    value={inputs['date']}
                    size='medium'
                    onChange={handleChange}
                    inputProps={{inputMode: 'date'}}
                />

                <InputField
                    name='amount'
                    label='Amount'
                    type='numeric'
                    value={inputs['amount']}
                    size='medium'
                    onChange={handleChange}
                    inputProps={{inputMode: 'numeric'}}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                    }}
                    />
                    <FormControlLabel control={<Switch />} label='Custom Bitcoin Price' />
                <PriceBox>
                    Price <br />
                    1 BTC = $ {state.portfolio.historicalData[inputs.date]}
                </PriceBox>

                {/* {
                    fields.map(item => 
                        <InputField
                        name={item.name}
                        label={item.label}
                        value={inputs[item.name]}
                        size='medium'
                        onChange={handleChange}
                        type={item.type}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>{item.adornment}</InputAdornment>),
                        }}
                        inputProps={{inputMode: item.type}}
                        />
                        )
                } */}
                {/* <CompareArrowsIcon size='large' />
                <FormControlLabel control={<Switch />} label='Custom Values' /> */}
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
        transform: rotate(90deg);
    }

`

const TypeSwitchBox = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    gap: 1rem;
    // border-top: 1px solid #fff;
    // border-bottom: 1px solid #fff;
    padding: .5rem 0;
    & div {
        line-height: 1.5rem;
    }
`

const PriceBox = styled.div`
    text-align: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 1rem 0;

`

const MySelect = styled(Select)`
    & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }

  & ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  & p {
      color: #fff;
  }

  & div#from {
      color: #fff;
  }
`