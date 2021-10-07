import { Button, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import Scorecard from 'components/Scorecard'
import Calculator from 'layouts/Calculator'
import React, { useContext, useState} from 'react'
import InputField from 'styledComponents/InputField'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { updateDcaCalculator } from 'state/actions/calculatorActions'
import styled from 'styled-components'
import Chart from "react-apexcharts";
import MySelect from 'styledComponents/MySelect'

const DollarCostAverage = () => {

    //IMPORT GLOBAL STATE & DESTRUCTURE DCA
    const { state, dispatch } = useContext(GlobalContext)
    const { dca } = state.calculators

    //CALCULATED RESULTS PULLED FROM DCA in GLOBAL STATE
    const {
        runningBal,
        // date,
        // price,
        totalInvested,
        value,
        profit,
        roi,
        days,
        averageCost
    } = dca.lastEntry()

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

    const numberWithCommas = (x) => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    //CHART OPTIONS
    const options = {
        chart: {
          toolbar: {
            show: false,
            // tools: {
            //     download: false,
            // }
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            show: false,
            // formatter: function (value) {
            //   return "$" + numberWithCommas(value);
            // },
            // style: {
            //   colors: ["#fff"],
            // },
          },
          // opposite: true,
        },
        xaxis: {
          type: "datetime",
          categories: dca.calculatedData().map((item) => {
            return item.date;
          }).reverse(),
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        colors: ["#2E99FE", "#FF2F30"],
        tooltip: {
          x: {
            format: "dd MMM HH:mm",
          },
          theme: "dark",
        },
        annotations: {
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: {
            colors: "#fff",
          },
        },
      };
    
      const series = [
        {
          name: `Portfolio Value (${state.settings.currency})`,
          data: dca.calculatedData().map((item) => {
            return item.value;
          }).reverse(),
        },
      ];


    return (

        <Wrapper>
            <InnerWrapper>
               <Header>
                    <h1>Dollar Cost Average Calculator</h1>
                    <p>Calculate The Performance of a Daily Recurring Buy</p>
                </Header>
                <Main>
                    <ScoreCards>
                        <Scorecard 
                            title='Total Invested'
                            value={numberWithCommas(totalInvested)}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title={`Portfolio Value (${state.settings.currency})`}
                            value={numberWithCommas(value)}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title='Gain / Loss'
                            value={numberWithCommas(profit)}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title='Bitcoin Holdings'
                            value={runningBal}
                            prefix=''
                            suffix='' 
                        />
                        <Scorecard 
                            title='ROI'
                            value={roi}
                            prefix=''
                            suffix='%' 
                        />
                        <Scorecard 
                            title='Average Cost'
                            value={numberWithCommas(averageCost)}
                            prefix='$'
                            suffix='' 
                        />
                        <Scorecard 
                            title='Number of Days'
                            value={numberWithCommas(days)}
                            prefix=''
                            suffix='' 
                        />
                    </ScoreCards>
                    <CalcBox>
                        <Calc>
                            <InputField
                                label='Daily Purchase Amount'
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
                            <p>
                            <h5>Today</h5>
                            <h2>You'd Have {runningBal} Bitcoin. Worth ${numberWithCommas(value)}.</h2>
                            {`If you invested $${dca.purchaseAmount} every day, since ${dca.startDate}.`}
                            </p>
                            <ChartWrapper>
                                <Chart
                                    series={series}
                                    options={options}
                                    type='area'
                                    width='100%'
                                    height="400px"
                                />
                            </ChartWrapper>
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
    padding: 0 1rem;
    overflow-y: scroll;

    @media (max-width: 1024px) {
        grid-column: 1 / span 2 ;
    }
`

const InnerWrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1536px);
    text-align: center;
    justify-self: center;
    justify-items: center;
    align-content: start;
    height: auto;
    padding-bottom: 4rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`

const Header = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: minmax(0, 650px);
    text-align: center;
    padding: 2rem;
    gap: 0;

    & h1 {
        font-size: 2.4rem;
    }
`
const Main = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    height: 300px;
`

const CalcBox = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 6px;
    gap: 2rem;
    text-align: left;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
    }
`
const Calc = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-content: start;
    padding: 2rem;
    border-right: 1px solid rgba(145,158,171,0.24);

    @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid rgba(145,158,171,0.24);
    }
`

const Results = styled.div`
    text-align: left;
    padding: 2rem;

    & p {
        line-height: 2rem;
    }

    & h5 {
        text-transform: uppercase;
    }
`

const ChartWrapper = styled.div`
    margin: 0 0 0 -1rem;
`

const ScoreCards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
    justify-items: start;
    gap: 1rem;
    
    @media (max-width: 1024px) {
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
`