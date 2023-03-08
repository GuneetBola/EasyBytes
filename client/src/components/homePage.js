import React, { useEffect, useState } from "react";
import MainNavBar from "./mainNavbar";
import AllRecipes from "./allRecipes";
import SelectionModel from "./selectionModel";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({
    cuisine: "",
    meal_type: "",
    diet_label: "",
    sort: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Home">
      <header>
        <MainNavBar />
      </header>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome to EasyBytes user {location.state.userId}
      </h4>
      <SelectionModel
        style={{ padding: 300 }}
        toChild={data}
        sendToParent={setData}
      ></SelectionModel>
      <div>
        <AllRecipes search={data}></AllRecipes>
      </div>
    </div>
  );
};

export default Home;
