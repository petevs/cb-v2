import React, { useState} from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { auth } from 'firebase'
import { useHistory } from 'react-router-dom'
import FormModal from 'components/FormModal'

const Login = () => {

    const history = useHistory()

    let schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email('Invalid email format').required(),
        password: yup.string().required()
    })

    const initialValues = {
        username: '',
        email: '',
        password: ''
    }

    const [values, setValues] = useState(initialValues)
    
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

    const [loginError, setLoginError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(values.email, values.password)
            setValues(initialValues)
            history.push('/portfolio')
        } catch(err) {
            setLoginError('No user found')
        }

    }



    return (
        <FormModal open>
            <Form onSubmit={handleSubmit}>
                <h2>Log in to your account</h2>
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
                <Button variant='contained' type='submit'>Log in</Button>
                <GoToLogin>
                    Need an account? 
                    <Button component={Link} to='/signup'>Sign up</Button></GoToLogin>
                    <span>{loginError}</span>
            </Form>
        </FormModal>
    )
}

export default Login

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