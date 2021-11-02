import { Button, TableBody, TableCell } from '@mui/material'
import React from 'react'
import MyTableRow from 'styledComponents/MyTableRow'
import RecurringBuyForm from './RecurringBuyForm'
import EditIcon from '@mui/icons-material/Edit';
import useModal from 'hooks/useModal';

const TableContent = ({data, columns, id, buttonContent}) => {


    const [open, modalContent, handleOpen, handleClose] = useModal()

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
                                onClick={() => handleOpen(<p>hello</p>)}
                            >
                                Edit
                            </Button>
                </MyTableRow>
            ))}
        </TableBody>
    )
}

export default TableContent
