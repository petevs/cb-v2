import EditableInput from "./EditableInput"
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'




const BuyForm = () => {

    const [lastFocused, setLastFocused] = useState([
        'dollars', 'price'
    ])

    const [dollars, setDollars] = useState(500)
    const [price, setPrice] = useState(75000)
    const [bitcoin, setBitcoin] = useState(0)

    const [disabled, setDisabled] = useState({
        dollars: false,
        price: false,
        bitcoin: true
    })

    const handleFocus = (e) => {
        lastFocused.shift()
        setLastFocused([...lastFocused, e.target.name])
    }

    useEffect(() => {

        if(lastFocused.includes('dollars') && lastFocused.includes('price')){
            setDisabled({
                dollars: false,
                price: false,
                bitcoin: true,
            })
        }

        if(lastFocused.includes('dollars') && lastFocused.includes('bitcoin')){
            setDisabled({
                dollars: false,
                price: true,
                bitcoin: false,
            })
        }

        if(lastFocused.includes('price') && lastFocused.includes('bitcoin')){
            setDisabled({
                dollars: true,
                price: false,
                bitcoin: false,
            })
        }

    }, [lastFocused])


    useEffect(() => {
        if(disabled.dollars){
            setDollars(Number((Number(price) * Number(bitcoin)).toFixed(2)))
        }
    },[price, bitcoin, disabled])

    useEffect(() => {
        if(disabled.bitcoin){
            setBitcoin(Number((Number(dollars) / Number(price)).toFixed(8)))
        }
    },[disabled, dollars, price])

    useEffect(() => {
        if(disabled.price){
            setPrice(Number((Number(dollars) / Number(bitcoin)).toFixed(2)))
        }
    },[disabled, bitcoin, dollars])



    return (
        <>
            {/* <EditableInput
                label={'From: Dollars'} 
                thousandSeparator={true}
                prefix='$'
            />
            <EditableInput
                label={'Bitcoin Price'} 
                adornment='1 BTC ='
                thousandSeparator={true}
                prefix=''
            />
            <EditableInput
                label={'Bitcoin Received'} 
                adornment={<SiBitcoinsv />}
                fixedDecimalScale={true}
                decimalScale={8}
            /> */}
            <label htmlFor='dollars'>Dollars</label>
            <NumberFormat
                id='dollars'
                name='dollars'
                value={dollars}
                onChange={(e) => setDollars(e.target.value)}
                onFocus={handleFocus}
                prefix='$'
                thousandSeparator={true}
            />
            <label htmlFor='price'>Price</label>
            <input
                id='price'
                name='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onFocus={handleFocus}
            />
            <label htmlFor='bitcoin'>Bitcoin</label>
            <input
                id='bitcoin'
                name='bitcoin'
                value={bitcoin}
                onChange={(e) => setBitcoin(e.target.value)}
                onFocus={handleFocus}
            />
        </>
    )
}

export default BuyForm