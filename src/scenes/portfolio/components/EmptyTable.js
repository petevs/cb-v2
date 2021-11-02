import styled from 'styled-components'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const EmptyTable = ({empty, text, buttonContent, handleOpen}) => {

    if(!empty){
        return(<></>)
    }

    return (
        <Table>
            <Button 
                variant='text'
                size='small'
                startIcon={<AddIcon />} 
                onClick={() => handleOpen(buttonContent)}>
                    {text}
                </Button>
        </Table>
    )
}

export default EmptyTable


const Table = styled.div`
    display: grid;
    justify-content: center;
    text-align: center;
    padding: 1rem 0 0 0;
`