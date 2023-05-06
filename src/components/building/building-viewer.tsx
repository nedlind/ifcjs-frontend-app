import { FC, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { getDrawerHeader } from "./mui-utils";
import { Box, CssBaseline } from "@mui/material";
import { BuildingTopBar } from "./building-topbar";
import { BuildingDrawer } from "./building-drawer";

export const BuildingViewer: FC = () => {
    const [open, setOpen] = useState(false);
    const [width] = useState(240);

    const [{ building, user }] = useAppContext();
    if (!building) {
        return <Navigate to="/map" />
    }

    if (!user) {
        return <Navigate to="/login"/>
    }

    const toggleDrawer = (active: boolean) => {
        setOpen(active);
    }

    const DrawerHeader = getDrawerHeader();

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <BuildingTopBar 
                width={width} 
                open={open} 
                onOpen={() => toggleDrawer(true)} />
            <BuildingDrawer 
                width={width} 
                open={open} 
                onClose={() => toggleDrawer(false)} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <h1>Hello building viewer!</h1>
            </Box>
        </Box>
    )
}