import React from 'react'
import NumberFormat from 'react-number-format'

const Currency = ({value}) => {
    return (
        <NumberFormat
            value={value} 
            thousandSeparator={true} 
            prefix={'$'} 
            displayType={'text'} 
            decimalScale={0}
        />
    )
}

export default Currency
