import { FC } from "react";
import { Card, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import "./building-bottom-menu.css";
import { useAppContext } from "../../../middleware/context-provider";
import { getBottomBarTools } from "./bottom-bar-tools";

export const BuildingBottomMenu: FC = () => {
    const [state, dispatch] = useAppContext();
    const tools = getBottomBarTools(state, dispatch);

    return (
        <Card className="bottom-menu">
            {tools.map((tool) => (
                <IconButton>{tool.icon}</IconButton>
            ))}
        </Card>
    )
}