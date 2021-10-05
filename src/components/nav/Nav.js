import React from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'
import Popover from 'components/Popover'
import Flag from './Flag'

const Nav= () => {
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
        {/* <>
        <BackDrop>
            <DrawerBox>
                Hi I am the Drawer
            </DrawerBox>
        </BackDrop>
        </> */}
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
    background-color: #161c24;
    @media (max-width: 1024px) {
        grid-template-columns: auto 1fr;
    }
`

const Center = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    justify-self: start;
    color: #fff;
    & span {
        & svg {
          margin-right: 0.25rem;
        }
        font-size: 0.75rem;
        font-weight: 500;
        padding-left: 0.5rem;
        color: #408e36;
        &.neg {
          color: #f72e2f;
        }
      }

    @media (max-width: 1024px){
        display: none;
    }
`

const End = styled.div`
    display: grid;
    @media (max-width: 1024px){
        display: none;
    }
`

const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
    z-index: 99;
`

const DrawerBox =styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    z-index: 999;
    background-color: white;
    height: 100vh;
`