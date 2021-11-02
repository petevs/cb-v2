import { TableContainer } from 'styledComponents/TableContainer'
import React from 'react'

//Components
import TransactionForm from './TransactionForm';

//icons
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadCsv from 'scenes/portfolio/components/UploadCsv'

//Styled Components
import { HeaderRow } from 'styledComponents/HeaderRow'
import { Button, Table } from '@mui/material'
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import EmptyTable from './EmptyTable';

const OneOffTransactions = ({title, handleOpen, handleClose, id, data}) => {

    const empty = data.length < 1

    return (
        <TableContainer>
            <HeaderRow className='three'>
                <h2>{title}</h2>
                <Button
                        variant='contained'
                        size='small'
                        startIcon={<FileUploadIcon />}
                        onClick={() => handleOpen(
                            <UploadCsv
                                portfolioId={id}
                                handleClose={handleClose}
                            />
                        )}
                    >
                        Upload CSV 
                    </Button>
                    <Button 
                        variant='contained'
                        size='small'
                        startIcon={<AddIcon />}  
                        onClick={() => handleOpen(
                            <TransactionForm 
                                type='add' 
                                handleClose={handleClose}
                                portfolioId={id}
                            />
                        )}
                    >Add New</Button>
            </HeaderRow>

            <Table>
                <TableHeader
                        columns={[
                            'Date',
                            'Type',
                            'Amount',
                            'Price',
                            'Bitcoin',
                            'Actions'
                        ]}

                    />
                <TableContent
                    data={data}
                        columns={[
                            'date',
                            'type',
                            'amount',
                            'price',
                            'bitcoin'
                        ]}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        id={id}
                        ButtonContent={
                            <TransactionForm 
                                type='edit' 
                                handleClose={handleClose}
                                portfolioId={id}
                            />
                        }
                />

            </Table>
            <EmptyTable
                empty={empty} 
                text='Add Your First Transaction'
                handleOpen={handleOpen}
                buttonContent={
                    <TransactionForm
                        handleClose={handleClose}
                        portfolioId={id}
                        type='add'
                    />
                }
            />
        </TableContainer>
    )
}

export default OneOffTransactions


/*
    <Button
            startIcon={<EditIcon />}
            onClick={() => handleOpen(
                <TransactionForm
                    fType='edit'
                    handleClose={handleClose}
                    portfolioId={id}
                    {...row}
                />
            )}
        >
            Edit
        </Button>
        <Button startIcon={<ContentCopyIcon />}>Clone</Button>
        <DeleteTransaction 
            portfolioId={id}
            transactionId={row.id}
        />
    </TableCell>

*/