import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import {
  ModalProvider,
  TextButton,
  DarkLoader,
  LightLoader,
} from "../../Components";
import { PageContainer } from "../../layout";
import { useUser } from "../../context";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const { state, logInUserHandler } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [isLoginGuestOpen, setIsLoginGuestOpen] = useState(false);

  const openLoginGuestHandler = () => setIsLoginGuestOpen(true);
  const closeLoginGuestHandler = () => setIsLoginGuestOpen(false);

  const [logInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogInFormInputs = (event) => {
    const { name, value } = event.target;
    setLogInFormData((prevLogInFormData) => {
      return { ...prevLogInFormData, [name]: value };
    });
  };

  // const isLoginCredentials = state.userList.find((currentUser) => {
  //   return (
  //     currentUser.email == logInFormData.email &&
  //     currentUser.password == logInFormData.password
  //   );
  // });

  const handleLogInFormSubmit = (event) => {
    event.preventDefault();
    logInUserHandler(logInFormData.email, logInFormData.password);
    setLogInFormData({
      email: "",
      password: "",
    });
  };

  return (
    <PageContainer>
      <div className="max-w-xs m-auto md:max-w-sm lg:w-[24rem] border p-6 rounded-lg flex flex-col gap-10 md:mt-16">
        <div className="flex w-full flex-col dark:bg-stone-900 gap-6">
          <h1 className="cursor-pointer text-center text-2xl">Taskify Login</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleLogInFormSubmit}
          >
            <TextField
              name="email"
              label="Email"
              type="text"
              value={logInFormData.email}
              onChange={handleLogInFormInputs}
              required
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="login_password">Password</InputLabel>
              <OutlinedInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={logInFormData.password}
                onChange={handleLogInFormInputs}
                id="login_password"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex justify-between">
              <TextButton type="submit" className="basis-1/2">
                {/* {state.token ? "Log in" : <DarkLoader />} */}
                Log in
              </TextButton>
              <ModalProvider
                isOpen={isLoginGuestOpen}
                closeModal={closeLoginGuestHandler}
                title="Log In As"
                OpenAction={
                  <TextButton
                    className="w-full basis-1/2"
                    type="button"
                    onClick={() => {
                      openLoginGuestHandler();
                    }}
                  >
                    Log in as guest
                  </TextButton>
                }
              >
                <div className="h-[400px] overflow-y-scroll">
                  {/* {state.userList.map((current) => {
                    return (
                      <article
                        key={current._id}
                        onClick={() => {}}
                        className="flex cursor-pointer transition-all duration-200 rounded-md p-2 lg:flex-col lg:items-start lg:gap-2 xl:flex-row xl:justify-between xl:items-center hover:bg-300 dark:hover:bg-700"
                      >
                        <div className="flex gap-3 lg:justify-start lg:w-full xl:justify-start xl:gap-3">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {current.username}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })} */}
                </div>
              </ModalProvider>
            </div>
          </form>
        </div>
        <div className="w-full items-center gap-4 justify-center dark:bg-stone-900 flex flex-col border-t pt-4 border-[#ddd]">
          <p>Don't have an account?</p>
          <TextButton variant="text" onClick={() => navigate("/signup")}>
            Sign Up
          </TextButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
