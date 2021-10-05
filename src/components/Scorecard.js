import styled from 'styled-components'

const Scorecard = ({title, value, prefix, suffix}) => {
    return (
        <Card>
            <Title>{title}</Title>
            <Row>
                <Value>{prefix}{value}{suffix}</Value>
            </Row>
            
        </Card>
    )
}

export default Scorecard

const Card = styled.div`
    display: grid;
    justify-self: start;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.fontColor};
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 2px 0 rgba(63, 63, 68, 0.15);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    gap: .5rem;

    @media (max-width: 1024px) {
      justify-self: stretch;
      text-align: left;
  }
`

const Title = styled.h3`
  font-size: 0.75rem;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: baseline;
  gap: 0.25rem;
`;

const Value = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
`;
