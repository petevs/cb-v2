import React from 'react'
import MyTableHead from 'styledComponents/MyTableHead'
import { TableCell, TableRow } from '@mui/material'

const TableHeader = ({columns}) => {
    return (
        <MyTableHead>
        <TableRow>
            {columns.map(column => 
                <TableCell>{column}</TableCell>
            )}
        </TableRow>
    </MyTableHead>
    )
}

export default TableHeader
