import { Button, CircularProgress } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import { storage, db } from 'firebase'
import { GlobalContext } from 'state/contexts/GlobalContext'

const UploadCsv = ({ portfolioId }) => {

    const { state } = useContext(GlobalContext)
    const { uid } = state.user
    console.log(state)


    const [file, setFile] = useState('')
    const [pending, setPending] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [downloadURL, setDownloadURL] = useState('')


    const handleChange = (e) => setFile(e.target.files[0])

    const handleUpload = async () => {
        setPending(true)

        const csvFile = file
        const csvId = Date.now()
        const fileRef = storage.ref(`${uid}/${portfolioId}/${csvId}`)
        await fileRef.put(csvFile)
        setDownloadURL(await fileRef.getDownloadURL())
        setPending(false)
    }

    
    

    return (
        <Form>
            <h2>Upload CSV File</h2>
            <label htmlFor='file'>Select CSV File</label>
            <InputField
                id='file'
                type='file'
                onChange={handleChange}
            />
            <Button variant='contained' size='large' disabled={!uploaded}>Upload</Button>
            {pending && <Loading><CircularProgress size='1.3rem' />Uploading...</Loading>}
        </Form>
    )
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
