import React, { Fragment, useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom'
import { db } from 'firebase'


const DeletePortfolio = ({state, id}) => {

    const history = useHistory()


    const [open, setOpen] = useState(false)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const handleDelete = () => {

        const updatedPortfolio = {...state.portfolio.portfolioObj}
        delete updatedPortfolio[id]

        db.collection('users').doc(state.user.uid).update({
            portfolio:
            {
                ...updatedPortfolio
            }
        })
        history.push('/portfolio')
        handleClose()
        
    }
   
    
    return (
        <Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Are you sure you want to delete this portfolio?</DialogTitle>
                <DialogContent>
                    By clicking delete you will remove this portfolio and all of its data. Click Delete to proceed.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color='warning' onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Button
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
            >
            Delete
            </Button>
        </Fragment>
    )
}

export default DeletePortfolio
