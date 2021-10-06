import { createContext, useReducer, useEffect } from 'react'
import { initialMarketData, marketDataReducer } from 'state/reducers/marketDataReducer'
import { setMarketData } from 'state/actions/marketDataActions'
import axios from 'axios'

export const MarketDataContext = createContext()

const MarketDataProvider = ({children}) => {

    const [ marketData, marketDataDispatch ] = useReducer(marketDataReducer, initialMarketData)


    useEffect(() => {

       const getData = async () => {
            try {

                //GET MARKET DATA
                const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
                
                //SET MARKET DATA TO APP CONTEXT
                marketDataDispatch(setMarketData(data.market_data))



            } catch (err) {
                console.log(err)
            }
        }

        getData()

    }, [])


    return (
        <MarketDataContext.Provider
            value={{
                marketData,
                marketDataDispatch
            }}
        >
            {children}
        </MarketDataContext.Provider>
    )
}

export default MarketDataProvider
