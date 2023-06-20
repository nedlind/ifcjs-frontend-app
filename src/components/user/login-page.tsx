import {FC} from "react";
import "./user-styles.css";
import { useAppContext } from "../../middleware/context-provider";
import { Box, Button } from "@mui/material";

export const LoginPage: FC = () => {
    const dispatch = useAppContext()[1];

    const onLoginClick = () => {
        dispatch({ type: "LOGIN" });
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img src="ifcjs-logo.png" alt="ifcjs logo" className="landing-logo"/>
            <Button variant="outlined" onClick={onLoginClick}>
                Log in
            </Button>
        </Box>
    );
};