import styled from 'styled-components'

const IconButton = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    & svg {
        padding: .75rem;
        height: 1.5rem;
        width: 1.5rem;
        color: #fff;
    }
    
    & :hover {
        background-color: ${props => props.theme.iconHover};
        border-radius: 50%;
    }
`

export default IconButton