import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("authenticated")) {
      let uID = sessionStorage.getItem("authenticated");
      navigate("/home", {
        state: { userId: uID },
      });
    }
  }, []);

  const login = () => {
    if (userName === "" || password === "") {
      alert(
        "One or more fields is blank. \nMust fill in all the information to login!"
      );
    } else {
      Axios.post("http://localhost:5000/login", {
        userName: userName,
        password: password,
      }).then((response) => {
        // console.log(response.data[0]["user_id"]);
        if (response.data === "invalid") {
          alert("Username or password don't match. \nPlease try again!");
        } else {
          sessionStorage.setItem("authenticated", response.data[0]["user_id"]);
          let uID = sessionStorage.getItem("authenticated");
          navigate("/home", {
            state: { userId: uID },
          });
        }
      });
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>
        Signin
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
