import { FC } from "react";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import "./building-front-menu.css"
import { FrontMenuMode } from "./types";
import { ModelListMenu } from "./front-menu-content/model-list-menu";
import { PropertiesMenu } from "./front-menu-content/properties-menu";
import { FloorplanMenu } from "./front-menu-content/floorplane-menu";


export const BuildingFrontMenu: FC<{ 
    mode: FrontMenuMode;
    open: boolean;
    onToggleMenu: (active: boolean) => void
}> = ({ mode, open, onToggleMenu }) => {
    if (!open) {
        return <></>;
    }
    const content = new Map<FrontMenuMode, any>();
    content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} /> );
    content.set("ModelList", <ModelListMenu /> );
    content.set("Properties", <PropertiesMenu/>);
    content.set("Floorplans", <FloorplanMenu/>);

    const titles = {
        BuildingInfo: "Building Information",
        ModelList: "Model List",
        Properties: "Properties",
        Floorplans: "Floorplans",
    };

    const title = titles[mode];

    return (
        <Card className="front-menu">
            <CardContent>
                <div className="front-menu-header">
                    <h2>{title}</h2>
                    <IconButton onClick={() => onToggleMenu(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="front-menu-content">{content.get(mode)}</div>
            </CardContent>
        </Card>
    );
};