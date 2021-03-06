import React, { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from 'state/contexts/GlobalContext'
import ClickAwayListener from 'react-click-away-listener'
import { updateDrawer } from 'state/actions/themeActions'
import { motion } from 'framer-motion'
import MenuContent from 'components/sidebar/MenuContent'
import ProfileCard from 'components/sidebar/ProfileCard'

const Drawer = () => {

    const { state, dispatch} = useContext(GlobalContext)

    const handleClose = () => {
        dispatch(updateDrawer(false))
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
        { state.theme.drawer &&
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
                    <ProfileCard />
                    <MenuContent />
                </DrawerBox>
            </ClickAwayListener>
            </BackDrop>
            }
            </>
    )
}

export default Drawer

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
    background-color: ${props => props.theme.backgroundColor};
    height: 100vh;
    box-shadow: rgb(22 28 36 / 48%) 8px 24px 24px 12px;
    overflow-y: scroll;
`