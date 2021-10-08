import React, { useState, useContext } from 'react'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import styled from 'styled-components'
import { Button, InputAdornment } from '@mui/material'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { useHistory } from 'react-router'

const EditPortfolioForm = ({details, handleClose, id}) => {

    const history = useHistory()

    const { state } = useContext(GlobalContext)

    const initialForm = {
        portfolioName: details.portfolioName,
        portfolioDescription: details.portfolioDescription
    }

    const [inputs, setInputs] = useState(initialForm)

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        db.collection('users').doc(state.user.uid).update({
            portfolio: 
                {
                    ...state.portfolio.portfolioObj,
                    [id]: inputs
                }
        })
        handleClose()
        setInputs(initialForm)
    }

    const handleDelete = () => {

        const updatedPortfolio = {...state.portfolio.portfolioObj}
        delete updatedPortfolio[id]

        db.collection('users').doc(state.user.uid).update({
            portfolio:
            {
                ...updatedPortfolio
            }
        })
        history.push('/portfolio')
        handleClose()
        
    }


    return (
        <Form onSubmit={handleSubmit}>
            <h2>Edit Portfolio</h2>
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
                Save Changes
            </Button>
            <Button
                variant='contained'
                size='large'
                color='warning'
                onClick={handleDelete}
            >
                Delete
            </Button>
        </Form>
    )
}

export default EditPortfolioForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

`