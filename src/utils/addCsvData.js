import axios from 'axios'
import { addTransactionsToFb } from './addTransactionsToFb'
import { csvToArray } from './csvToArray'


export const addCsvData = async (url, uid, state, portfolioId) => {

    const { data } = await axios.get(url)
    const parsedData = csvToArray(data)

    addTransactionsToFb(parsedData, uid, state, portfolioId)

} 