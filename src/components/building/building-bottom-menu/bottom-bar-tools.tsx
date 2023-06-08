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
                const tool = findTool("Clipping Planes");
                deactivateAllTools(dispatch, "Clipping Planes");
                tool.active = !tool.active;
                dispatch({ type: "TOGGLE_CLIPPER", payload: tool.active});
            },
        },
        {
            name: "Dimensions",
            icon: <RulerIcon/>,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Dimensions");
                tool.active = !tool.active;
                dispatch({ type: "TOGGLE_DIMENSIONS", payload: tool.active });
            },
        },
        {
            name: "Explode",
            icon: <ExplodeIcon/>,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Explode");
                deactivateAllTools(dispatch, "Explode");
                tool.active = !tool.active;
                dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
                }
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

    const findTool = (name: string) => {
        const tool = tools.find((tool) => tool.name === name);
        if (!tool) throw new Error("Tool not found.");
        return tool;
    };

    const deactivateAllTools = (dispatch: any, name: string) => {
        for (const tool of tools) {
            if (tool.active && tool.name !== name) {
                tool.action(dispatch);
            }
        }
    };

    return tools;
}