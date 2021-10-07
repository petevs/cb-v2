import React, { useContext, useState, useEffect } from 'react'
import { setCurrency } from 'state/actions/settingsActions'
import { GlobalContext } from 'state/contexts/GlobalContext'
import NavMenuItem from 'styledComponents/NavMenuItem'
import styled from 'styled-components'
import NavDropDown from 'styledComponents/NavDropDown'
import MenuItem from '@mui/material/MenuItem';
const CurrencySelect = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { settings } = state
  
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSettingsChange = (event) => {
      const { myValue } = event.currentTarget.dataset;
      dispatch(setCurrency(myValue));
      handleClose();
    };
  
    const [menuImage, setMenuImage] = useState("");
  
    useEffect(() => {
      if (settings.currency === "cad") {
        setMenuImage("https://cdn.countryflags.com/thumbs/canada/flag-800.png");
      } else {
        setMenuImage(
          "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
        );
      }
    }, [settings.currency]);
  
    return (
      <>
        <Image onClick={handleClick} src={menuImage} />
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
          <NavMenuItem
            data-name="currency"
            data-my-value="cad"
            onClick={(event) => handleSettingsChange(event)}
          >
            <Heading>
              <img
                src="https://cdn.countryflags.com/thumbs/canada/flag-800.png"
                alt="canada flag"
              />
              CAD
            </Heading>
          </NavMenuItem>
          <MyMenuItem
            data-name="currency"
            data-my-value="usd"
            onClick={(event) => handleSettingsChange(event)}
          >
            <Heading>
              <img
                src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
                alt="us flag"
              />
              USD
            </Heading>
          </MyMenuItem>
        </NavDropDown>
      </>
    );
  };
  
  export default CurrencySelect;
  
  const Image = styled.img`
    border-radius: 0;
    width: 100%;
    height: auto;
    cursor: pointer;
    &:hover {
      transition: all 0.2s ease-in-out;
      transform: scale(1.1);
    }
  `;
  
  const MyMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
      padding: 0.5rem 1rem;
      &:hover {
        background-color: ${props => props.theme.bgHover} !important;
      }
    }
  `;
  
  const Heading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    min-width: 150px;
    gap: 1.5rem;
    font-size: 0.875rem;
    color: rgb(255, 255, 255);
    font-weight: 400;
    cursor: pointer;
  
    & img {
      width: 30px;
    }
  `;
  
  