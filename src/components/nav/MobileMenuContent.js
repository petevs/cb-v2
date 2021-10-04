import React from 'react'
import styled from 'styled-components'


const MobileMenuContent = () => {
    return (
        <div>
            <MenuItem>Profile</MenuItem>
        </div>
    )
}

export default MobileMenuContent

const MenuItem = styled.div`
    & :hover {
        background-color: #2A343F;
    }
`