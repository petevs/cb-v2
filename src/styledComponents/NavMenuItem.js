import styled from 'styled-components'

const NavMenuItem = styled.div`
  padding: 0.5rem 1rem;
  &:hover {
    background-color: ${props => props.theme.bgHover} !important;
  }
  color: ${props => props.theme.fontColor};
`;

export default NavMenuItem;