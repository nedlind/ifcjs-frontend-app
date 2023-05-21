import { FC, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./map-viewer.css"

export const MapViewer: FC = () => {

    const [state, dispatch] = useAppContext();
    const containerRef = useRef(null);
    const thumbnailRef = useRef(null);
    const [isCreating, setIsCreating] = useState(false);
    const { user, building } = state;

    const onToggleCreate = () => {
        setIsCreating(!isCreating);
    }

    const onCreate = () => {
        if (isCreating) {
            dispatch({type: "CREATE_BUILDING", payload: user});
            setIsCreating(false);
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (container && user) {
            const thumbnail = thumbnailRef.current;
            dispatch({ type: "START_MAP", payload: {container, user, thumbnail} });
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />
    };

    if (building) {
        const url = `/building/?id=${building.uid}`;
        return <Navigate to={url} />
    }

    const onlogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <>
            <div
                className="full-screen"
                onContextMenu={ onCreate }
                ref={ containerRef }    
            />
            {isCreating && (
                <div className="overlay">
                    <p>Right-click to create a new building or </p>
                    <Button onClick={onToggleCreate}>cancel</Button>
                </div>
            )};
            <div className="top-navbar">
                <Button onClick={onlogout}>Log out</Button>
                <Button onClick={onToggleCreate}>Create Building</Button>
            </div>
        </>
    )
}