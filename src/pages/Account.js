import React, { useState, useContext } from 'react'
import { auth } from 'firebase'
import InputField from 'styledComponents/InputField'
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { Button } from '@mui/material'

const Account = () => {

    const { state } = useContext(GlobalContext)

    const initialValues = {
        displayName: state.user.displayName || '',
        email: auth.currentUser.email,
        password: '*********',
        photoURL: state.user.photoURL || ''
    }

    const [form, setForm] = useState(initialValues)



    const handleChange = (e) => {
        setForm({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        const user = auth.currentUser

        user.updateProfile({
            displayName: form.displayName,
            photoURL: form.photoURL,
        }).then(() => {

        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <Wrapper>
            <FormBox>

                <Input>
                    <label htmlFor='displayName'>Display Name</label>
                    <MyInputField
                        id='displayName'
                        name='displayName'
                        size='small'
                        value={form.displayName}
                        onChange={handleChange}
                    />
                </Input>
                <Input>
                    <label htmlFor='photoURL'>Photo URL</label>
                    <MyInputField
                        id='photoURL'
                        name='photoURL'
                        size='small'
                        value={form.photoURL}
                        onChange={handleChange}
                    />
                </Input>
                {/* <Input>
                    <label htmlFor='email'>Email</label>
                    <MyInputField
                        id='email'
                        size='small'
                        value={auth.currentUser.email}
                        disabled={disabled.email}
                        onChange={handleChange}
                    />
                    <EditButtons>
                        <IconButton onClick={(e) => toggleDisabled('email', e)}>
                            <EditIcon />
                        </IconButton>
                    </EditButtons>
                </Input>
                <Input>
                    <label htmlFor='password'>Password</label>
                    <MyInputField
                        id='password'
                        size='small'
                        value={'***********'}
                        type='password'
                        disabled={disabled.password}
                    /> */}
                    {/* <EditButtons>
                        <EditIcon />
                    </EditButtons>
                </Input> */}
                <Button variant='contained' onClick={() => handleSubmit()}>Update</Button>

            </FormBox>
        </Wrapper>
    )
}

export default Account


const Wrapper = styled.div`
    display: grid;
    align-content: start;
    justify-content: center;
    background-color: ${props => props.theme.body};
    gap: 2rem;
    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
    }
    color: #fff;
    padding: 2rem;

    & button {
        justify-self: start;
    }
`

const FormBox = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 600px);
    gap: 1rem;
`

const Input = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr) auto;
    gap: 1rem;
    align-items: center;

    & label {
        grid-column: 1 / span 1;
    }
`

const MyInputField = styled(InputField)`
    grid-column: 2 / span 2;
`