import { FC } from "react";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { Card, CardContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

export type FrontMenuMode = "BuildingInfo";

export const BuildingFrontMenu: FC<{ 
    mode: FrontMenuMode;
    open: boolean;
    onToggleMenu: (active: boolean) => void
}> = ({ mode, open, onToggleMenu }) => {
    if (!open) {
        return <></>
    }
    const content = new Map<FrontMenuMode, any>();
    const buildingInfoMenu = <BuildingInfoMenu onToggleMenu={onToggleMenu} />
    content.set("BuildingInfo", buildingInfoMenu );

    return (
        <Card className="front-menu">
            <CardContent>
                <div className="front-menu-header">
                    <h2>Title</h2>
                    <Button>
                        <CloseIcon />
                    </Button>
                </div>
                <div className="front-menu-content">{content.get(mode)}</div>
            </CardContent>
        </Card>
    );
};