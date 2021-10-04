import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: ${props => props.columns};
    padding: 1rem;
`

export default Container