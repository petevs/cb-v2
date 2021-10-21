import { FormControl, Input, InputLabel, InputAdornment } from '@mui/material'
import React, { useState, useRef } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from 'styledComponents/IconButton';
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import CancelIcon from '@mui/icons-material/Cancel';

const EditableInput = () => {

    const [value, setValue] = useState(0)
    const [previousValue, setPreviousValue] = useState(0)
    const [disabled, setDisabled] = useState(true)

    const handleChange = (e) => {
        setValue(e.target.value)
    }


    const toggleDisabled = (name, e) => {
        e.preventDefault()
        setPreviousValue(value)
        setDisabled(!disabled)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        setValue(previousValue)
        setDisabled(!disabled)
    }
 

    return (
        <Box readOnly={disabled}>
            <span>1 BTC =</span>
            <MyInput
                value={value}
                onChange={handleChange}
                thousandSeparator={true}
                prefix={'$'}
                disabled={disabled}
            />
            <div>
                <IconButton size='small' onClick={(e) => toggleDisabled('price', e)}>
                    {disabled ? <EditIcon /> : <CheckBoxIcon />}
                </IconButton>
                {
                    !disabled &&
                    <IconButton size='small' onClick={(e) => cancelEdit(e)}>
                        <CancelIcon />
                    </IconButton>
                }
            </div>
        </Box>
    )
}

export default EditableInput

const Wrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 0rem;
`

const Box = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: .25rem;
    align-items: center;
    font-size: 1rem;
    line-height: 1.4375rem;
    font-weight: 400;

    ${({readOnly}) => !readOnly && `
        border-bottom: 1px solid #fff;
    `}

`

const MyInput = styled(NumberFormat)`

    padding: 1rem .5rem;
    font-size: 1rem;
    line-height: 1.4375rem;
    font-weight: 400;
    background-color: transparent;
    // border: 1px solid #fff;
    color: #fff;
    // border-radius: 5px;
    border: none;

    &:focus {
        outline: none;
    }

    ${({disabled}) => disabled && `
        border: none;
        color: #fff;
    `}

`