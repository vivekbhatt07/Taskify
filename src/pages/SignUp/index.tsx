import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { TextButton, LightLoader, DarkLoader } from "../../components";

import { PageContainer } from "../../layout";
import { useMode, useUser } from "../../context";

const SignUp = () => {
  const { isDarkTheme } = useMode();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { signUpUserHandler, isLoading } = useUser();
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPasword: "",
  });

  const handleSignUpFormInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpFormData((prevSignUpFormData) => {
      return { ...prevSignUpFormData, [name]: value };
    });
  };

  const isPasswordMatch =
    signUpFormData.password === signUpFormData.confirmPasword;

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirmPasword, ...rest } = signUpFormData;
    const signUpData = rest;
    signUpUserHandler(signUpData);
    setSignUpFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPasword: "",
    });
  };

  return (
    <PageContainer>
      <div className="hidden absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-stone-900 -translate-x-1/2 -translate-y-1/2 lg:flex justify-center items-center dark:bg-stone-800">
        <div className="w-[400px] h-[400px] bg-stone-700 rounded-full dark:bg-stone-600"></div>
      </div>

      <div className="flex flex-col pt-14 gap-8">
        <h1 className="cursor-pointer text-center text-2xl">Taskify Signup</h1>
        <form
          className="signup_form mx-auto mb-4 md:w-[500px] z-10"
          onSubmit={(e) => handleSignUpSubmit(e)}
        >
          <div className="flex flex-col gap-8 dark:bg-stone-900 bg-stone-50">
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {/* FIRST NAME */}
                <TextField
                  className="basis-1/2"
                  name="firstName"
                  label="First Name"
                  value={signUpFormData.firstName}
                  onChange={handleSignUpFormInputs}
                  type="text"
                  required
                />

                {/* LAST NAME */}

                <TextField
                  className="basis-1/2"
                  name="lastName"
                  label="Last Name"
                  value={signUpFormData.lastName}
                  onChange={handleSignUpFormInputs}
                  type="text"
                  required
                />
              </div>

              {/* EMAIL */}
              <TextField
                name="email"
                label="Email"
                value={signUpFormData.email}
                onChange={handleSignUpFormInputs}
                type="email"
                required
              />
              {/* USERNAME */}
              <TextField
                name="username"
                label="Username"
                value={signUpFormData.username}
                onChange={handleSignUpFormInputs}
                type="text"
                required
              />
              <div className="flex gap-2">
                {/* PASSWORD */}
                <FormControl variant="outlined">
                  <InputLabel htmlFor="signUp_password">Password</InputLabel>
                  <OutlinedInput
                    className="basis-1/2"
                    name="password"
                    label="Password"
                    value={signUpFormData.password}
                    onChange={handleSignUpFormInputs}
                    type={showPassword ? "text" : "password"}
                    required
                    id="signUp_password"
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
                {/* CONFIRM PASSWORD */}
                <FormControl variant="outlined">
                  <InputLabel htmlFor="signUpConfirm_password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    className="basis-1/2"
                    name="confirmPasword"
                    label="Confirm Password"
                    value={signUpFormData.confirmPasword}
                    onChange={handleSignUpFormInputs}
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    id="signUpConfirm_password"
                    error={!isPasswordMatch}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!isPasswordMatch && (
                    <FormHelperText error>
                      Password does not match
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="flex justify-center">
              <TextButton
                type="submit"
                disabled={!isPasswordMatch || !signUpFormData.password}
              >
                Sign up
              </TextButton>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center gap-4 justify-center max-w-xs m-auto md:w-2/4 dark:bg-stone-900 border-t pt-4 border-[#ddd] w-full">
          <p>Have an account already?</p>
          <TextButton onClick={() => navigate("/login")}>Log In</TextButton>
        </div>
      </div>
      {isLoading && (isDarkTheme ? <DarkLoader /> : <LightLoader />)}
    </PageContainer>
  );
};

export default SignUp;
