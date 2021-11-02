import SideBarItem from './SideBarItem';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PortfolioList from '../../scenes/portfolio/components/PortfolioList';
import FormModal from '../FormModal';
import AddPortfolioForm from '../AddPortfolioForm';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CalculateIcon from '@mui/icons-material/Calculate';
import styled from 'styled-components'
import useModal from 'hooks/useModal';

const MenuContent = () => {

    const [open, modalContent, handleOpen, handleClose] = useModal()


    return (
        <Wrapper>

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

            <SideBarItem
                path='calculators'
                title='Calculators'
                icon={<CalculateIcon />}
            />

            <FormModal open={open} onClose={handleClose}>
                <AddPortfolioForm handleClose={handleClose} />
            </FormModal>
        </Wrapper>
    )
}

export default MenuContent

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: .5rem;

`