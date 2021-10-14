export const sortByDate = (a,b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
}