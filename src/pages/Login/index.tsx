import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import { ModalProvider, TextButton } from "../../Components";
import { PageContainer } from "../../layout";
import { useUser } from "../../context";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useUser();
  //   const { isDarkTheme } = useTheme();
  //   const { logInHandler } = useAuth();
  //   const { state } = usePost();

  const [isLoginGuestOpen, setIsLoginGuestOpen] = useState(false);

  const openLoginGuestHandler = () => setIsLoginGuestOpen(true);
  const closeLoginGuestHandler = () => setIsLoginGuestOpen(false);

  const [logInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleLogInFormInputs = (event) => {
    const { name, value } = event.target;
    setLogInFormData((prevLogInFormData) => {
      return { ...prevLogInFormData, [name]: value };
    });
  };

  const isLoginCredentials = state.userList.find((currentUser) => {
    return (
      currentUser.username == logInFormData.username &&
      currentUser.password == logInFormData.password
    );
  });

  const handleLogInFormSubmit = (event) => {
    event.preventDefault();
    // if (isLoginCredentials) {
    //   logInHandler(logInData.logInName, logInData.logInPassword);
    // } else {
    //
    // }
  };

  return (
    <PageContainer>
      <div className="max-w-xs m-auto md:max-w-sm lg:w-[24rem] border p-6 rounded-lg flex flex-col gap-10 md:mt-16">
        <div className="flex w-full flex-col dark:bg-stone-900 gap-6">
          <h1 className="cursor-pointer text-center text-2xl" role="button">
            Taskify Login
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleLogInFormSubmit}
          >
            <TextField
              name="username"
              label="UserName"
              type="text"
              value={logInFormData.username}
              onChange={handleLogInFormInputs}
              required
            />

            <TextField
              name="password"
              label="Password"
              type="text"
              value={logInFormData.password}
              onChange={handleLogInFormInputs}
              required
            />

            <div className="flex justify-between">
              <TextButton type="submit" className="basis-1/2">
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
                  {state.userList.map((current) => {
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
                  })}
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
