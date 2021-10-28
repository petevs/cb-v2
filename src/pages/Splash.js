import React, { useEffect, useContext } from 'react'
import FormModal from 'components/FormModal'
import { Button } from '@mui/material'
import { FaUserSecret } from 'react-icons/fa'
import EmailIcon from '@mui/icons-material/Email';
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext';
import { useHistory, Link } from 'react-router-dom'
import { auth } from 'firebase'

const Splash = () => {

    const { state } = useContext(GlobalContext)
    const { user } = state

    console.log(state)

    const history = useHistory()

    useEffect(() => {
        if(user.uid){
            history.push('/portfolio')
        }
    },[user])

    const handleGuest = () => {
        auth.signInAnonymously()
    }


    return (
        <FormModal open>
            <Wrapper>
                <h2>Welcome!</h2>
                <Button
                    variant='contained'
                    startIcon={<FaUserSecret />}
                    onClick={handleGuest}
                >
                    Continue As Guest
                </Button>
                <Button
                    variant='contained'
                    color='warning'
                    startIcon={<EmailIcon />}
                    component={Link}
                    to='/login'
                >
                    Sign In With Email
                </Button>
            </Wrapper>
        </FormModal>
    )
}

export default Splash


const Wrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    text-align: center;
    gap: 1rem;
    padding: 2rem;
`