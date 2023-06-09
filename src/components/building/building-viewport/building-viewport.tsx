import {FC, useRef, useEffect } from "react"
import { useAppContext } from "../../../middleware/context-provider"

export const BuildingViewport: FC = () => {
    const [state, dispatch] = useAppContext();
    const containerRef = useRef(null);
    const { user, building } = state;

    useEffect(() => {
        const container = containerRef.current;
        if (container && user) {
            dispatch({ type: "START_MODEL", payload: {container, building} });
        }
    }, []);

    return (
        <>
            <div className="full-screen" ref={containerRef} />
        </>
    );
};