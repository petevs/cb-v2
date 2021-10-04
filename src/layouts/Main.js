import Nav from 'components/nav/Nav'
import React from 'react'
import styled from 'styled-components'

const Main = ({top, side, main}) => {
    return (
        <Container>
            <>{top}</>
            <>{side}</>
            <>{main}</>
        </Container>
    )
}

export default Main

const Container = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 60px 1fr;
    height: 100vh;
`