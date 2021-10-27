import React, { Fragment, useState } from 'react'
import SideBarItem from './sidebar/SideBarItem';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PortfolioList from './PortfolioList';
import FormModal from './FormModal';
import AddPortfolioForm from './AddPortfolioForm';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MenuContent = () => {

    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>

            <SideBarItem
                title='Current Market'
                icon={ <QueryStatsIcon />}
                path= '/current-market'
            />

            <SideBarItem
            path='/portfolio'
            title='Portfolio'
            icon={<BusinessCenterIcon />}
            />f
            <PortfolioList handleOpen={handleOpen} />
            <SideBarItem
            path='/account'
            title='Profile'
            icon={<AccountCircleIcon />}
            />

            <FormModal open={open} onClose={handleClose}>
                <AddPortfolioForm handleClose={handleClose} />
            </FormModal>
        </Fragment>
    )
}

export default MenuContent
