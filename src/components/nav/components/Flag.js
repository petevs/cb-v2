import React from 'react'
import styled from 'styled-components'

const Flag = () => {
    return (
            <Image
            src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
            alt="us flag"
        />
    )
}

export default Flag

const Image = styled.img`
height: 1.25rem;
object-fit: cover;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;