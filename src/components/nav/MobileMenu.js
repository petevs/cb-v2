import { useContext } from 'react'
import { AppContext } from 'state/contexts/AppContext'
import { updateDrawer } from 'state/actions/appActions' 

import styled from 'styled-components'
import MobileMenuIcon from './MobileMenuIcon'

const MobileMenu = () => {

    const { appDispatch} = useContext(AppContext)

    const handleClick = () => {
        appDispatch(updateDrawer(true))
    }

    return (
        <Container>
            <MobileMenuIcon onClick={handleClick} />
        </Container>
    )
}

export default MobileMenu

const Container = styled.div`
    align-self: start;
    justify-self: end;

    @media (min-width: 1024px){
        display: none;
    }
`