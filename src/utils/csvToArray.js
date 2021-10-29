export const csvToArray = (str, delimiter = ',') => {

    const rows = str.slice(str.indexOf("\n") + 1).split("\r\n")

    const transactions = rows.map((row) => {
            const values = row.split(delimiter)
            return {
                date: values[0],
                type: values[1],
                amount: Number(values[2]),
                price: Number(values[3]),
                bitcoin: Number(values[4])
            }
        })

    return transactions
}