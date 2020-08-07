import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Switch, Route } from "react-router-dom";
import Profile from "./ui/components/Profile/Profile";
import Header from "./ui/components/Header";
import RecipeList from "./ui/components/RecipleList/RecipeList";
import Registration from "./ui/components/Registration";
import Login from "./ui/components/Login";
import EditProfile from "./ui/components/Profile/EditProfile";

import axios from "./api/axios";
import { singInUser } from "./store/main/actions";

class App extends React.Component {
  async componentDidMount() {
    try {
      const user = await axios.get(`${axios.defaults.baseURL}/auth/check`);
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
          <Route path="/profile" component={Profile} exact />
          <Route path="/edit-profile" component={EditProfile} exact />
          <Route path="/recipe-list" component={RecipeList} exact />

          <Route path="/registration" component={Registration} exact />
          <Route path="/login" component={Login} exact />

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
