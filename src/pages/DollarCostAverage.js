import { Button, InputAdornment } from '@mui/material'
import Scorecard from 'components/Scorecard'
import Calculator from 'layouts/Calculator'
import React from 'react'
import InputField from 'styledComponents/InputField'

const DollarCostAverage = () => {

    const dcaAmount = 5
    const date = '2021-01-01'


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
                        value={dcaAmount}
                    />
                    <InputField
                        label='Start Date'
                        type='date'
                        value={date}
                    />
                </>
                }
                button={<Button variant='contained'>Calculate</Button>}
        >
            <Scorecard 
                title='Bitcoin Holdings'
                value={0.33544956}
                prefix=''
                suffix='' 
            />
            <Scorecard 
                title='Portfolio Value (USD)'
                value={1587}
                prefix='$'
                suffix='' 
            />
        </Calculator>
    )
}

export default DollarCostAverage