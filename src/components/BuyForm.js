import EditableInput from "./EditableInput"
import { useState, useEffect, useContext } from 'react'
import NumberFormat from 'react-number-format'
import { InputAdornment, Switch, Button } from "@mui/material"
import InputField from "styledComponents/InputField"
import { SiBitcoinsv } from 'react-icons/si'
import styled from 'styled-components'
import moment from 'moment'
import { numberWithCommas } from "utils/formatting"
import { GlobalContext } from "state/contexts/GlobalContext"
import { handleTransactionSubmit } from "hooks/handleTransactionSubmit"
import * as yup from 'yup'



const BuyForm = (props) => {

    console.log(props)

    const { state } = useContext(GlobalContext)
    const current_price = state.marketData.marketData.current_price.cad

    const [lastFocused, setLastFocused] = useState([
        'dollars', 'price'
    ])

    const [date, setDate] = useState(props.date || moment().format('YYYY-MM-DD'))
    const [dollars, setDollars] = useState(props.amount || 0)
    const [price, setPrice] = useState(Number(props.price) || Number(state.portfolio.historicalData[props.date]) || Number(current_price) || 0)
    const [bitcoin, setBitcoin] = useState(Number(props.bitcoin) || 0)
    const [useHistoricalPrice, setUseHistoricalPrice] = useState(Number(props.price) === Number(props.historicalPrice) ? true : false)

    const [disabled, setDisabled] = useState({
        dollars: false,
        price: false,
        bitcoin: true
    })

    const handleFocus = (e) => {
        lastFocused.shift()
        setLastFocused([...lastFocused, e.target.name])

        if(e.target.name === 'price' && useHistoricalPrice){
            handleSwitch()
        }
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

    const handleSwitch = () => {
        setUseHistoricalPrice(!useHistoricalPrice)
    }

    useEffect(() => {

        let price = state.portfolio.historicalData[date] || current_price || 0
        price = Math.round(price)

        if(useHistoricalPrice){
            setPrice(price)
        }
    },[useHistoricalPrice])


    useEffect(() => {
        setPrice(Math.round(state.portfolio.historicalData[date] || current_price || 0))
    },[state, date, current_price])


    useEffect(() => {
        if(disabled.dollars){
            setDollars((Number(price) * Number(bitcoin)).toFixed(2))
        }
    },[price, bitcoin, disabled])

    useEffect(() => {
        if(disabled.bitcoin){
            setBitcoin((Number(dollars) / Number(price)).toFixed(8))
        }
    },[disabled, dollars, price])

    useEffect(() => {
        if(disabled.price){
            setPrice((Number(dollars) / Number(bitcoin)).toFixed(2))
        }
    },[disabled, bitcoin, dollars])


    const historicalPrice = () => {
        let price = Number(state.portfolio.historicalData[date]) || Number(current_price) || 0
        price = Math.round(price)
        return price        
    }

    const handleSubmit = (e) => {
        handleTransactionSubmit(
            e,
            props.id,
            props.portfolioId,
            state,
            {
                date: date,
                amount: dollars,
                price: price,
                bitcoin: bitcoin,
                type: 'buy'
            },
            props.handleClose
        )
    }

    useEffect(() => {
        if(Number(props.price) !== Number(props.historicalPrice)){
            setPrice(props.price)
        }
    },[])

    let schema = yup.object().shape({
        date: yup.date().min("2016-01-01"),
        amount: yup.number().positive().min(0),
        price: yup.number().positive().min(0),
        bitcoin: yup.number().positive()
    })

    const values = {
        date: date,
        amount: dollars,
        price: price,
        bitcoin: bitcoin,
        type: 'buy'
    }
    
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        schema.isValid(values).then(valid => {
            setSubmitDisabled(!valid)
        })
    },[schema, date, dollars, price, bitcoin])

    return (
        <Form onSubmit={handleSubmit}>
            <h2>{props.formType === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
            <Wrapper>
                <Input>
                    <Label htmlFor='date'>Date</Label>
                    <InputField
                        id='date'
                        name='date'
                        type='date'
                        value={date}
                        size='medium'
                        onChange={(e) => setDate(e.target.value)}
                        inputProps={{inputMode: 'date'}}
                    />
                </Input>

                <Input>
                    <Label htmlFor='dollars'>Dollars</Label>
                    <InputField
                        id='dollars'
                        name='dollars'
                        value={dollars}
                        onChange={(e) => setDollars(e.target.value)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                        }}
                    />
                </Input>

                <Input>
                    <Label htmlFor='price'>Price</Label>
                    <InputField
                        id='price'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric', min: '0'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>1 BTC =</InputAdornment>)
                        }}
                    />
                    <Infospan> <Switch size='small' onChange={handleSwitch} checked={useHistoricalPrice} />{`Use Historical Price: $${historicalPrice()}  `}</Infospan>
                </Input>

                <Input>
                    <Label htmlFor='bitcoin'>Bitcoin</Label>
                    <InputField
                        id='bitcoin'
                        name='bitcoin'
                        value={bitcoin}
                        onChange={(e) => setBitcoin(e.target.value)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            endAdornment: (<InputAdornment position='end'>BTC</InputAdornment>)
                        }}
                    />
                </Input>
                <Button variant='contained' size='large' type='submit' disabled={submitDisabled}>
                {props.formType === 'add' ? 'Add Transaction' : 'Save Changes'}
                </Button>
                <Button variant='text' onClick={() => props.handleClose()}>Cancel</Button>
            </Wrapper>
        </Form>
    )
}

export default BuyForm

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

    & h2 {
        text-align: center;
    }

    & svg.orange {
        color: #fff;
    }
`

const Wrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
`

const Input = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: .25rem;
`

const Label = styled.label`
    font-size: .75rem;
    font-weight: 400;
`

const Infospan = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    justify-items: end;
    gap: .25rem;
    align-items: baseline;
    font-size: .875rem;
`