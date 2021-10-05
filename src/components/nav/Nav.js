import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'
import Popover from 'components/Popover'
import Flag from './Flag'
import ClickAwayListener from 'react-click-away-listener'
import {motion} from 'framer-motion'

const Nav= () => {

    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const variants = {
        hidden: {
            x: "300px",
        },
        visible: {
            x: 0,
            transition: {
                duration: 0.225,
                damping: 25,
                // stifness: 500,
            }
        },
        exit: {
            x: "-100vw",
            opacity: 0
        }
      }
      

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
                <button onClick={handleClick}>show menu</button>
            </End>
            <MobileMenu />
        </Container>
        { open &&
        <BackDrop>
        <ClickAwayListener onClickAway={handleClose}>
            <DrawerBox
                as={motion.div} 
                variants={variants}
                initial='hidden'
                animate='visible'
                exit='exit'
                disableEnforceFocus
            >
                Hi I am the Drawer
            </DrawerBox>
        </ClickAwayListener>
        </BackDrop>
        }
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
    grid-template-columns: auto auto;
    gap: 1rem;
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
    width: 280px;
    z-index: 999;
    background-color: rgb(33, 43, 54);
    height: 100vh;
    box-shadow: rgb(22 28 36 / 48%) 8px 24px 24px 12px;
    overflow-y: auto;
`