import { Link, NavLink } from "react-router-dom";
import { useMode, useUser } from "../../context";
import { TolltipIconAction, IconButton } from "../../components";
import { Dashboard, DonutSmall, TableChart, Person } from "@mui/icons-material";

import "./Header.css";

const Header = () => {
  const { isDarkTheme, toggleTheme } = useMode();
  const { token } = useUser();

  const headerNavList = [
    { title: "Dashboard", reach: "/", icon: <Dashboard /> },
    { title: "Charts", reach: "/metrics", icon: <DonutSmall /> },
    { title: "Table", reach: "/table", icon: <TableChart /> },
  ];
  return (
    <header
      className={`px-2 py-4 text-xl ${isDarkTheme ? "dark" : "light"}-header`}
    >
      <div className="flex justify-between items-center">
        <h1>
          <Link to="/">Taskify</Link>
        </h1>
        {token && (
          <div className="flex gap-3">
            {headerNavList.map((item, index) => {
              return (
                <NavLink to={item.reach} key={index}>
                  {({ isActive }) => (
                    <TolltipIconAction
                      position={
                        index === 0
                          ? "left"
                          : index === headerNavList.length - 1
                          ? "right"
                          : "bottom"
                      }
                      title={item.title}
                      isActive={isActive}
                    >
                      {item.icon}
                    </TolltipIconAction>
                  )}
                </NavLink>
              );
            })}
          </div>
        )}
        <div className="flex gap-3 items-center">
          {token && (
            <IconButton>
              <Person />
            </IconButton>
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
