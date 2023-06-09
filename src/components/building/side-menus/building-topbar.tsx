import { FC } from "react";
import { getAppBar } from "./mui-utils";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"

export const BuildingTopBar: FC<{
    open: boolean;
    onOpen: () => void;
    width: number;
}> = (props) => {
    const { open, onOpen, width } = props;

    const AppBar = getAppBar(width);

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: "none" }),
                    }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Building viewer
                </Typography>
            </Toolbar>
        </AppBar>
    );
};