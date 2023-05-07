import { FC } from "react";
import { BuildingInfoMenu } from "./building-info-menu";
import { Card, CardContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

export type FrontMenuMode = "BuildingInfo";

export const BuildingFrontMenu: FC<{ mode: FrontMenuMode }> = ({ mode }) => {
    const content = new Map<FrontMenuMode, any>();
    content.set("BuildingInfo", <BuildingInfoMenu />);

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