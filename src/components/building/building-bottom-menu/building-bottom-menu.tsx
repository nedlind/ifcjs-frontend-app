import { FC } from "react";
import { Card, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import "./building-bottom-menu.css";

export const BuildingBottomMenu: FC = () => {
    return (
        <Card className="bottom-menu">
            <IconButton>
                <CloseIcon/>
            </IconButton>
            <IconButton>
                <CloseIcon/>
            </IconButton>
            <IconButton>
                <CloseIcon/>
            </IconButton>
            <IconButton>
                <CloseIcon/>
            </IconButton>
            <IconButton>
                <CloseIcon/>
            </IconButton>
        </Card>
    )
}