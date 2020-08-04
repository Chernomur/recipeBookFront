import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "./components/Profile";
import Header from "./components/Header";
import RecipeList from "./components/RecipleList/RecipeList";
import Registration from "./components/Registration";
import Login from "./components/Login";
import axios from "./api/axios";
import { singInUser } from "./store/main/actions";

class App extends React.Component {
  componentDidMount() {
    try {
      axios.get(`${axios.defaults.baseURL}/auth/check`)
        .then((res) => {
          // eslint-disable-next-line react/prop-types
          this.props.singInUser(res);
        });
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render () {
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
}

const connectFunction = connect(
  null, {
    singInUser
  }
);

export default connectFunction(App);
