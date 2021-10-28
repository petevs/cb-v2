import React, { useState } from 'react'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { auth } from 'firebase'
import firebase from "firebase/compat/app";
import FormModal from 'components/FormModal'
import { useHistory } from 'react-router-dom'

const Signup = () => {

    const history = useHistory()

    let schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required(),
        password: yup.string().required()
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const [values, setValues] = useState(initialValues)

    const [errors, setErrors] = useState({
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
            if(auth.currentUser){
                const credential = await firebase.auth.EmailAuthProvider.credential(values.email, values.password)
                auth.currentUser.linkWithCredential(credential)
                    .then((usercred) => {
                        const user = usercred.user
                        console.log("Anonymous account successful upgraded", user)
                    }).catch((error) => {
                        console.log("error upgrading anonymous account")
                    })
                return
            }

            await auth.createUserWithEmailAndPassword(values.email, values.password)
            setValues(initialValues)
            history.push('/portfolio')

        } 
        
        catch(err) {
            console.log(err)
        }
    }

    return (
        <FormModal open>
            <Form onSubmit={handleSubmit}>
                <h2>Create an account</h2>
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
                <Button variant='contained' type='submit'>Create Account</Button>
                <GoToLogin>
                    Have an account? 
                    <Button component={Link} to='/login'>Log in</Button></GoToLogin>
            </Form>
        </FormModal>
    )
}

export default Signup


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