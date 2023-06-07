import { FC } from "react";
import { Card, IconButton } from "@mui/material"
import "./building-bottom-menu.css";
import { useAppContext } from "../../../middleware/context-provider";
import { getBottomBarTools } from "./bottom-bar-tools";

const tools = getBottomBarTools();

export const BuildingBottomMenu: FC = () => {
    const dispatch = useAppContext()[1];

    return (
        <Card className="bottom-menu">
            {tools.map((tool) => (
                <IconButton 
                    key={tool.name}
                    color={tool.active ? "primary" : "default" }
                    onClick={() => tool.action(dispatch)}
                >
                    {tool.icon}
                </IconButton>
            ))}
        </Card>
    )
}