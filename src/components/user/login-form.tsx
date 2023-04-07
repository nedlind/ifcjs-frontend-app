import {FC} from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";

export const LoginForm: FC = () => {

    const [state, dispatch] = useAppContext();

    const onlogin = () => {
        dispatch( {type: "LOGIN" })
    }

    const onlogout = () => {
        dispatch( {type: "LOGOUT"} )
    }

    return (<h1>{state.user ? (
        <>
        <Button onClick={onlogout}>Logout</Button>
        <p>{state.user.displayName}</p> 
        </>
        ) : (
        <Button onClick={onlogin}>Login</Button>
        )}</h1>)
}