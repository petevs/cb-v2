import React from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'
import Popover from 'components/Popover'
import Flag from './Flag'

const Nav= () => {
    return (
        <Container columns='auto 1fr auto'>
            <Logo />
            <MiddleMenu>
                <Popover icon={<Flag />} placed='bottom-start' />
            </MiddleMenu>
            <MobileMenu />
        </Container>
    )
}

export default Nav

const Container = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-content: center;
    align-items: center;
    padding: 0 1rem;
    background-color: #161c24;
    @media (max-width: 1024px) {
        grid-template-columns: auto 1fr;
    }
`

const MiddleMenu = styled.div`
    display: grid;
    justify-content: end;

    @media (max-width: 1024px){
        display: none;
    }
`