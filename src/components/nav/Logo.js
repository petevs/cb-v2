import React from 'react'
import styled from 'styled-components'
import { SiBitcoinsv } from 'react-icons/si'

const Logo = () => {
    return (
        <MyLogo>
            <SiBitcoinsv /> Calculating Bitcoin
            {/* <Headline>Calculating Bitcoin</Headline> */}
        </MyLogo>
    )
}

export default Logo

const MyLogo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: .5rem;
    justify-items: start;
    align-content: center;
    align-items: center;
    letter-spacing: -.5px;
    cursor: pointer;
    color: #fff;
    font-size: 1.25rem;
`