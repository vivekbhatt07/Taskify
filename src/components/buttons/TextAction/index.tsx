import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextAction = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#7c3aed",
  fontWeight: "400",
  // fontFamily: "inherit",
  textTransform: "capitalize",
  padding: "0.4em 1.4em",
  borderRadius: "200px",
  "&:hover": {
    backgroundColor: "#5b21b6",
  },
}));

export default TextAction;
