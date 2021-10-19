import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import EditPortfolioForm from './EditPortfolioForm';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeletePortfolio from './DeletePortfolio';

const PortfolioHeader = ({details, handleClose, handleOpen, id, state}) => {

    return (
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
                    <DeletePortfolio state={state} id={id} />
                </ButtonGroup>

            </Row>
    )
}

export default PortfolioHeader

const Row = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    align-content: start;


    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
        text-align: center;
    }
`

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: end;
    gap: 1rem;
    align-items: center;
    align-content: start;

    @media (max-width: 768px) {
        justify-content: center;
    }
`