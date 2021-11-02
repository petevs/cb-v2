import { Button, TableBody, TableCell } from '@mui/material'
import React from 'react'
import MyTableRow from 'styledComponents/MyTableRow'
import RecurringBuyForm from './RecurringBuyForm'
import EditIcon from '@mui/icons-material/Edit';

const TableContent = ({data, columns, handleOpen, handleClose, id, ButtonContent}) => {

    if(data.length < 1){
        return(<></>)
    }

    return (
        <TableBody>
            {data.map((row) => (
                <MyTableRow
                    key={row.id}
                >
                    {columns.map((column) => <TableCell>{row[column]}</TableCell>)}
                    <Button
                                color='info'
                                startIcon={<EditIcon />}
                                onClick={() => handleOpen(
                                        <RecurringBuyForm
                                            type='edit'
                                            portfolioId={id}
                                            handleClose={handleClose}
                                            {...row}
                                        >
                                            Edit Recurring Buy
                                        </RecurringBuyForm>
                                )}
                            >
                                Edit
                            </Button>
                </MyTableRow>
            ))}
        </TableBody>
    )
}

export default TableContent
