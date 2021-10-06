import React, { createContext, useReducer } from 'react'
import { themeReducer, initialTheme } from 'state/reducers/themeReducer'



export const ThemeContext = createContext()

const ThemeProvider = ({children}) => {

    const [ themeState, themeDispatch ] = useReducer(themeReducer, initialTheme)

    return (
        <ThemeContext.Provider
            value={{
                themeState,
                themeDispatch
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
