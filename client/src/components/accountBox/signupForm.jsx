import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const register = () => {
    if (
      userName === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      alert(
        "One or more fields is blank. \nMust fill in all the information to create an account!"
      );
    } else {
      Axios.post("http://localhost:5000/register", {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }).then((response) => {
        // console.log(response);
        if (response.data === "invalid") {
          alert(
            "Username already taken. \nPlease try again with another user name."
          );
        } else {
          Axios.post("http://localhost:5000/login", {
            userName: userName,
            password: password,
          }).then((res) => {
            sessionStorage.setItem("authenticated", res.data[0]["user_id"]);
            let uID = sessionStorage.getItem("authenticated");
            navigate("/home", {
              state: { userId: uID },
            });
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
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
      <SubmitButton type="submit" onClick={register}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}