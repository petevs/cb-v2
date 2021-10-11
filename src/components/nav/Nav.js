import { useContext } from 'react'
import styled from 'styled-components'
import Logo from 'components/nav/Logo'
import MobileMenu from './MobileMenu'

import Drawer from './Drawer'
import { GlobalContext } from 'state/contexts/GlobalContext'
import CurrencySelect from './CurrencySelect'
import { numberWithCommas } from 'utils/formatting'

const Nav= () => {

    const {state} = useContext(GlobalContext)

    const { theme, settings, marketData } = state

    const {
        current_price: price,
        price_change_24h_in_currency: priceChange,
        price_change_percentage_24h_in_currency: percentChange
    } = marketData.marketData

    const { currency } = settings


    return (
        <>
        <Container columns='auto 1fr auto'>
            <Logo />
            <Center>
                <h2>${numberWithCommas(price[currency])}</h2>
                <span>{priceChange[currency]} ({percentChange[currency]}%)</span>
            </Center>
            <End>
                <CurrencySelect />
                {/* <Popover icon={<Flag />} placed='bottom-start' menuContent={<CurrencySelect />}/> */}
            </End>
            <MobileMenu />
        </Container>
        {theme.drawer && <Drawer />}
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
    background-color: ${props => props.theme.body};
    border-bottom: 1px solid rgba(145,158,171,0.24);
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
    grid-template-columns: 40px;
    gap: 1rem;
    @media (max-width: 1024px){
        display: none;
    }
`
