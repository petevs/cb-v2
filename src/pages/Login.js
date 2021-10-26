import React from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Wrapper>
            <Form>
                <h2>Create an account</h2>
                <InputField
                    label='username'
                    size='small'
                />
                <InputField
                    label='email'
                    size='small'
                />
                <InputField
                    label='password'
                    size='small'
                />
                <Button variant='contained'>Create Account</Button>
                <GoToLogin>
                    Have an account? 
                    <Button component={Link} to='/login'>Log in</Button></GoToLogin>
            </Form>
        </Wrapper>
    )
}

export default Login

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    align-content: center;

    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
    }
`

const Form = styled.form`
    display: grid;
    gap: 1rem;
    color: #fff;
    min-width: 300px;
`

const GoToLogin = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: center;
    gap: .25rem;
`