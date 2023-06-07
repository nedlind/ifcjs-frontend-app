import { Tool } from "../../../types";
import ExplodeIcon from "@mui/icons-material/ImportExport"
import LayersIcon from "@mui/icons-material/Layers";
import CutIcon from "@mui/icons-material/ContentCut"
import RulerIcon from "@mui/icons-material/Straighten";

export function getBottomBarTools(): Tool[] {
    const tools = [
        {
            name: "Clipping Planes",
            icon: <CutIcon/>,
            active: false,
            action: (dispatch: any) => {
                console.log("tool");
            },
        },
        {
            name: "Dimensions",
            icon: <RulerIcon/>,
            active: false,
            action: (dispatch: any) => {
                console.log("tool");
            },
        },
        {
            name: "Explode",
            icon: <ExplodeIcon/>,
            active: false,
            action: (dispatch: any) => {
                const tool = tools.find((tool) => tool.name === "Explode");
                if (tool) {
                    tool.active = !tool.active;
                    dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
                }
            },
        },
        {
            name: "Floor Plan navigation",
            icon: <LayersIcon/>,
            active: false,
            action: (dispatch: any) => {
                console.log("tool");
            },
        },
    ];
    return tools;
}