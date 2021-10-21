import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import moment from 'moment'
import { Button, InputAdornment, ButtonGroup, Switch } from '@mui/material'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { db } from 'firebase'
import { SiBitcoinsv } from 'react-icons/si'
import IconButton from 'styledComponents/IconButton'


import EditIcon from '@mui/icons-material/Edit';

const TransactionForm = (props) => {

    const { state } = useContext(GlobalContext)

    const current_price = state.marketData.marketData.current_price.cad

    console.log(state)

    const [bitcoin, setBitcoin] = useState(0)
    const [price, setPrice] = useState(state.portfolio.historicalData[props.date] || current_price || 0)
    const [amount, setAmount] = useState(props.amount || 0)
    const [date, setDate] = useState(props.date || moment().format('YYYY-MM-DD'))

    const [disabled, setDisabled] = useState({
        bitcoin: true,
        amount: false,
        price: true
    })

    const changeBitcoin = (e) => {setBitcoin(e.target.value)}
    const changePrice = (e) => {setPrice(e.target.value)}
    const changeAmount = (e) => {setAmount(e.target.value)}
    const changeDate = (e) => {setDate(e.target.value)}


    const handleSubmit = (e) => {
        e.preventDefault()


        const firebaseId = props.id || Date.now()

        db.collection('users').doc(state.user.uid).update({
            portfolio: {
                ...state.portfolio.portfolioObj,
                [props.portfolioId]: {
                    ...state.portfolio.portfolioObj[props.portfolioId],
                    transactions: {
                        ...state.portfolio.portfolioObj[props.portfolioId].transactions,
                        [firebaseId]: {
                            date: date,
                            amount: amount,
                            price: price,
                            bitcoin: bitcoin,
                            type: formType.type
                        }
                    }
                }
            }
        })

        props.handleClose()
    }

     //TOGGLE FORM TYPE
     const initialFormType = {
        type: 'buy',
        buyButton: 'contained',
        sellButton: ''
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
    
    const [formType, setFormType] = useState(initialFormType)

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

    //Update Price on Date Change
    useEffect(() => {
        setPrice(state.portfolio.historicalData[date] || current_price || 0)
    },[state, date])

    //Update Bitcoin Amount If Values Change and Not Set to Custom

    useEffect(() => {

        if(formType.type === 'buy' && disabled.bitcoin){
            setBitcoin((Number(amount) / Number(price)).toFixed(8) || 0)
        }

    }, [amount, price, formType, disabled, date])

    //Update Dollar Amount If Values Change and Not Set to Custom

    useEffect(() => {
        if(formType.type === 'sell' && disabled.amount){
            setAmount((Number(bitcoin) * Number(price)).toFixed(2) || 0)
        }
    },[bitcoin, price, formType, disabled, date])


    //IF Bitcoin Amount is Custom Then Disable price
    //Change historic price label to Calculated Price


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
                <Group>
                    <ButtonGroup >
                        <Button size='small' variant={formType.buyButton} onClick={handleFormChange}>Buy</Button>
                        <Button size='small' variant={formType.sellButton} onClick={handleFormChange}>Sell</Button>
                    </ButtonGroup>
                </Group>
                <InputField
                    
                    name='date'
                    label='Date'
                    type='date'
                    value={date}
                    size='medium'
                    onChange={changeDate}
                    inputProps={{inputMode: 'date'}}
                    variant='standard'
                />
                <OtherFields className={formType.type}>    
                        <InputField
                        name='amount'
                        label={formType.type === 'buy' ? 'From: Dollars' : 'To: Dollars'}
                        type='numeric'
                        value={amount}
                        size='medium'
                        onChange={changeAmount}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>$</InputAdornment>)
                        }}
                        disabled={disabled.amount}
                        variant='standard'
                    />
                    <SwitchBox className={disabled.price && 'checked'}>
                    <div>
                        <span>Use Historical Price:</span>
                        <h4>1BTC = {`$${state.portfolio.historicalData[date] || current_price || 0}`}</h4>
                    </div>
                    <Switch checked={disabled.price} onChange={(e) => toggleEdit(e, 'price')}/>
                </SwitchBox>
                {
                //If price is disabled hide price field
                !disabled.price &&
                    <InputField
                        label='Custom Price'
                        value={price}
                        onChange={changePrice}
                        inputProps={{inputMode: 'numeric'}}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>1 BTC =</InputAdornment>)
                        }}
                        variant='standard'
                    />
                }
                <SwitchBox className={disabled.bitcoin && 'checked'}>
                    <div>
                        <span>Bitcoin Received (auto-calculated):</span>
                       <Line><SiBitcoinsv /><h4>{bitcoin}</h4></Line>
                    </div>
                    <Switch checked={disabled.bitcoin} onChange={(e) => toggleEdit(e, 'bitcoin')}/>
                </SwitchBox>
                {
                !disabled.bitcoin &&               
                <InputField
                    name='bitcoin'
                    label={formType.type === 'buy' ? 'Bitcoin Received (custom)' : 'From: Bitcoin'}
                    type='numeric'
                    value={bitcoin}
                    size='medium'
                    onChange={changeBitcoin}
                    inputProps={{inputMode: 'numeric'}}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><SiBitcoinsv className='orange'/></InputAdornment>),
                    }}
                    variant='standard'
                    />}
                </OtherFields>
                
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

    & button {
        margin-top: 1rem;
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

const SwitchBox = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    // padding: 0  0.5rem 0.5rem 0.875rem;
    color: rgba(0, 0, 0, 0.38);

    & h4 {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.4375rem;
    }

    &.checked {
        color: #fff;
    }


    & div {
        display: grid;
        grid-auto-flow: row;
        line-height: 1.3rem;
        
        & span {
            font-size: .75rem;
            text-transform: capitalize;
        }
    }
`

const Line = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
`