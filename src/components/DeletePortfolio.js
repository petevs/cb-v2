import React from 'react'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


const DeletePortfolio = () => {
    return (
        <Button
        startIcon={<DeleteIcon />}
        >
        Delete
    </Button>
    )
}

export default DeletePortfolio
