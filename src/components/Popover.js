import { useState } from 'react'
import { usePopper } from 'react-popper'
import ClickAwayListener from 'react-click-away-listener'

//Styled Components
import PopoverBox from 'styledComponents/PopoverBox'

const Popover = ({menuContent, icon, placed}) => {

    const [open, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState()
    const [popperEl, setPopperEl] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }



    const { styles, attributes } = usePopper(anchorEl, popperEl, { placement: placed })


    return (
        <>
            <div ref={setAnchorEl} onClick={handleOpen}>
                {icon}
            </div>

            {
            //If menu set to open show, else hide
            open &&
            <ClickAwayListener onClickAway={handleClose}>
                <PopoverBox 
                    ref={setPopperEl}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {menuContent}
                </PopoverBox>
            </ClickAwayListener>
            }
        </>
    )
}

export default Popover
