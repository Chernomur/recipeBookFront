import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header";
import RecipeList from "./components/RecipleList/RecipeList";
import Registration from "./components/Registration";
import Login from "./components/Login";
import EditProfile from "./components/Profile/EditProfile";

import axios from "./api/axios";
import { singInUser } from "./store/main/actions";

class App extends React.Component {
  async componentDidMount() {
    try {
      const { user } = await axios.get(`${axios.defaults.baseURL}/auth/check`);

      this.props.singInUser(user);
    } catch (e) {
      // console.log(`😱 Axios request failed: ${e}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route path="/Profile" component={Profile} exact />
          <Route path="/EditProfile" component={EditProfile} exact />
          <Route path="/RecipeList" component={RecipeList} exact />

          <Route path="/Registration" component={Registration} exact />
          <Route path="/Login" component={Login} exact />

          <Route path="/" render={() => 404} />
        </Switch>
      </>
    );
  }
}

App.propTypes = {
  singInUser: PropTypes.func.isRequired
};

const connectFunction = connect(
  null, {
    singInUser
  }
);

export default connectFunction(App);
