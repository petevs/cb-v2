import React from 'react'
import styled from 'styled-components'
import IconButton from 'styledComponents/IconButton'
import { GiHamburgerMenu } from 'react-icons/gi'

const MobileMenuIcon = ({onClick}) => {
    return (
        <IconButton onClick={onClick}>
            <StyledIcon/>
        </IconButton>
    )
}

export default MobileMenuIcon


const StyledIcon = styled(GiHamburgerMenu)`
    @media (min-width: 1024px) {
        display: none;
    }
`