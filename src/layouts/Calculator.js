import React from 'react'
import styled from 'styled-components'

const Calculator = ({title, header, button, children}) => {
    return (
        <Wrapper>
            <InnerWrapper>
                <div>
                    <h1>{title}</h1>
                    <p>little byline about it</p>
                </div>
            <Header>
                <Inputs>
                    {header}
                    <DesktopButton>
                        {button}
                    </DesktopButton>
                </Inputs>
                <MobileButton>
                    {button}
                </MobileButton>
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
    align-content: start;
    gap: 2rem;

    @media (max-width: 1024px) {
        justify-items: center;
        text-align: center;
    }
`

const Header = styled.div`
    display: grid;
    border-bottom: 2px solid #fff;
    padding-bottom: 1rem;
    grid-template-columns: 1fr;
    grid-template-row: auto auto;
    justify-content: start;
    gap: 1rem;

    @media (max-width: 1024px) {
        width: 100%;
    }

`

const Inputs = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(175px, 1fr ));
    justify-content: start;
    gap: 1rem;
`

const MobileButton= styled.div`
    display: grid;
    min-height: 56px;
    @media (min-width: 1024px) {
        display: none;
    }
`

const DesktopButton = styled.div`
    display: grid;
    @media (max-width: 1024px) {
        display: none;
    }
`