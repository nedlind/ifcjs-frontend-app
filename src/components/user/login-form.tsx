import {FC} from "react";
import { useAppContext } from "../../middleware/context-provider";

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
        <button onClick={onlogout}>Logout</button>
        <p>{state.user.displayName}</p> 
        </>
        ) : (
        <button onClick={onlogin}>Login</button>
        )}</h1>)
}