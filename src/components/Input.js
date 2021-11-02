import React from 'react'
import styled from 'styled-components'

const Input = ({label, prefix, inputType, min, max}) => {
    return (
        <div>
            <Label>{label}</Label>
                <InputBox>
                    <span>{prefix}</span>
                    <input type={inputType} min={min} max={max}></input>
                </InputBox>
        </div>
    )
}

export default Input

const Label = styled.label`
    font-size: .875rem;
`

const InputBox = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    margin-top: .25rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(145,158,171,0.24);
    border-radius: .25rem;

    &:hover {
        border-color: #fff;
    }

    &:focus {
        border-color: #fff;
    }

    & span {
        color: #fff;
        line-height: 1.25rem;
        font-size: .875rem;
        padding: 0 .75rem;
        background-color: ${props => props.theme.backgroundColor};
        border-radius: .25rem 0 0 .25rem;
        border: none;
        padding: .5rem 0 .5rem .5rem;
    }

    & input {
        line-height: 1.25rem;
        font-size: .875rem;
        outline: none;
        border-radius: 0 .25rem .25rem 0;
        border: none;
        color: #fff;
        padding: .5rem;
        background-color: ${props => props.theme.backgroundColor};
    }

    & ::-webkit-calendar-picker-indicator {
        filter: invert(1);
        -webkit-apperance: none;
        -webkit-border-radius: 0;
      }
`