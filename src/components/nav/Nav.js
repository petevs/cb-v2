import React from 'react'
import styled from 'styled-components'
import Container from 'styledComponents/Container'
import Logo from 'components/nav/Logo'

const Nav= () => {
    return (
        <StyledContainer columns='auto 1fr auto'>
            <Logo />
        </StyledContainer>
    )
}

export default Nav

const StyledContainer = styled(Container)`
    background-color: #161c24;
`