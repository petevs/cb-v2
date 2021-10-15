import styled from 'styled-components'

const ScoreCards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
    justify-items: start;
    gap: 1rem;
    
    @media (max-width: 1024px) {
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
`

export default ScoreCards