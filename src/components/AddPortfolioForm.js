import React, { useState, useContext } from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { updateDrawer } from 'state/actions/themeActions'
import { useHistory } from 'react-router'

const AddPortfolioForm = (props) => {

    const { state, dispatch } = useContext(GlobalContext)
    const history = useHistory()

    console.log(state.user.uid)
    const initialForm = {
        portfolioName: '',
        portfolioDescription: ''
    }

    const [inputs, setInputs] = useState(initialForm)

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const portfolioId = Date.now()
        await db.collection('users').doc(state.user.uid).update({
            portfolio: 
                {
                    ...state.portfolio.portfolioObj,
                    [portfolioId]: inputs
                }
        })

        history.push(`/portfolio/${portfolioId}`)
        
        props.handleClose()
        dispatch(updateDrawer(false))
        setInputs(initialForm)
    }


    return (
        <Form onSubmit={handleSubmit}>
            <h2>Add New Portfolio</h2>
            <InputField
                name='portfolioName'
                label='Portfolio Name'
                value={inputs.portfolioName}
                size='medium'
                onChange={handleChange}
            />
            <InputField
                name='portfolioDescription'
                label='Description'
                value={inputs.portfolioDescription}
                size='medium'
                onChange={handleChange}
                multiline
                rows={3}
            />

            <Button 
                variant='contained' 
                size='large'
                type='submit'
            >
                Add Portfolio
            </Button>
        </Form>
    )
}

export default AddPortfolioForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

`