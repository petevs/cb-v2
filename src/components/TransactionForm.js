import React from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'

const TransactionForm = () => {
    return (
            <MyForm>
                <InputField
                    name='date'
                    label='Date'
                    type='date'
                />
            </MyForm>
    )
}

export default TransactionForm

const MyForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    padding: 2rem;
    & h3 {
        margin-bottom: 1rem;
    }
`