import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import EditPortfolioForm from './EditPortfolioForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from 'styledComponents/IconButton';

const PortfolioHeader = ({details, handleClose, handleOpen, id}) => {

    return (
        <Wrapper>
            <Row>
                <div>
                <h2>{details.portfolioName}</h2>
                <p>{details.portfolioDescription}</p>
                </div>
                <ButtonGroup>
                <Button 
                    size='small'
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(

                        <EditPortfolioForm 
                            details={details}
                            handleClose={handleClose}
                            id={id}
                        />
    
                    )} 
                >
                    Edit
                </Button>
                    <Button
                        startIcon={<ContentCopyIcon />}
                    >
                        Clone
                    </Button>
                    <Button
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </ButtonGroup>

            </Row>
        </Wrapper>
    )
}

export default PortfolioHeader

const Wrapper = styled.div`
    display: grid;
    gap: 0;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    align-content: start;

    & button {
        justify-self: end;
    }
`

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: end;
    gap: 1rem;
    align-items: center;
    align-content: start;
`