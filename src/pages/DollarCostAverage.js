import { Button, InputAdornment } from '@mui/material'
import Scorecard from 'components/Scorecard'
import Calculator from 'layouts/Calculator'
import React, { useContext, useState} from 'react'
import InputField from 'styledComponents/InputField'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { updateDcaCalculator } from 'state/actions/calculatorActions'
import styled from 'styled-components'

const DollarCostAverage = () => {

    //IMPORT GLOBAL STATE & DESTRUCTURE DCA
    const { state, dispatch } = useContext(GlobalContext)
    const { dca } = state.calculators

    //CALCULATED RESULTS PULLED FROM DCA in GLOBAL STATE
    const {
        runningBal,
        date,
        price,
        totalInvested,
        value,
        profit,
        roi,
        days
    } = dca.lastEntry()

    console.log(dca)

    //LOCAL FORM STATE
    const [userInputs, setUserInputs] = useState({
        purchaseAmount: dca.purchaseAmount,
        startDate: dca.startDate
    })

    //HANDLE FORM CHANGE
    const handleChange = (e) => {
        setUserInputs({
            ...userInputs,
            [e.target.name]: e.target.value
        })
    }

    //UPDATE DCA on CLICK
    const handleSubmit = () => {
        dispatch(updateDcaCalculator(userInputs))
    }

    return (

        <Wrapper>
            <InnerWrapper>
               <Header>
                    <h1>Dollar Cost Average Calculator</h1>
                    <p>
                        Bitcoin dollar cost averaging consists in investing a fixed amount of USD, into BTC, on regular time intervals. You’ll often see it referenced by its abbreviation of "DCA".
                        
                        Purchasing $10 every week, for example, would be dollar cost averaging.
                
                        This strategy is mostly used by investors that are looking to purchase Bitcoin for the long-term, since it protects them from potentially allocating all their capital at a price peak.'
                    </p>
                </Header>
                <Main>
                    <ScoreCards>
                        <Scorecard 
                            title='Total Invested'
                            value={totalInvested}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title={`Portfolio Value (${state.settings.currency})`}
                            value={value}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title='Bitcoin Holdings'
                            value={runningBal}
                            prefix=''
                            suffix='' 
            />
                    </ScoreCards>
                    <CalcBox>
                        <Calc>
                            <InputField
                                label='Dollar Amount'
                                InputProps={{
                                    startAdornment: (<InputAdornment position='start'>$</InputAdornment>),
                                }}
                                inputProps={{inputMode: 'numeric'}}
                                name='purchaseAmount'
                                value={userInputs.purchaseAmount}
                                onChange={handleChange}
                            />
                            <InputField
                                label='Start Date'
                                type='date'
                                name='startDate'
                                value={userInputs.startDate}
                                onChange={handleChange}
                            />

                            <Button variant='contained' onClick={handleSubmit}>Calculate</Button>
                        </Calc>
                        <Results>
                            Today <br />
                            <h2>You'd Have {runningBal} Bitcoin, Worth ${value} {state.settings.currency}</h2>
                            {`If you would've invested $${dca.purchaseAmount} every day, since ${dca.startDate}`}
                        </Results>
                    </CalcBox>
                </Main>
            </InnerWrapper>
        </Wrapper>
    )
}

export default DollarCostAverage

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.fontColor};
`

const InnerWrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1536px);
    height: 600px;
    text-align: center;
    justify-self: center;
    justify-items: center;
`

const Header = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: minmax(0, 650px);
    text-align: center;
    padding: 2rem;

    & h1 {
        font-size: 3rem;
    }
`
const Main = styled.div`
    display: grid;
    gap: 1rem;
    width: 100%;
    height: 300px;
`

const CalcBox = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 6px;
    padding: 2rem;
    gap: 2rem;
`
const Calc = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
`

const Results = styled.div`
    text-align: left;
`

const ScoreCards = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    gap: 1rem;
`