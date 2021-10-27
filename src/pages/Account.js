import React from 'react'
import { auth } from 'firebase'
import InputField from 'styledComponents/InputField'
import { Label } from '@mui/icons-material'
import styled from 'styled-components'

const Account = () => {


    return (
        <Wrapper>
            <FormBox>

                <Input>
                    <label htmlFor='displayName'>Display Name</label>
                    <InputField
                        id='displayName'
                        size='small'
                        value={auth.currentUser.displayName}
                    />
                </Input>

                <Input>
                    <label htmlFor='email'>Email</label>
                    <InputField
                        id='email'
                        size='small'
                        value={auth.currentUser.email}
                    />
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
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    align-items: center;

    & label {
        grid-column: 1 / span 1;
    }

    & div {
        grid-column: 2 / span 3;
    }
`
