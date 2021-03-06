import styled from 'styled-components'

const PopoverBox = styled.div`

    margin-top: .5rem;
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 20px 40px -4px;
    border: 1px solid rgba(145,158,171,0.08);
    padding: 1rem 0;
`

export default PopoverBox