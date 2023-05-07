import { FC } from "react";
import { TextField } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider"

export const BuildingInfoMenu: FC = () => {
    const [state] = useAppContext();
    console.log(state.building);

    return (
        <div className="full-width">
            <div className="list-item">
                <TextField
                    className="full-width"
                    id="filled-helperText"
                    label="Longitude"
                    defaultValue="Default Value"
                />
            </div>
            <div className="list-item">
                <TextField
                    className="full-width"
                    id="filled-helperText"
                    label="Latitude"
                    defaultValue="Default Value"
                />
            </div>
        </div>
    );
};