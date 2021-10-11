import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import { Button, InputAdornment } from '@mui/material'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { db } from 'firebase'

const TransactionForm = (props) => {

    const { state } = useContext(GlobalContext)

    const initialForm = {
        amount: props.amount || 0,
        date: props.date || moment().format('YYYY-MM-DD')
    }

    const [inputs, setInputs] = useState(initialForm)

    const fields = [
        {name: 'amount', label: 'Amount', type: 'numeric', adornment: '$'},
        {name: 'date', label: 'Date', type: 'date'}
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


    return (
            <Form onSubmit={handleSubmit}>
                <h2>{props.type === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
                {
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
                }
                <Button variant='contained' size='large' type='submit'>
                {props.type === 'add' ? 'Add Transaction' : 'Save Changes'}
            </Button>
            </Form>
    )
}

export default TransactionForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

`