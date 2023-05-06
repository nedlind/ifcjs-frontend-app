import { FC } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import { IconButton, useTheme } from "@mui/material";
import { getDrawer, getDrawerHeader } from "./mui-utils";
import { BuildingSidebar } from "./building-sidebar";

export const SmallDrawer: FC<{
    open: boolean;
    width: number;
    onClose: () => void;
}> = (props) => {
    const theme = useTheme();

    const { open, width: drawerWidth, onClose } = props;

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
            <BuildingSidebar open={open} />
            <Divider />
        </Drawer>
    );
};