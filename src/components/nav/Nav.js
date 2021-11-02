import { useContext } from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'

import Drawer from './Drawer'
import { GlobalContext } from 'state/contexts/GlobalContext'
// import CurrencySelect from './CurrencySelect'
import { numberWithCommas } from 'utils/formatting'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
// import { auth } from 'firebase'
import AvatarDropDown from './AvatarDropDown'


const Nav= () => {

    const {state } = useContext(GlobalContext)

    // const history = useHistory()

    const { theme, settings, marketData } = state

    const { currency } = settings

    const {
        current_price: price,
        price_change_24h_in_currency: priceChange,
        price_change_percentage_24h_in_currency: percentChange,
        ath,
        high_24h,
        low_24h
    } = marketData.marketData

    const changeClass = () => {
        if(priceChange[currency] < 0) {
            return 'neg'
        }

        return ''
    }

    const currFormat = (x) => {
       const  value = Math.round( x * 100) /100
       return numberWithCommas(value)
    }

    const pctgFormat = (x) => {
        const value = Math.round( x * 100) / 100
        return value
    }

    return (
        <>
        <Container columns='auto 1fr auto'>
            <Logo />
            <Center>
                <PriceBox className={changeClass()}>
                    <h2>{`$${numberWithCommas(price[currency])}`}</h2>
                    <span>{
                        currFormat(priceChange[currency])} ({pctgFormat(percentChange[currency])}%)
                    </span>
                </PriceBox>
                <TickerBox>
                    <h6>24H HIGH ({currency})</h6>
                    <h4>{`$${numberWithCommas(high_24h[currency])}`}</h4>
                </TickerBox>
                <TickerBox>
                    <h6>24H LOW ({currency})</h6>
                    <h4>{`$${numberWithCommas(low_24h[currency])}`}</h4>
                </TickerBox>
                <TickerBox>
                    <h6>ATH ({currency})</h6>
                    <h4>{`$${numberWithCommas(ath[currency])}`}</h4>
                </TickerBox>
            </Center>
            <End>
                {
                !state.user.uid ?
                <>
                    <Button 
                        component={Link} 
                        to='/login' 
                        variant='outlined'
                    >
                        Log In
                    </Button>
                    <Button 
                        component={Link}
                        to='/signup'
                        variant='contained'
                    >
                        Sign Up
                    </Button>
                </>
                :
                <AvatarDropDown />
                }
            </End>
            <MobileMenu />
        </Container>
        {theme.drawer && <Drawer />}
        </>
    )
}

export default Nav

const TickerBox = styled.div`
    display: grid;
    grid-template-columns: auto;
    & h6 {
        text-transform: uppercase;
        font-weight: 400;
    }
`

const PriceBox = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: baseline;

    &.neg {
        & span {
            color: red;
        }
    }
`

const Container = styled.div`
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 300px 1fr auto;
    gap: 1rem;
    align-content: center;
    align-items: center;
    padding: 0 1rem;
    background-color: ${props => props.theme.body};
    border-bottom: 1px solid rgba(145,158,171,0.24);
    @media (max-width: 1024px) {
        grid-template-columns: auto 1fr;
    }
`

const Center = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-self: start;
    gap: 2rem;
    align-content: center;
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
    align-items: center;
    gap: 1rem;
    @media (max-width: 1024px){
        display: none;
    }
`
