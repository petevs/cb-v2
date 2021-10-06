import { Button, InputAdornment } from '@mui/material'
import Scorecard from 'components/Scorecard'
import Calculator from 'layouts/Calculator'
import React, { useContext, useState} from 'react'
import InputField from 'styledComponents/InputField'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { updateDcaCalculator } from 'state/actions/calculatorActions'

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
        <Calculator
            title='Dollar Cost Average'
            header={
                <>
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
                </>
                }
                button={<Button variant='contained' onClick={handleSubmit}>Calculate</Button>}
        >
            <Scorecard 
                title='Total Invested'
                value={totalInvested}
                prefix='$'
                suffix='' 
            />
            <Scorecard 
                title='Portfolio Value (USD)'
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
        </Calculator>
    )
}

export default DollarCostAverage