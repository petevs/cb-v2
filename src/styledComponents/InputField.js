import styled from 'styled-components'
import { TextField } from '@mui/material'


const InputField = styled(TextField).attrs({
  autoComplete: "off"
})`
  & .MuiFormLabel-root {
    color: #fff !important;

    &.Mui-error {
      color: #D32F3A !important;
    }
  }

  & .MuiInputBase-root {
    color: #fff !important;

    &.Mui-disabled {
      -webkit-text-fill-color: #fff !important;
    }
    
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }

  & ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  & p {
      color: #fff;
  }

  &.Mui-OutlinedInput.Mui-disabled {
    -webkit-text-fill-color: #fff;
    color: #fff;
  }
  
  &.MuiInput:before {
    border-bottom: none;
  }

`;

export default InputField