import ProfileCard from 'components/ProfileCard'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext';
import MenuContent from 'components/MenuContent';

const Sidebar = () => {

        const { state } = useContext(GlobalContext)

        //Modal
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);


    return (
        <Container>
            <ProfileCard 
                name={state.user.displayName || 'Guest'}
                signedIn={state.user.isAnonymous} />
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