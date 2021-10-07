import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SideBarItem = (props) => {
    return (
        <MyLink to={props.path}>
            <Heading>
                {props.icon}
                {props.title}
            </Heading>
        </MyLink>
    )
}

export default SideBarItem

const Heading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: ${props => props.theme.fontColor};
    font-weight: 400;
    padding: 1rem 2rem;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme.bgHover} !important;
    }
`
const MyLink = styled(Link)`
    text-decoration: none;
`