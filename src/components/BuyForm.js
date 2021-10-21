import EditableInput from "./EditableInput"
import { SiBitcoinsv } from 'react-icons/si'
import { useState, useContext } from 'react'
import { GlobalContext } from "state/contexts/GlobalContext"



const BuyForm = () => {

    const {state, dispatch} = useContext(GlobalContext)

    console.log(state.transaction)

    return (
        <>
            <EditableInput 
                thousandSeparator={true}
                prefix='$'
            />
            <EditableInput 
                adornment='1 BTC ='
                thousandSeparator={true}
                prefix='$'
            />
            <EditableInput 
                adornment={<SiBitcoinsv />}
                fixedDecimalScale={true}
                decimalScale={8}
            />
        </>
    )
}

export default BuyForm