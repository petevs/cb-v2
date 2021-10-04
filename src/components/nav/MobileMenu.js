import React from 'react'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import IconButton from 'styledComponents/IconButton'

const MobileMenu = () => {
    return (
        <Container>

            <StyledIconButton>
                <GiHamburgerMenu />
            </StyledIconButton>
        </Container>
    )
}

export default MobileMenu

const Container = styled.div`
    padding: 1rem;
`

const StyledIconButton = styled(IconButton)`

& svg {
    padding: .75rem;
    height: 1.5rem;
    width: 1.5rem;
    color: #fff;
}

& :hover {
    background-color: #21252E;
    border-radius: 50%;
}

// @media (min-width: 1024px) {
//     display: none;
// }
`