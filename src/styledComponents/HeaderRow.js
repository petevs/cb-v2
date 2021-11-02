import styled from 'styled-components'

export const HeaderRow = styled.div`
display: grid;
grid-template-columns: auto auto;
justify-content: space-between;
align-items: end;
padding-bottom: 1rem;
color: ${props => props.theme.fontColor};
& h2 {
    justify-self: start;
}
& button {
    justify-self: end;
}

&.three {
    grid-template-columns: 1fr auto auto;
    gap: .5rem;
}
`