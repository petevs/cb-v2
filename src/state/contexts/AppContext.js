import React, { createContext, useReducer, useEffect} from 'react'
import { appReducer, initialApp } from 'state/reducers/appReducer'
import axios from 'axios'
import { setMarketData } from 'state/actions/appActions'



export const AppContext = createContext()

const AppProvider = ({children}) => {

    const [appState, appDispatch] = useReducer(appReducer, initialApp)


    useEffect(() => {

       const getData = async () => {
            try {

                //GET MARKET DATA
                const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
                
                //SET MARKET DATA TO APP CONTEXT
                appDispatch(setMarketData(data.market_data))



            } catch (err) {
                console.log(err)
            }
        }

        getData()

    }, [])




    return (
        <AppContext.Provider
            value={{
                appState,
                appDispatch
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
