import { useContext, Fragment, useState } from 'react'
import { db } from 'firebase'
import styled from 'styled-components'

import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from 'state/contexts/GlobalContext';

const DeleteTransaction = ({portfolioId, transactionId}) => {

    const {state} = useContext(GlobalContext)

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleDelete = (e) => {
        const updatedPortfolio = {...state.portfolio.portfolioObj}
        delete updatedPortfolio[portfolioId].transactions[transactionId]

        db.collection('users').doc(state.user.uid).update({
            portfolio:
                {
                    ...updatedPortfolio
                }
        })
       handleClose()
    }



    return (
        <Fragment>

            <MyDialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
                <DialogContent>
                    By clicking delete you will remove this transaction from the portfolio. Click Delete to proceed.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color='warning' onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </MyDialog>


        <Button 
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
        >
         Delete   
        </Button>

        </Fragment>
    )
}

export default DeleteTransaction

const MyDialog = styled(Dialog)`
& .MuiDialog-paper {
    background-color: rgb(33, 43, 54);
    color: #fff;
    border: '1px solid rgba(145, 158, 171, 0.08)',
}

& h2{
    padding-top: 2rem;
}

& .MuiDialogActions-root {
    border-top: 1px solid rgba(145,158,171,0.24);
    margin-top: 1rem;
    padding-bottom: 1rem;
}
`