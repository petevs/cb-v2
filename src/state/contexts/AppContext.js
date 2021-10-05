import React, { createContext, useReducer} from 'react'
import { appReducer, initialApp } from 'state/reducers/appReducer'



export const AppContext = createContext()

const AppProvider = ({children}) => {

    const [appState, appDispatch] = useReducer(appReducer, initialApp)


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
