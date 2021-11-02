import styled from 'styled-components'

export const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 3rem 1.5rem;
    background-color: #212b36;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;
    border-radius: 1rem;
    overflow-x: scroll;
    & h3 {
    padding: 1rem;
    }
`;