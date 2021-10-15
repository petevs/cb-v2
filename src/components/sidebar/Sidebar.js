import ProfileCard from 'components/ProfileCard'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import SideBarItem from './SideBarItem'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Button } from '@mui/material';
import FormModal from 'components/FormModal';
import AddPortfolioForm from 'components/AddPortfolioForm';
import { GlobalContext } from 'state/contexts/GlobalContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {

        const { state } = useContext(GlobalContext)
        const {portfolioList } = state.portfolio

        const { currentPage } = state.settings
        
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
            <Portfolios>
            {
            portfolioList &&
            portfolioList.map(item => 
                <li className={item.id === currentPage && 'active'}> 
                    <Link
                    to={`/portfolio/${item.id}`}
                    key={item.id}
                    className={item.id === currentPage && 'active'}
                >
                    {item.portfolioName}
                </Link>
                </li>
            )
            }
            <Button variant='contained' size='small' onClick={handleOpen}>Add New Portfolio</Button>
            </Portfolios>
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

const Portfolios = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 2.5rem;
    color: rgb(99,115,129);
    font-size: 0.875rem;

    &.active {
        color: rgb(255, 48, 48);
    }

    & button {
        justify-self: stretch;
    }

    & li {
        &.active {
            color: rgb(255, 48, 48);
        }
    }

    
    & li:hover {
        color: #fff;

    }

    & a {
        text-decoration: none;
        color: rgb(99,115,129);

        &.active {
            color: rgb(255, 48, 48);
        }

        &:hover {
            color: #fff;
        }

    }
`