import { useContext } from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'
import Popover from 'components/Popover'
import Flag from './Flag'

import { AppContext } from 'state/contexts/AppContext'

import Drawer from './Drawer'

const Nav= () => {

    const { appState } = useContext(AppContext)


    return (
        <>
        <Container columns='auto 1fr auto'>
            <Logo />
            <Center>
                <h2>$50,000</h2>
                <span>501 (1.023%)</span>
            </Center>
            <End>
                <Popover icon={<Flag />} placed='bottom-start' />
            </End>
            <MobileMenu />
        </Container>
        {appState.drawer && <Drawer />}
        </>
    )
}

export default Nav

const Container = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 300px 1fr auto;
    gap: 1rem;
    align-content: center;
    align-items: center;
    padding: 0 1rem;
    background-color: ${props => props.theme.backgroundColor};
    @media (max-width: 1024px) {
        grid-template-columns: auto 1fr;
    }
`

const Center = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    justify-self: start;
    color: ${props => props.theme.fontColor};
    & span {
        & svg {
          margin-right: 0.25rem;
        }
        font-size: 0.75rem;
        font-weight: 500;
        padding-left: 0.5rem;
        color: ${props => props.theme.colors.green};
        &.neg {
          color: ${props => props.theme.colors.red};
        }
      }

    @media (max-width: 1024px){
        display: none;
    }
`

const End = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    @media (max-width: 1024px){
        display: none;
    }
`
