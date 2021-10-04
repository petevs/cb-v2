import { useState } from 'react'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'
import IconButton from 'styledComponents/IconButton'
import { usePopper } from 'react-popper'
import ClickAwayListener from 'react-click-away-listener'
import TopBoxArrow from 'styledComponents/TopBoxArrow'

const MobileMenu = () => {

    const [open, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState()
    const [popperEl, setPopperEl] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const { styles, attributes } = usePopper(anchorEl, popperEl, { placement: "bottom-start" })

    return (
        <Container>

            <StyledIconButton ref={setAnchorEl} onClick={handleOpen}>
                <GiHamburgerMenu />
            </StyledIconButton>

            {
            //If menu set to open show, else hide
            open &&
            <ClickAwayListener onClickAway={handleClose}>
                <Menu 
                    ref={setPopperEl}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <TopBoxArrow />
                    I am the menu
                </Menu>
            </ClickAwayListener>
            }

        </Container>
    )
}

export default MobileMenu

const Container = styled.div`
    align-self: start;
    justify-self: end;
`

const StyledIconButton = styled(IconButton)`

& svg {
    padding: .75rem;
    height: 1.5rem;
    width: 1.5rem;
    color: #fff;
}

& :hover {
    background-color: #21252E;
    border-radius: 50%;
}

@media (min-width: 1024px) {
    display: none;
}
`

const Menu = styled.div`
    height: 100px;
    width: 250px;
    margin-top: .15rem;


    background-color: rgb(33,43,54);
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 20px 40px -4px;
    border: 1px solid rgba(145,158,171,0.08);
    padding: 1rem;
`