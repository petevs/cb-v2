import React from 'react'
import styled from 'styled-components'
import {RiUser3Fill} from 'react-icons/ri'


const MobileMenuContent = () => {
    return (
        <>
            <MenuItem><RiUser3Fill /> Profile</MenuItem>
        </>
    )
}

export default MobileMenuContent

const MenuItem = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    padding: .5rem 1rem;
    color: #fff;

    & svg {
        padding-right: 1rem;
    }
    
    &:hover {
        background-color: #2A343F;
    }
`