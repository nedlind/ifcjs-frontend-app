import { FC } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import { IconButton, useTheme } from "@mui/material";
import { getDrawer, getDrawerHeader } from "./mui-utils";
import { BuildingSidebar } from "./sidebar/building-sidebar";
import { FrontMenuMode } from "./front-menu/types";

export const BuildingDrawer: FC<{
    open: boolean;
    width: number;
    onToggleMenu: (active?: boolean, mode?: FrontMenuMode) => void;
    onClose: () => void;
}> = (props) => {
    const theme = useTheme();

    const { open, width: drawerWidth, onClose, onToggleMenu } = props;

    const Drawer = getDrawer(drawerWidth);
    const DrawerHeader = getDrawerHeader();

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={onClose}>
                    {theme.direction == "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <BuildingSidebar onToggleMenu={onToggleMenu} open={open} />
            <Divider />
        </Drawer>
    );
};