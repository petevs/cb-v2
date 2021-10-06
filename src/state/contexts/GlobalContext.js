import { createContext, useReducer, useEffect } from 'react'
import { initialMarketData, marketDataReducer } from 'state/reducers/marketDataReducer'
import useCombinedReducers from 'use-combined-reducers'
import { setMarketData } from 'state/actions/marketDataActions'
import axios from 'axios'
import { initialTheme, themeReducer } from 'state/reducers/themeReducer'
import { initialSettings, settingsReducer } from 'state/reducers/settingsReducer'
import { calculatorReducer, initialCalculators } from 'state/reducers/calculatorReducer'
import { updateHistoricalData } from 'state/actions/calculatorActions'


export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useCombinedReducers({
        marketData: useReducer(marketDataReducer, initialMarketData),
        theme: useReducer(themeReducer, initialTheme),
        settings: useReducer(settingsReducer, initialSettings),
        calculators: useReducer(calculatorReducer, initialCalculators)
    })

    useEffect(() => {

        const getData = async () => {
             try {
 
                 //GET MARKET DATA & DISPATCH TO CONTEXT
                 const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')

                 dispatch(setMarketData(data.market_data))
 
 
             } catch (err) {
                 console.log(err)
             }
         }

         const getHistorical = async () => {

             const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${state.settings.currency}&days=3650&interval=daily`)

             const { prices } = data

             dispatch(updateHistoricalData(prices))

         }

 
         getData()
         getHistorical()
 
     }, [state.settings.currency])



    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
