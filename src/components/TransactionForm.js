import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import { Button, InputAdornment, ButtonGroup, Switch } from '@mui/material'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { db } from 'firebase'
import { SiBitcoinsv } from 'react-icons/si'
import Currency from './Currency'
import SwitchBox from './SwitchBox'
import BuyForm from './BuyForm'
import EditableInput from './EditableInput'
import { handleTransactionSubmit } from 'hooks/handleTransactionSubmit'

const TransactionForm = (props) => {

    //GLOBAL STATE
    const { state } = useContext(GlobalContext)
    const current_price = state.marketData.marketData.current_price.cad

    //FORM INPUTS
    const [bitcoin, setBitcoin] = useState(0)
    const [price, setPrice] = useState(state.portfolio.historicalData[props.date] || current_price || 0)
    const [amount, setAmount] = useState(props.amount || 0)
    const [date, setDate] = useState(props.date || moment().format('YYYY-MM-DD'))

    //STATE TO HANDLE HIDE/SHOW OF CUSTOM INPUTS
    const [disabled, setDisabled] = useState({
        bitcoin: true,
        amount: false,
        price: true
    })

    //STATE TO HANDLE WHETHER BUY OR SELL FORM
    const initialFormType = {
        type: 'buy',
        buyButton: 'contained',
        sellButton: ''
    }

    const [formType, setFormType] = useState(initialFormType)


    //State to handle focused
    const [focus, setFocus] = useState(null)

    //STATE CHANGE HANDLERS
    const changeBitcoin = (e) => {setBitcoin(e.target.value)}
    const changePrice = (e) => {setPrice(e.target.value)}
    const changeAmount = (e) => {setAmount(e.target.value)}
    const changeDate = (e) => {setDate(e.target.value)}


    //ON SUBMIT
    
    const handleSubmit = (e) => {
        handleTransactionSubmit(
            e,
            props.id,
            props.portfolioId,
            state,
            {
                date: date,
                amount: amount,
                price: price,
                bitcoin: bitcoin,
                type: formType.type
            },
            props.handleClose
        )
    }


    useEffect(() => {
        if(props.type === 'sell'){
            setFormType({
                type: 'sell',
                buyButton: '',
                sellButton: 'contained'
            })
        }
    },[])


    const handleFormChange = () => {

        if (formType.type === 'buy'){
            setFormType({
                type: 'sell',
                buyButton: '',
                sellButton: 'contained'
            })
            setDisabled({
                ...disabled,
                bitcoin: false,
                amount: true
            })
        }
        
        else {
            setFormType(
                initialFormType
            )
            setDisabled({
                ...disabled,
                bitcoin: true,
                amount: false,
            })
        }
    }

    //IF DATE CHANGES UPDATE PRICE
    useEffect(() => {
        setPrice(Math.round(state.portfolio.historicalData[date]) || current_price || 0)
    },[state, date, current_price])


    //Update Bitcoin Amount If Values Change and Not Set to Custom
    useEffect(() => {

        if(formType.type === 'buy' && disabled.bitcoin){
            setBitcoin((Number(amount) / Number(price)).toFixed(8) || 0)
        }

    }, [amount, price, formType, disabled, date])

    //Update Dollar Amount If Bitcoin Value Change and Not Set to Custom

    // useEffect(() => {
    //     if(formType.type === 'sell' && disabled.amount){
    //         setAmount((Number(bitcoin) * Number(price)).toFixed(2) || 0)
    //     }
    // },[bitcoin, price, formType, disabled, date])


    /* THINK THROUGH LOGIC
        - Three variable for the transaction (Dollars, Price, Bitcoin)
        - Only Two of Three Can Be Customizable
        - If entering dollars and price bitcoin is calculated
        - If entering price and bitcoin then dollars calculated
        - If entering bitcoin and dollars then price is calculated
    */

    useEffect(() => {
        if(disabled.amount){
            setPrice((Number(bitcoin) * Number(amount)).toFixed(2) || 0)
        }
    },[bitcoin, amount, disabled])

    //TOGGLE FOR IF FIELD DISABLED OR NOT
    const toggleEdit = (e, key) => {
        e.preventDefault()
        setDisabled({
            ...disabled,
            [key]: !disabled[key]
        })
    }

    return (
            <Form onSubmit={handleSubmit}>
                <h2>{props.type === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h2>
                <BuyForm 
                    date={props.date}
                    amount={props.amount}
                    price={state.portfolio.historicalData[props.date]}
                    currentPrice={current_price}                
                />
                <Button variant='contained' size='large' type='submit'>
                {props.fType === 'add' ? 'Add Transaction' : 'Save Changes'}
                </Button>
                
            </Form>
    )
}

export default TransactionForm

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

const Group = styled.div`
    display: grid;
    justify-content: center;
`

const OtherFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.sell{
        flex-direction: column-reverse;
    }
`