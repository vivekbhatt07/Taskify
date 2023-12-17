import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import {
  TextButton,
  DarkLoader,
  LightLoader,
  TolltipIconAction,
} from "../../components";
import { PageContainer } from "../../layout";
import { useMode, useUser } from "../../context";
import {
  Visibility,
  VisibilityOff,
  RestartAlt,
  ArrowForwardIos,
} from "@mui/icons-material";

import TaskifyLogo from "../../assets/image/logo/taskify.png";

const Login = () => {
  const navigate = useNavigate();
  const { state, logInUserHandler, isLoading } = useUser();
  const { isDarkTheme } = useMode();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [logInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogInFormInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogInFormData((prevLogInFormData) => {
      return { ...prevLogInFormData, [name]: value };
    });
  };

  const handleLogInFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logInUserHandler({
      email: logInFormData.email,
      password: logInFormData.password,
    });
    setLogInFormData({
      email: "",
      password: "",
    });
  };

  return (
    <PageContainer>
      <div className="max-w-xs m-auto md:max-w-sm lg:w-[24rem] border p-6 rounded-lg flex flex-col gap-10 md:mt-16 border-[#bbb]">
        <div className="flex w-full flex-col dark:bg-stone-900 gap-6">
          <h1 className="text-center text-2xl">
            <div className="w-[80px] mx-auto rounded-md overflow-hidden">
              <img src={TaskifyLogo} alt="logo" />
            </div>
          </h1>
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
            <div className="flex justify-between gap-2">
              <TextButton
                type="submit"
                className="basis-1/2"
                disabled={!logInFormData.email || !logInFormData.password}
              >
                Log in
              </TextButton>
              <TolltipIconAction
                position="bottom"
                title="Clear Credentials"
                onClick={() => {
                  setLogInFormData({ email: "", password: "" });
                }}
              >
                <RestartAlt />
              </TolltipIconAction>
              <TextButton
                className="w-full basis-1/2"
                type="button"
                disabled={!state.userList[0]?.email}
                onClick={() => {
                  setLogInFormData({
                    email: state.userList[0].email,
                    password: "HelloWorld07@",
                  });
                }}
              >
                Fill Credentials
              </TextButton>
            </div>
          </form>
        </div>
        <div className="w-full items-center gap-4 justify-center dark:bg-stone-900 flex flex-col border-t pt-4 border-[#ddd]">
          <p>Don't have an account?</p>
          <Button
            variant="text"
            onClick={() => navigate("/signup")}
            sx={{
              color: isDarkTheme ? "#8b5cf6" : "#6d28d9",
              textTransform: "capitalize",
              gap: "8px",
              fontFamily: "inherit",
              fontWeight: "400",
            }}
          >
            Sign Up <ArrowForwardIos sx={{ fontSize: "12px" }} />
          </Button>
        </div>
      </div>
      {isLoading && (isDarkTheme ? <DarkLoader /> : <LightLoader />)}
    </PageContainer>
  );
};

export default Login;
