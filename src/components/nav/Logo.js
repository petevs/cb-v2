import React from 'react'
import styled from 'styled-components'
import { SiBitcoinsv } from 'react-icons/si'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <StyledLink
            to='/'
        >
            <MyLogo>
                <SiBitcoinsv /> Calculating Bitcoin
            </MyLogo>
        </StyledLink>
    )
}

export default Logo

const StyledLink = styled(Link)`

    text-decoration: none;
    &:hover{
        background-color: rgba(25, 118, 210, 0.04);
    }
`

const MyLogo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: .5rem;
    justify-items: start;
    align-content: center;
    align-items: center;
    letter-spacing: -.5px;
    cursor: pointer;
    color: ${props => props.theme.fontColor};
    font-size: 1.25rem;

    & svg {
        color: #F7931A;
    }
`