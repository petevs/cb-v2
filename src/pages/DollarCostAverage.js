import Scorecard from 'components/Scorecard'
import Calculator from 'layouts/Calculator'
import React from 'react'

const DollarCostAverage = () => {
    return (
        <Calculator
            title='Dollar Cost Average'
            header={
                <>
                    <input type='number' value='$5' />
                    <select>
                        <option>Every Week</option>
                    </select>
                    <select>
                        <option>Since Last Year</option>
                    </select>
                </>
            }
        >
            
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
