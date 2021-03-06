import React, { useState, useContext } from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'

const EditPortfolioForm = ({details, handleClose, id}) => {

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
                    [id]: {
                        ...state.portfolio.portfolioObj[id],
                        ...inputs
                    }
                }
        })
        handleClose()
        setInputs(initialForm)
    }

    const changes = () => {
        return initialForm === inputs
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
                disabled={changes()}
            >
                Save Changes
            </Button>
            <Button onClick={handleClose}>
                Cancel
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