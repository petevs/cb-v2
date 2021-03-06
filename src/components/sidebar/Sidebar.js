import ProfileCard from 'components/sidebar/ProfileCard'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext';
import MenuContent from 'components/sidebar/MenuContent';

const Sidebar = () => {

        const { state } = useContext(GlobalContext)

    return (
        <Container>
            <ProfileCard 
                name={state.user.email || 'Guest'}
                isAnonymous={state.user.isAnonymous} 
                img={state.user.photoURL || ''}
            />
            <MenuContent />
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    display: grid;
    align-content: start;
    background-color: ${props => props.theme.body};
    overflow-y: scroll;
    border-right: 1px solid rgba(145,158,171,0.24);

    @media (max-width: 1024px){
        display: none;
    }
`