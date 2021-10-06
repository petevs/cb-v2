import { useContext } from 'react'
import { ThemeContext } from 'state/contexts/ThemeContext'
import { updateDrawer } from 'state/actions/themeActions' 

import styled from 'styled-components'
import MobileMenuIcon from './MobileMenuIcon'

const MobileMenu = () => {

    const { themeDispatch} = useContext(ThemeContext)

    const handleClick = () => {
        themeDispatch(updateDrawer(true))
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