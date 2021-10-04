import styled from 'styled-components'

import Popover from 'components/Popover'
import MobileMenuContent from './MobileMenuContent'
import MobileMenuIcon from './MobileMenuIcon'

const MobileMenu = () => {


    return (
        <Container>
            <Popover 
                icon={<MobileMenuIcon />}
                menuContent={<MobileMenuContent />}
                placed='bottom-start'
            />
        </Container>
    )
}

export default MobileMenu

const Container = styled.div`
    align-self: start;
    justify-self: end;

    @media (min-width: 1024px){
        display: none;
    }
`