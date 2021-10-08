import React, { useState, useContext } from 'react'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import styled from 'styled-components'
import { Button, InputAdornment } from '@mui/material'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'

const RecurringBuyForm = (props) => {

    console.log(props)

    const { state } = useContext(GlobalContext)

    // If editing a recurring buy initial then pass the props otherwise set initial
    const initialForm = {
        purchaseAmount: props.purchaseAmount || 0,
        startDate: props.startDate || moment().subtract(1, 'years').format('YYYY-MM-DD'),
        endDate: props.endDate || moment().format('YYYY-MM-DD')
    }

    const [inputs, setInputs] = useState(initialForm)
    
    const fields = [
        {name: 'purchaseAmount', label: 'Purchase Amount', type: 'numeric', adornment: '$'},
        {name: 'startDate', label: 'Start Date', type: 'date'},
        {name: 'endDate', label: 'End Date', type: 'date'},
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
                        recurringBuys: {
                            ...state.portfolio.portfolioObj[props.portfolioId].recurringBuys,
                            [firebaseId]: inputs
                        }
                    }
                }
            })

        props.handleClose()
        setInputs(initialForm)
    }




    return (
        <Form onSubmit={handleSubmit}>
            <h2>Add a Recurring Buy</h2>
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
            <Button variant='contained' size='large' type='submit'>Add Recurring Buy</Button>
        </Form>
    )
}

export default RecurringBuyForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

`