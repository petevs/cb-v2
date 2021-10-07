import { Button } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import InputField from 'styledComponents/InputField'
import { db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { recurringBuy } from 'utils/recurringBuy'

const Portfolio = () => {

    const [portfolio, setPortfolio] = useState('')
    const [inputs, setInputs] = useState({
        startDate: '2020-01-01',
        endDate: '2021-10-01',
        purchaseAmount: 5,
    })

    const [transactions, setTransactions] = useState([])

    const { state } = useContext(GlobalContext)

    const [userPortfolios, setUserPortfolios] = useState([])

    const { user } = state

    const handleChange = (e) => {
        setPortfolio(e.target.value)
    }

    const handleDateChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const portTrans = recurringBuy(
            inputs.purchaseAmount,
            inputs.startDate,
            inputs.endDate,
            state.calculators.dca.historicalData
        )

        db.collection('users').doc(user.uid).collection('portfolios').doc().set({
            name: portfolio,
            transactions: portTrans
        })
        setPortfolio('')
    }

    useEffect(() => {
        db.collection('users').doc(user.uid).collection('portfolios').onSnapshot(snapshot => {
            const result = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data}
            })
            setUserPortfolios(result)
    })
    },[])

    console.log(userPortfolios)

 

    return (
        <div>
            <form>
                <InputField
                    label='Portfolio Name'
                    value={portfolio}
                    onChange={handleChange}
                />
                <InputField
                    label='startDate'
                    name='startDate'
                    value={inputs.startDate}
                    onChange={handleDateChange}
                />
                <InputField
                    label='endDate'
                    name='endDate'
                    value={inputs.endDate}
                    onChange={handleDateChange}
                />
                <InputField
                    label='purchaseAmount'
                    name='purchaseAmount'
                    value={inputs.purchaseAmount}
                    onChange={handleDateChange}
                />
                <Button
                    onClick={handleSubmit}
                >
                    Add Portfolio
                </Button>
            </form>
        </div>
    )
}

export default Portfolio
