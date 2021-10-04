import styled from 'styled-components'

import { GiHamburgerMenu } from 'react-icons/gi'

import Popover from 'components/Popover'
import MobileMenuContent from './MobileMenuContent'

const MobileMenu = () => {


    return (
        <Container>
            <Popover 
                icon={<StyledIcon />}
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
`

const StyledIcon = styled(GiHamburgerMenu)`
    // @media (min-width: 1024px) {
    //     display: none;
    // }
`