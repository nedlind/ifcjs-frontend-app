import React from "react";
import { State } from "../../../state";
import { Action } from "../../../middleware/actions";
import { Tool } from "../../../types";
import ExplodeIcon from "@mui/icons-material/ImportExport"
import LayersIcon from "@mui/icons-material/Layers";
import CutIcon from "@mui/icons-material/ContentCut"
import RulerIcon from "@mui/icons-material/Straighten";

export function getBottomBarTools(
    state: State,
    dispatch: React.Dispatch<Action>
): Tool[] {
    return[
        {
            name: "Clipping Planes",
            icon: <CutIcon/>,
            action: () => {
                console.log("tool");
            },
        },
        {
            name: "Dimensions",
            icon: <RulerIcon/>,
            action: () => {
                console.log("tool");
            },
        },
        {
            name: "Explode",
            icon: <ExplodeIcon/>,
            action: () => {
                console.log("tool");
            },
        },
        {
            name: "Floor Plan navigation",
            icon: <LayersIcon/>,
            action: () => {
                console.log("tool");
            },
        },
    ];
}