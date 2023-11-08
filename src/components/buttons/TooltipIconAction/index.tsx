import { FC } from "react";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import IconButton from "../IconAction";

interface TolltipIconActionProps {
  children: any;
  position:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
}

const TolltipIconAction: FC<TolltipIconActionProps> = ({
  children,
  position,
}) => {
  return (
    <Tooltip title="Delete" arrow placement={position}>
      <IconButton>{children}</IconButton>
    </Tooltip>
  );
};

export default TolltipIconAction;
