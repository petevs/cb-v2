import moment from 'moment'

export const getDatesBetween = (start, end) => {

    let dateList = []

    let current = moment(start)
    const stopDate = moment(end)

    while(current.isSameOrBefore(stopDate)){
        dateList.push(current.format('YYYY-MM-DD'))
        current.add(1, 'days')
    }

    return dateList
}