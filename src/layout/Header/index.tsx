import { useState } from "react";
import { Link } from "react-router-dom";
import { useMode, useProject, useUser } from "../../context";
import { TolltipIconAction, IconButton } from "../../components";
import { Person, Logout } from "@mui/icons-material";

import "./Header.css";
import { Popover } from "@mui/material";

const Header = () => {
  const { dispatch } = useProject();
  const { isDarkTheme, toggleTheme } = useMode();
  const { state, logOutUserHandler } = useUser();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <header
      className={`px-2 py-4 text-xl ${isDarkTheme ? "dark" : "light"}-header`}
    >
      <div className="flex justify-between items-center">
        <h1>
          <Link to="/">Taskify</Link>
        </h1>

        <div className="flex gap-3 items-center">
          {state.token && (
            <>
              <IconButton onClick={handleClick} aria-describedby={id}>
                <Person />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="p-4 flex flex-col gap-4 min-w-[200px]">
                  <div className="flex flex-row justify-center">
                    <div className="w-[50px] h-[50px]">
                      <img
                        src="https://res.cloudinary.com/duqsyuriy/image/upload/v1687449309/Avatar/AvatarThree_mg1cgs.svg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-center text-lg">
                      {state?.user?.firstName} {state?.user?.lastName}
                    </div>
                    <div className="text-sm text-center bg-400 text-[#fff] dark:bg-500 rounded-full py-[2px] px-2">
                      {state?.user?.username}
                    </div>
                  </div>
                  <div className="mx-auto">
                    <TolltipIconAction
                      position={"bottom"}
                      title="Log Out"
                      onClick={() => {
                        logOutUserHandler();
                        dispatch({ type: "RESET_PROJECT" });
                      }}
                    >
                      <Logout />
                    </TolltipIconAction>
                  </div>
                </div>
              </Popover>
            </>
          )}

          <button
            className={`mode ${isDarkTheme ? "dark" : "light"}-mode`}
            onClick={() => toggleTheme(!isDarkTheme)}
          >
            <span
              className={`circle ${isDarkTheme ? "dark" : "light"}-circle`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
