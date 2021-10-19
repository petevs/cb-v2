import ProfileCard from 'components/ProfileCard'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import SideBarItem from './SideBarItem'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormModal from 'components/FormModal';
import AddPortfolioForm from 'components/AddPortfolioForm';
import { GlobalContext } from 'state/contexts/GlobalContext';
import PortfolioList from 'components/PortfolioList';

const Sidebar = () => {

        const { state } = useContext(GlobalContext)

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
            <PortfolioList handleOpen={handleOpen} />
            <FormModal open={open} onClose={handleClose}>
                <AddPortfolioForm handleClose={handleClose} />
            </FormModal>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    display: grid;
    align-content: start;
    background-color: ${props => props.theme.body};
    overflow-y: scroll;
    border-right: 1px solid rgba(145,158,171,0.24);

    @media (max-width: 1024px){
        display: none;
    }
`