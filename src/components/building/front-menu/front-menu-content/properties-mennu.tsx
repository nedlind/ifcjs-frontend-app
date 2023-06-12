import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";

export const PropertiesMenu: FC = () => {
    const [state, dispatch] = useAppContext();

    return <div>Properties</div>
}