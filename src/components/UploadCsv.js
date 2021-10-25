import { Button, CircularProgress } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import { storage, db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'
import axios from 'axios'

const UploadCsv = ({ portfolioId }) => {

    const { state } = useContext(GlobalContext)
    const { uid } = state.user
    console.log(state)


    const [file, setFile] = useState('')
    const [pending, setPending] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [downloadURL, setDownloadURL] = useState('')


    const handleChange = (e) => setFile(e.target.files[0])

    const handleUpload = async (e) => {

        e.preventDefault()
        
        //Set pending to true to show spinner
        setPending(true)

        //Upload file to storage
        const csvFile = file
        const csvId = Date.now()
        const fileRef = storage.ref(`${uid}/${portfolioId}/${csvId}`)
        await fileRef.put(csvFile)

        //Get download url & set
        setDownloadURL(await fileRef.getDownloadURL())


        //Set pending to false to hide spinner
        setPending(false)

        //set uploaded to true to take to next step
        setUploaded(true)
    }


    const csvToArray = (str, delimiter = ',') => {
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter)

        const rows = str.slice(str.indexOf("\n") + 1).split("\n")

        const arr = rows.map((row) => {
            const values = row.split(delimiter)
            const el = headers.reduce((object, header, index) => {
                object[header] = values[index]
                return object
            }, {})
            return el
        })

        return arr
    }

    useEffect(() => {
        axios.get(downloadURL)
            .then(({data}) => console.log(csvToArray(data)))
    }, [uploaded])
    



    if(!uploaded){
        return (
            <Form>
                <h2>Upload CSV File</h2>
                <label htmlFor='file'>Select CSV File</label>
                <InputField
                    id='file'
                    type='file'
                    onChange={handleChange}
                />
                <Button 
                    variant='contained' 
                    size='large' 
                    disabled={!file}
                    onClick={(e) => handleUpload(e)}
                >
                        Upload
                    </Button>
                {pending && <Loading><CircularProgress size='1.3rem' />Uploading...</Loading>}
            </Form>
        )
    }

    if(uploaded){
        return(
            <> NEXT STEP</>
        )
    }

}

export default UploadCsv

const Form = styled.form`
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;

    & h2 {
        text-align: center;
    }

    & svg.orange {
        color: #fff;
    }
`

const Loading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
`
