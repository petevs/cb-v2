import React from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'

const Nav= () => {
    return (
        <Container columns='auto 1fr auto'>
            <Logo />
            <>
            </>
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
    padding: 0 1rem;
    background-color: #161c24;
    @media (max-width: 1024px) {
        grid-template-columns: auto 1fr;
    }
`