import { FormControl, Input, InputLabel, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from 'styledComponents/IconButton';
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import CancelIcon from '@mui/icons-material/Cancel';

const BuyForm = () => {

    const [bitcoin, setBitcoin] = useState(0)
    const [price, setPrice] = useState(0)
    const [disabled, setDisabled] = useState({
        bitcoin: true,
        dollars: false,
        price: true,
    })

    const toggleDisabled = (name, e) => {
        e.preventDefault()
        setDisabled({
            ...disabled,
            [name]: !disabled[name]
        })
    }


    return (
        <Box>
            <span>1 BTC =</span>
            <MyInput
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                thousandSeparator={true}
                prefix={'$'}
                disabled={disabled.price}
            />
            <div>
                <IconButton size='small' onClick={(e) => toggleDisabled('price', e)}>
                    {disabled.price ? <EditIcon /> : <CheckBoxIcon />}
                </IconButton>
                {
                    !disabled.price &&
                    <IconButton size='small' onClick={(e) => toggleDisabled('price', e)}>
                        <CancelIcon />
                    </IconButton>
                }
            </div>
        </Box>
    )
}

export default BuyForm

const Box = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: .25rem;
    align-items: center;
    font-size: 1rem;
    line-height: 1.4375rem;
    font-weight: 400;

`

const MyInput = styled(NumberFormat)`

    padding: 1rem .5rem;
    font-size: 1rem;
    line-height: 1.4375rem;
    font-weight: 400;
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

    ${({disabled}) => disabled && `
        border: none;
        color: #fff;
    `}

`