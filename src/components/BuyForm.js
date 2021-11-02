
import { useState, useEffect, useContext, useCallback, useMemo } from 'react'

import { InputAdornment, Switch, Button } from "@mui/material"
import InputField from "styledComponents/InputField"

import styled from 'styled-components'
import moment from 'moment'
import { GlobalContext } from "state/contexts/GlobalContext"
import { handleTransactionSubmit } from "utils/handleTransactionSubmit"
import * as yup from 'yup'



const BuyForm = (props) => {

    const { state } = useContext(GlobalContext)
    const current_price = state.marketData.marketData.current_price.cad

    const [lastFocused, setLastFocused] = useState([
        'dollars', 'price'
    ])

    const [date, setDate] = useState(props.date || moment().format('YYYY-MM-DD'))
    const [dollars, setDollars] = useState(props.amount || 0)
    const [price, setPrice] = useState(Number(props.price) || Number(state.portfolio.historicalData[props.date]) || Number(current_price) || 0)
    const [bitcoin, setBitcoin] = useState(Number(props.bitcoin) || 0)
    const [useHistoricalPrice, setUseHistoricalPrice] = useState(
        //If the props price equals historical or if there is no props price then use historical price
        (Number(props.price) === Number(props.historicalPrice) || !props.price )
        ? true : false)

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

        let price = state.portfolio.historicalData[date] || Number(current_price) || 0
        price = Math.round(price)

        if(useHistoricalPrice){
            setPrice(Number(price))
        }
    },[useHistoricalPrice, current_price, date, state.portfolio.historicalData])


    useEffect(() => {
        setPrice(Math.round(state.portfolio.historicalData[date] || Number(current_price) || 0))
    },[state, date, current_price])


    useEffect(() => {
        if(disabled.dollars){
            setDollars((Number(price) * Number(bitcoin)).toFixed(2))
        }
    },[price, bitcoin, disabled])

    useEffect(() => {
        if(disabled.bitcoin){
            setBitcoin((Number(dollars) / Number(price)).toFixed(8))

            if(Number(price) === 0 || Number(dollars) === 0){
                setBitcoin(0.00000000)
            }
        }
    },[disabled, dollars, price])

    useEffect(() => {
        if(disabled.price){
            setPrice((Number(dollars) / Number(bitcoin)).toFixed(2))
        }
    },[disabled, bitcoin, dollars])


    const historicalPrice = useCallback(() => {
        let price = Number(state.portfolio.historicalData[date]) || Number(current_price) || 0
        price = Math.round(price)
        return price        
    },[current_price, date, state.portfolio.historicalData])

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

        if(!props.price){
            setPrice(historicalPrice())
        }
    },[props.price, props.historicalPrice, historicalPrice])

    let schema = yup.object().shape({
        date: yup.date().min(moment('2015-01-01').format('YYYY-MM-DD')).max(moment().format('YYYY-MM-DD')),
        dollars: yup.number().positive().min(0),
        price: yup.number().positive().min(0),
        bitcoin: yup.number().positive().min(0),
        type: yup.string()
    })

    const values = useMemo(() => {
        return {
            date: date,
            amount: dollars,
            dollars: dollars,
            price: price,
            bitcoin: bitcoin,
            type: 'buy'
        }
    },[bitcoin, date, dollars, price]) 
    
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const [errors, setErrors] = useState({
        date: '',
        amount: '',
        price: '',
        bitcoin: '',
        type: ''
    })

    const validateChange = (e) => {
        yup.reach(schema, e.target.name)
        .validate(e.target.value)
        .then(valid => setErrors({
            ...errors,
            [e.target.name]: ''
        }))
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
    }

    const handleChange = (e, callback) => {
        e.persist()
        validateChange(e)
        callback(e.target.value)
    }

    useEffect(() => {

        schema.isValid(values).then(valid => {
            setSubmitDisabled(!valid)
        })

    },[schema, date, dollars, price, bitcoin, values])


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
                        onChange={(e) => handleChange(e, setDate)}
                        inputProps={{inputMode: 'date'}}
                        error={errors.date}
                        helperText={errors.date}
                    />
                </Input>

                <Input>
                    <Label htmlFor='dollars'>Dollars</Label>
                    <InputField
                        id='dollars'
                        name='dollars'
                        value={dollars}
                        onChange={(e) => handleChange(e, setDollars)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                        }}
                        error={errors.dollars}
                        helperText={errors.dollars}
                    />
                </Input>

                <Input>
                    <Label htmlFor='price'>Price</Label>
                    <InputField
                        id='price'
                        name='price'
                        value={price}
                        onChange={(e) => handleChange(e, setPrice)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric', min: '0'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>1 BTC =</InputAdornment>)
                        }}
                        error={errors.price}
                        helperText={errors.price}
                    />
                    <Infospan> <Switch size='small' onChange={handleSwitch} checked={useHistoricalPrice} />{`Use Historical Price: $${historicalPrice()}  `}</Infospan>
                </Input>

                <Input>
                    <Label htmlFor='bitcoin'>Bitcoin</Label>
                    <InputField
                        id='bitcoin'
                        name='bitcoin'
                        value={bitcoin}
                        onChange={(e) => handleChange(e, setBitcoin)}
                        onFocus={handleFocus}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            endAdornment: (<InputAdornment position='end'>BTC</InputAdornment>)
                        }}
                        error={errors.bitcoin}
                        helperText={errors.bitcoin}
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