import { Switch } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const SwitchBox = (props) => {

    const {
        className,
        label,
        icon,
        value,
        checked,
        onChange,
        secondLabel,
        hide
    } = props


    return (
        <Box className={className}>
            <Col1>
                <Label>{hide ? label : secondLabel}</Label>
                <Value>{icon}{value}</Value>
            </Col1>
            <Col2>
                {hide && <Switch checked={checked} onChange={onChange}/> }
            </Col2>
        </Box>
    )
}

export default SwitchBox

const Box = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    color: rgba(0, 0, 0, 0.38);

    &.checked {
        color: #fff;
    }

`

const Col1 = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 0.25rem;
`

const Col2 = styled.div``

const Label = styled.div`
    font-size: .75rem;
    text-transform: capitalize;
`

const Value = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375rem;
`