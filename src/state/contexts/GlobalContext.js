import { createContext, useReducer, useEffect, useState } from 'react'
import { initialMarketData, marketDataReducer } from 'state/reducers/marketDataReducer'
import useCombinedReducers from 'use-combined-reducers'
import { setMarketData } from 'state/actions/marketDataActions'
import axios from 'axios'
import { initialTheme, themeReducer } from 'state/reducers/themeReducer'
import { initialSettings, settingsReducer } from 'state/reducers/settingsReducer'
import { calculatorReducer, initialCalculators } from 'state/reducers/calculatorReducer'
import { updateHistoricalData } from 'state/actions/calculatorActions'
import { setUser } from 'state/actions/authActions'
import { auth } from 'firebase'
import { authReducer, initialAuthState } from 'state/reducers/authReducer'
import { db } from 'firebase'
import { initialPortfolioState, portfolioReducer } from 'state/reducers/portfolioReducer'
import { setPortfolios, updateHistoricalDataPF, updateHistoricalDataObj } from 'state/actions/portfolioActions'
import { initialModalState, modalReducer } from 'state/reducers/modalReducer'
import moment from 'moment'


export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useCombinedReducers({
        marketData: useReducer(marketDataReducer, initialMarketData),
        theme: useReducer(themeReducer, initialTheme),
        settings: useReducer(settingsReducer, initialSettings),
        calculators: useReducer(calculatorReducer, initialCalculators),
        user: useReducer(authReducer, initialAuthState),
        portfolio: useReducer(portfolioReducer, initialPortfolioState),
        modal: useReducer(modalReducer, initialModalState)
    })

    const [pending, setPending] = useState(true);

    //GET AUTH
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
              dispatch(setUser(user));
            } else {
              dispatch(setUser(initialAuthState));
            }
            setPending(false);
          });
    },[])

    //GET & SET USER DETAILS

        useEffect(() => {

            db.collection('users').doc(state.user.uid).onSnapshot((doc) => {
                const result = doc.data()

                if(result){

                    const { portfolio } = result    
                    const portfolioList = []
                    for (const key in portfolio){
                        portfolioList.push({
                            id: key,
                            portfolioDescription: portfolio[key].portfolioDescription,
                            portfolioName: portfolio[key].portfolioName,
                            transactions: portfolio[key].transactions || [],
                            recurringBuys: portfolio[key].recurringBuys || {}
                        })
                    }

                    dispatch(setPortfolios({
                        portfolioList: portfolioList,
                        portfolioObj: result.portfolio
                    }))
                }
            })

        },[state.user.uid])


    //GET MARKET & HISTORICAL DATA
    useEffect(() => {

        //GET CURRENT MARKET DATA

        //GET MARKET DATA & DISPATCH TO CONTEXT

        db.collection('marketData').doc('data').onSnapshot((doc) => {
            const result = doc.data()
            dispatch(setMarketData(result))
        })

         //GET HISTORICAL DATA 
        db.collection('historicalData').doc('cad').onSnapshot((doc) => {
            const result = doc.data().marketData
            dispatch(updateHistoricalDataObj({...result}))
        })
 
     }, [])


     //ADD TO FIREBASE

    //  useEffect(() => {

    //     const getHistorical = async () => {
    //         const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=3650&interval=daily`)
    //         const { prices } = data

    //         let historical = {}
            
    //         prices.forEach(item => {
    
    //         const friendlyDate = moment(item[0]).format('YYYY-MM-DD')
    
    //         historical = {
    //             ...historical,
    //             [friendlyDate]: item[1]
    //         }
    //         })
            
    //         db.collection('historicalData').doc('cad').set(historical)

    //     }

    //     getHistorical()
    //     console.log('all done')
    //  },[])

    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
                pending
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
