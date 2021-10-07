import ProfileCard from 'components/ProfileCard'
import React from 'react'
import styled from 'styled-components'

const Sidebar = () => {
    return (
        <Container>
            <ProfileCard />
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: ${props => props.theme.body};
    overflow-y: scroll;
    border-right: 1px solid rgba(145,158,171,0.24);

    @media (max-width: 1024px){
        display: none;
    }
`