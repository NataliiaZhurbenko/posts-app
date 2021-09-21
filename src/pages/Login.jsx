import React, { useContext } from "react";
import Input from "../components/UI/input/input";
import Button from "../components/UI/button/Button";
import { AuthContext } from "../context";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={login}>
        <Input type="text" placeholder="Login" />
        <Input type="password" placeholder="Password" />
        <Button>Sign in</Button>
      </form>
    </div>
  );
};

export default Login;
