import { TableContainer } from 'styledComponents/TableContainer'

//Components
import RecurringBuyForm from './RecurringBuyForm';

//icons
import AddIcon from '@mui/icons-material/Add';

//Styled Components
import { HeaderRow } from 'styledComponents/HeaderRow'
import { Button, Table } from '@mui/material'
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import EmptyTable from './EmptyTable';

const RecurringTransactions = ({title, handleOpen, handleClose, id, data}) => {

    const empty = data.length < 1

    return (
        <TableContainer>
            <HeaderRow>
                <h2>{title}</h2>
                <Button 
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen(
                        <RecurringBuyForm 
                            handleClose={handleClose} 
                            portfolioId={id} 
                            type='add'
                        />
                    )}>
                        Add New
                    </Button>
            </HeaderRow>

            <Table>
                <TableHeader
                        columns={[
                            'Amount',
                            'Start',
                            'End',
                            'Actions'
                        ]}

                    />
                    <TableContent
                            data={data}
                                columns={[
                                    'purchaseAmount',
                                    'startDate',
                                    'endDate'
                                ]}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                id={id}
                    />
            </Table>
            <EmptyTable
                empty={empty} 
                text='Add Your First Recurring Transaction'
                handleOpen={handleOpen}
                buttonContent={
                    <RecurringBuyForm
                        handleClose={handleClose}
                        portfolioId={id}
                        type='add'
                    />
                }
            />
            
        </TableContainer>
    )
}

export default RecurringTransactions
