import React from "react";
import { Route } from "react-router-dom";

import Profile from "./components/Profile";
import Header from "./components/Header";
import RecipeList from "./components/RecipleList/RecipeList";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Header/>
      <Route path="/Profile" render={() => <Profile/>}/>
      <Route path="/RecipeList" render={() => <RecipeList/>}/>
      <Route path="/Registration" render={() => <Registration/>}/>
      <Route path="/Login" render={() => <Login/>}/>
    </div>
  );
}

export default App;
