import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const PortfolioGrid = ({rows}) => {

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'date',
          headerName: 'Date',
          editable: true,
          type: 'date'
        },
        {
          field: 'type',
          headerName: 'Type',
          editable: true,
        },
        {
          field: 'amount',
          headerName: 'Amount',
          editable: true,
          type: 'number'
        },
        {
          field: 'price',
          headerName: 'Price',
          editable: true,
          type: 'number'
        },
        {
          field: 'bitcoin',
          headerName: 'Bitcoin',
          editable: true,
          type: 'number'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (<Button onClick={() => console.log(params.row)}>Edit</Button>)
        }
      ];
      
    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, actions: 'hithe' },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, actions: 'hithe' },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, actions: 'hithe' },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, actions: 'hithe' },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, actions: 'hithe' },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150, actions: 'hithe' },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, actions: 'hithe' },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, actions: 'hithe' },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age:  32, actions: 'Edit'},
    //   ];


    const [selectionModel, setSelectionModel] = useState([])

    useEffect(() => {
        console.log(selectionModel)
    },[selectionModel])

    return (
    <div style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5]}
        checkboxSelection
        pagination
        disableSelectionOnClick
        onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection)
        }}
        selectionModel={selectionModel}
      />
    </div>
    )
}

export default PortfolioGrid
