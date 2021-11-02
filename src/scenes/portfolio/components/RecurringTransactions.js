import { TableContainer } from 'styledComponents/TableContainer'
import styled from 'styled-components'

//Components
import RecurringBuyForm from './RecurringBuyForm';

//icons
import AddIcon from '@mui/icons-material/Add';

//Styled Components
import { HeaderRow } from 'styledComponents/HeaderRow'
import { Button, Table } from '@mui/material'
import TableHeader from './TableHeader';
import TableContent from './TableContent';

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

                    />{
                        !empty && <TableContent
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
                    }
            </Table>
            {empty &&               
            <EmptyTable>
                <Button 
                    variant='text'
                    size='small'
                    startIcon={<AddIcon />} 
                    onClick={() => handleOpen(
                        <RecurringBuyForm 
                            handleClose={handleClose} 
                            portfolioId={id} 
                            type='add'
                        />
                    )}>
                        Add Your First Recurring Transaction
                    </Button>
            </EmptyTable>
            }
            
        </TableContainer>
    )
}

export default RecurringTransactions


const EmptyTable = styled.div`
    display: grid;
    justify-content: center;
    text-align: center;
    padding: 1rem 0 0 0;

`