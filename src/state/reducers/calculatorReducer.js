import { dca } from "state/initialStates/dca"

export const UPDATE_DCA_CALCULATOR = 'UPDATE_DCA_CALCULATOR'
export const UPDATE_HISTORICAL_DATA = 'UPDATE_HISTORICAL_DATA'



export const initialCalculators = {
    loading: true,
    dca: dca,
}

export const calculatorReducer = (state, action) => {
    switch(action.type){
        case UPDATE_DCA_CALCULATOR:
            return {
                ...state,
                dca: {
                    ...state.dca,
                    purchaseAmount: action.payload.purchaseAmount,
                    startDate: action.payload.startDate
                    }
                }
            case UPDATE_HISTORICAL_DATA:
                return {
                    ...state,
                    dca: {
                        ...state.dca,
                        historicalData: action.payload
                    },
                    loading: false,
                }
            
            default:
                return state
            }
    }