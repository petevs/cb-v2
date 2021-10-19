import React, { Fragment, useState } from 'react'
import SideBarItem from './sidebar/SideBarItem';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PortfolioList from './PortfolioList';
import FormModal from './FormModal';
import AddPortfolioForm from './AddPortfolioForm';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

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
            />
            <PortfolioList handleOpen={handleOpen} />

            <FormModal open={open} onClose={handleClose}>
                <AddPortfolioForm handleClose={handleClose} />
            </FormModal>
        </Fragment>
    )
}

export default MenuContent
