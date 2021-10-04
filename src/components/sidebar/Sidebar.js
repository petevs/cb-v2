import React from 'react'
import styled from 'styled-components'

const Sidebar = () => {
    return (
        <Container>
            I am the sidebar
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: red;
    overflow-y: scroll;

    @media (max-width: 1024px){
        display: none;
    }
`