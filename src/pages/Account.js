import React, { useState } from 'react'
import { auth } from 'firebase'
import InputField from 'styledComponents/InputField'
import { Label } from '@mui/icons-material'
import styled from 'styled-components'

import EditIcon from '@mui/icons-material/Edit';
import IconButton from 'styledComponents/IconButton'

const Account = () => {

    const initialValues = {
        displayName: auth.currentUser.displayName || 'None',
        email: auth.currentUser.email,
        password: '*********'
    }

    const [form, setForm] = useState(initialValues)
    const [disabled, setDisabled] = useState({
        displayName: true,
        email: true,
        password: true,
    })


    const handleChange = (e) => {
        setForm({
            [e.target.name]: e.target.value
        })
    }


    const toggleDisabled = (name, e) => {
        setDisabled({
            ...disabled,
            [name]: !disabled[name]
        })
    }


    return (
        <Wrapper>
            <FormBox>

                <Input>
                    <label htmlFor='displayName'>Display Name</label>
                    <MyInputField
                        id='displayName'
                        size='small'
                        value={auth.currentUser.displayName}
                        disabled={disabled.displayName}
                    />
                </Input>
                <Input>
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
                    />
                    <EditButtons>
                        <EditIcon />
                    </EditButtons>
                </Input>


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

const EditButtons = styled.div`
    display: grid;
    grid-column: 4 / span 1;
`