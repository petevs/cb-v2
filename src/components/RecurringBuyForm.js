import React, { useState, useContext } from 'react'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import styled from 'styled-components'
import { Button, InputAdornment } from '@mui/material'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'
import { useHistory } from 'react-router-dom'

const RecurringBuyForm = (props) => {
    
    const history = useHistory()

    const { state } = useContext(GlobalContext)

    // If editing a recurring buy initial then pass the props otherwise set initial
    const initialForm = {
        purchaseAmount: props.purchaseAmount || 0,
        startDate: props.startDate || moment().subtract(1, 'years').format('YYYY-MM-DD'),
        endDate: props.endDate || moment().format('YYYY-MM-DD'),
        condition: props.condition || 'none'
    }

    const [inputs, setInputs] = useState(initialForm)
    
    const fields = [
        {name: 'purchaseAmount', label: 'Purchase Amount', type: 'numeric', adornment: '$'},
        {name: 'startDate', label: 'Start Date', type: 'date'},
        {name: 'endDate', label: 'End Date', type: 'date'},
        {name: 'condition', label: 'Condition', type: 'select'}
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

    const handleDelete = () => {

        const updatedPortfolio = {...state.portfolio.portfolioObj}
        delete updatedPortfolio[props.portfolioId].recurringBuys[props.id]

        db.collection('users').doc(state.user.uid).update({
            portfolio:
            {
                ...updatedPortfolio
            }
        })
        props.handleClose()

    }




    return (
        <Form onSubmit={handleSubmit}>
            <h2>{props.type === 'add' ? 'Add' : 'Edit'} Recurring Buy</h2>
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
                {props.type === 'add' ? 'Add Recurring Buy' : 'Save Changes'}
            </Button>
            {props.type === 'edit' &&
            <Button variant='contained' size='small' color='warning' type='submit' onClick={handleDelete}>Delete</Button>
            }
        </Form>
    )
}

export default RecurringBuyForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

`