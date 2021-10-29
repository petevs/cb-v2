import { storage } from 'firebase'

export const uploadCsvFileToStorage = async (file, uid, portfolioId) => {
    const csvFile = file
    const csvId = Date.now()
    const fileRef = storage.ref(`${uid}/${portfolioId}/${csvId}`)
    await fileRef.put(csvFile)

    return await fileRef.getDownloadURL()
}