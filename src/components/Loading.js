import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Backdrop sx={{ backgroundColor: 'black'}} open>
            <CircularProgress />
        </Backdrop>
        );
}

export default Loading
