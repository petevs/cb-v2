import React from 'react'
import axios from 'axios'
import { database } from 'firebase'
import { Button } from '@mui/material'
import moment from 'moment'

const PortfolioMain = () => {


    // const details = {
    //     startDate: "2019-04-01",
    //     endDate: null,
    //     frequency: "daily",
    //     dollarAmount: 50,
    //     currency: "cad"
    // }

    // const handleSubmit = async () => {
    //     const {data} = await axios.post('http://localhost:5000/calculatingbitcoin/us-central1/api/dca', details)

    //     console.log(data)
    // }


    // handleSubmit()

    const getPrices = async (currency, days) => {
        
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}&interval=daily`)

        const prices = data
    
        let results = {}
    
        prices.prices.forEach(item => {

            const friendlyDate = moment(item[0]).format('YYYY-MM-DD')
            const price = item[1]
    
            results = {
                ...results,
                [friendlyDate]: price
            }
        })
    
        return results
    
    }



    const uploadRealtime = async () => {

        const prices = await getPrices('cad', 3650)
        database.ref('prices/').set(prices)
    }

    database.ref('prices').on('value', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
    })



    return (
        <div>
            <Button onClick={uploadRealtime}>Test Write to RTDB</Button>
        </div>
    )
}

export default PortfolioMain
