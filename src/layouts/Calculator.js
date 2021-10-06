import React from 'react'
import styled from 'styled-components'

const Calculator = ({title, subtitle, header, button, children}) => {
    return (
        <Wrapper>
            <InnerWrapper>
                <TitleBox>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </TitleBox>
                <CalcBox>
                    <Inputs>
                    {header}
                    {button}
                    </Inputs>
                    <div>
                        I will be the chart
                    </div>
                </CalcBox>
            {children}
            </InnerWrapper>
        </Wrapper>
    )
}

export default Calculator

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.fontColor};
    padding: 2.5rem;
    & h1 {
        font-size: 4rem;
    }

    @media (max-width: 1024px) {
        grid-column: 1 / span 2;
        padding: 1rem;
    }
`

const TitleBox = styled.div`
    max-width: 650px;
    justify-self: center;
    line-height: 1.5rem;
`

const CalcBox = styled.div`
    display: grid;
    grid-template-columns: 330px 1fr;
    background-color: #212B36;
    justify-self: center;
    width: 1536px;
    min-height: 300px;
    padding: 4rem 2rem;
    border-radius: 6px;
`



const InnerWrapper = styled.div`
    display: grid;
    align-content: start;
    gap: 2rem;
    text-align: center;

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
    align-content: start;
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