import styled from 'styled-components'

const TopBoxArrow = styled.span`
    top: -7px;
    z-index: 1;
    width: 12px;
    right: 20px;
    height: 12px;
    content: "";
    position: absolute;
    border-radius: 0px 0px 4px;
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    transform: rotate(-135deg);
    background: rgb(33,43,54);
    border-right: 1px solid rgba(145,158,171,0.12);
    border-bottom: 1px solid rgba(145,158,171,0.12);
`

export default TopBoxArrow