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
import { useFormik } from 'formik'

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

    //Form validation
    const formSchema = yup.object({
        date: yup.date(),
        amount: yup.number()
            .min(0, 'Enter number above 0!')
            .required('Required!'),
        bitcoin: yup.number()
            .min(0, 'Enter number over 0')
    })

    const formik = useFormik({
        initialValues: {
            amount: props.amount || 0,
            date: props.date || moment().format('YYYY-MM-DD'),
        },
        validationSchema: formSchema,
        onSubmit: {handleSubmit}
    })

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
            <Form onSubmit={formik.handleSubmit}>
                <h2>{props.type === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
                <Group>
                    <ButtonGroup >
                        <Button variant={formType.buyButton} onClick={handleFormChange}>Buy</Button>
                        <Button variant={formType.sellButton} onClick={handleFormChange}>Sell</Button>
                    </ButtonGroup>
                </Group>
                <InputField
                    // error
                    name='date'
                    label='Date'
                    type='date'
                    value={formik.values.date}
                    size='medium'
                    onChange={formik.handleChange}
                    inputProps={{inputMode: 'date'}}
                    // helperText='Enter date after May 1, 2015'
                />
                <OtherFields className={formType.type}>          
                <InputField
                name='amount'
                label={formType.type === 'buy' ? 'From: Dollars' : 'To: Dollars'}
                type='numeric'
                value={formik.values.amount}
                size='medium'
                onChange={formik.handleChange}
                inputProps={{inputMode: 'numeric'}}
                InputProps={{
                    startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                }}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                />
                <InputField
                    label='Price'
                    value={state.portfolio.historicalData[formik.values.date]}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'>1 BTC =</InputAdornment>)
                    }}
                    disabled
                />
                <InputField
                    name='amount'
                    label={formType.type === 'buy' ? 'To: Bitcoin' : 'From: Bitcoin'}
                    type='numeric'
                    value={formik.values.amount / state.portfolio.historicalData[formik.values.date] || 0}
                    size='medium'
                    onChange={formik.handleChange}
                    inputProps={{inputMode: 'numeric'}}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><SiBitcoinsv/></InputAdornment>)
                    }}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                    disabled
                    />
                </OtherFields>
                    <FormControlLabel  control={<Switch size='small' />} label='Enter Custom' />
                
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

const SwitchBox = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-content: center;

    & svg {
        transform: rotate(90deg);
    }
`

const OtherFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.sell{
        flex-direction: column-reverse;
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
    & span {
        font-size: .5rem;
        text-transform: uppercase;
    }
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