import React, { useState } from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

const Signup = () => {

    let schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email('Invalid email format').required(),
        password: yup.string().required()
    })

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    })


    const validateChange = (e) => {
        yup.reach(schema, e.target.name)
            .validate(e.target.value)
            .then(valid => setErrors({
                ...errors,
                [e.target.name]: ''
            }))
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    const handleChange = (e) => {
        e.persist()
        validateChange(e)
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }





    return (
        <Wrapper>
            <Form>
                <h2>Create an account</h2>
                <InputField
                    label='username'
                    size='small'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    error={errors.username !== ''}
                    helperText={errors.username}
                />
                <InputField
                    label='email'
                    size='small'
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email !== ''}
                    helperText={errors.email}
                />
                <InputField
                    label='password'
                    size='small'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password !== ''}
                    helperText={errors.password}
                />
                <Button variant='contained'>Create Account</Button>
                <GoToLogin>
                    Have an account? 
                    <Button component={Link} to='/login'>Log in</Button></GoToLogin>
            </Form>
        </Wrapper>
    )
}

export default Signup

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    align-content: start;
    padding: 10rem 2rem;

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