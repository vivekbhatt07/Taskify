import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "../IconAction";

interface TolltipIconActionProps {
  children: any;
  position?:
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
  title: String;
  isActive?: Boolean;
}

const TolltipIconAction: FC<TolltipIconActionProps> = ({
  children,
  position,
  title,
  isActive,
}) => {
  return (
    <Tooltip title={title} arrow placement={position}>
      <IconButton sx={{ backgroundColor: isActive ? "#7c3aed" : "#a8a29e" }}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default TolltipIconAction;
