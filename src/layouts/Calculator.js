import React from 'react'
import styled from 'styled-components'

const Calculator = ({title, header, children}) => {
    return (
        <Wrapper>
            <InnerWrapper>
            <h1>{title}</h1>
            <Header>
                {header}
            </Header>
            {children}
            </InnerWrapper>
        </Wrapper>
    )
}

export default Calculator

const Wrapper = styled.div`
    display: grid; 
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.fontColor};
    padding: 2.5rem;
    & h1 {
        font-size: 1.8rem;
    }

    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
        padding: 1rem;
    }
`

const InnerWrapper = styled.div`
    display: grid;
    // justify-self: center;
    align-content: start;
    // justify-items: start;
    gap: 1rem;

    @media (max-width: 1024px) {
        justify-items: center;
        padding: 1rem;
    }
`

const Header = styled.div`
    display: grid;
    border-bottom: 2px solid #fff;
    padding-bottom: 1rem;
    grid-auto-flow: column;
    justify-content: start;
    gap: 1rem;
`