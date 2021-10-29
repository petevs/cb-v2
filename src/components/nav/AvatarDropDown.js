import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import IconButton from 'styledComponents/IconButton'
import NavDropDown from 'styledComponents/NavDropDown'
import NavMenuItem from 'styledComponents/NavMenuItem'
import { Button } from '@mui/material'
import { Heading } from 'styledComponents/Heading'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import styled from 'styled-components'
import { auth } from 'firebase'
import { useHistory } from 'react-router-dom'

const AvatarDropDown = () => {

    const history = useHistory()
    
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSignOut = async () => {
        await auth.signOut()
        handleClose()
        history.push('/')

    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar />
            </IconButton>
            <NavDropDown
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
                }}
                transformOrigin={{
                vertical: "top",
                horizontal: "right",
                }}
            >
                <NavMenuItem>
                    <Heading>
                        <HomeIcon />
                        Home
                    </Heading>
                </NavMenuItem>
                <NavMenuItem>
                    <Heading>
                        <PersonIcon />
                        Profile
                    </Heading>
                </NavMenuItem>
                <NavMenuItem>
                    <Heading>
                        <SettingsIcon />
                        Settings
                    </Heading>
                </NavMenuItem>
                <Box upper>
                    <Button variant='outlined' fullWidth onClick={handleSignOut}>Logout</Button>
                </Box>
            </NavDropDown>
        </>
    )
}

export default AvatarDropDown



const Box = styled.div`
    padding: 1rem 1rem .5rem;
    margin-top: 1rem;

    ${({upper}) => upper && `
        border-top: 1px solid rgba(145,158,171,0.24);
    `}

    ${({lower}) => lower && `
        border-bottom: 1px solid rgba(145,158,171,0.24);
    `}
`