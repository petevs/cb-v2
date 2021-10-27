import { FormControl, Input, InputLabel, InputAdornment } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from 'styledComponents/IconButton';
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddPortfolioForm from './AddPortfolioForm';

const EditableInput = ({
    adornment, 
    prefix, 
    thousandSeparator,
    decimalScale,
    fixedDecimalScale,
    label,
    initialValue
}) => {

    const inputRef = useRef()



    const [value, setValue] = useState(initialValue)
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

    console.log(inputRef)
 

    return (
        <Wrapper>
        <Label>{label}</Label>
        <Box readOnly={disabled} twoCol={!adornment}>
            <span>{adornment}</span>
            <MyInput
                displayType={'input'}
                twoCol={!adornment}
                ref={inputRef}
                value={value}
                onChange={handleChange}
                thousandSeparator={thousandSeparator || false}
                prefix={prefix || ''}
                decimalScale={decimalScale || 0}
                fixedDecimalScale={fixedDecimalScale || false}
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
        </Wrapper>
    )
}

export default EditableInput

const Wrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: .5rem;
`

const Box = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: .25rem;
    align-items: center;
    font-size: 1rem;
    line-height: 1.4375rem;
    font-weight: 400;
    border: 1px solid #fff;
    border-radius: 6px;
    padding: 0 1rem;

    ${({readOnly}) => !readOnly && `
        border-bottom: 1px solid #fff;
    `}

    ${({twoCol}) => twoCol && `
        grid-template-columns: 1fr auto;
        & span {
            display: none;
        }
    `}

`

const MyInput = styled(NumberFormat)`

    padding: .5rem .5rem;
    font-size: 1rem;
    // line-height: 1.4375rem;
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

    ${({twoCol}) => twoCol && `
        padding: 0;
    `}
`

const Label = styled.div`
    // grid-column: 1 / span 3;
    font-size: .75rem;
`