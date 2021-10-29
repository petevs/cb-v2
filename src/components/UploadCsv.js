import { Button, CircularProgress } from '@mui/material'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import InputField from 'styledComponents/InputField'
import { GlobalContext } from 'state/contexts/GlobalContext'
import { addCsvData } from 'utils/addCsvData'
import { uploadCsvFileToStorage } from 'utils/uploadCsvFileToStorage'

const UploadCsv = ({ portfolioId, handleClose }) => {

    const { state } = useContext(GlobalContext)
    const { uid } = state.user

    const [file, setFile] = useState('')
    const [pending, setPending] = useState(false)

    const handleChange = (e) => setFile(e.target.files[0])

    const handleUpload = async (e) => {

        e.preventDefault()
        setPending(true)
        const downloadURL = await uploadCsvFileToStorage(file, uid, portfolioId )
        await addCsvData(downloadURL, uid, state, portfolioId)
        setPending(false)
        handleClose()
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
