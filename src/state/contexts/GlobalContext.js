import { createContext, useReducer, useEffect } from 'react'
import { initialMarketData, marketDataReducer } from 'state/reducers/marketDataReducer'
import useCombinedReducers from 'use-combined-reducers'
import { setMarketData } from 'state/actions/marketDataActions'
import axios from 'axios'
import { initialTheme, themeReducer } from 'state/reducers/themeReducer'
import { initialSettings, settingsReducer } from 'state/reducers/settingsReducer'


export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useCombinedReducers({
        marketData: useReducer(marketDataReducer, initialMarketData),
        theme: useReducer(themeReducer, initialTheme),
        settings: useReducer(settingsReducer, initialSettings)
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
 
         getData()
 
     }, [])



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
