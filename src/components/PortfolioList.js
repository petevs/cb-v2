import React, { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { updateDrawer } from 'state/actions/themeActions';


const PortfolioList = ({handleOpen}) => {

    const { state, dispatch } = useContext(GlobalContext)
    const {portfolioList } = state.portfolio
    const { currentPage } = state.settings

    const handleClose = () => {
        dispatch(updateDrawer(false))
    }

    return (
        <Portfolios>
        {
        portfolioList &&
        portfolioList.map(item => 
            <li className={item.id === currentPage && 'active'}> 
                <Link
                to={`/portfolio/${item.id}`}
                key={item.id}
                className={item.id === currentPage && 'active'}
                onClick={handleClose}
            >
                {item.portfolioName}
            </Link>
            </li>
        )
        }
        <Button variant='contained' size='small' onClick={handleOpen}>Add New Portfolio</Button>
        </Portfolios>
    )
}

export default PortfolioList



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