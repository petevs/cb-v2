import ProfileCard from 'components/ProfileCard'
import React, { useState } from 'react'
import styled from 'styled-components'
import SideBarItem from './SideBarItem'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Button } from '@mui/material';
import FormModal from 'components/FormModal';
import AddPortfolioForm from 'components/AddPortfolioForm';

const Sidebar = () => {

        //Modal
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

    return (
        <Container>
            <ProfileCard />
            <SideBarItem
                path='/portfolio'
                title='Portfolio'
                icon={<BusinessCenterIcon />}
            />
            <Button variant='contained' onClick={handleOpen}>Add New Portfolio</Button>
            <FormModal open={open} onClose={handleClose}>
                <AddPortfolioForm handleClose={handleClose} />
            </FormModal>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: ${props => props.theme.body};
    overflow-y: scroll;
    border-right: 1px solid rgba(145,158,171,0.24);

    @media (max-width: 1024px){
        display: none;
    }
`