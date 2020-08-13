/* eslint-disable no-undef */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Profile from "./ui/components/Profile/Profile";
import EditProfile from "./ui/components/Profile/EditProfile";
import RecipeList from "./ui/components/RecipleList/RecipeList";
import Registration from "./ui/components/Registration";
import Login from "./ui/components/Login";
import RedirectPage from "./RedirectPage";

const RouterComponent = (props) => {
  return (
    <>
      <Switch>
        {routes.map(({ path, component, forRegistered }) => {
          if (Boolean(props.user.id) === forRegistered) {
            return <Route path={path} key={path} component={component} exact />;
          }
          return (
            <Route path={path} key={path} component={RedirectPage} exact />
          );
        })}
        <Route path="/" render={() => 404} />
      </Switch>
    </>
  );
};

const routes = [
  {
    path: "/profile",
    component: Profile,
    forRegistered: true,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
    forRegistered: true,
  },
  {
    path: "/recipe-list",
    component: RecipeList,
    forRegistered: true,
  },

  {
    path: "/registration",
    component: Registration,
    forRegistered: false,
  },
  {
    path: "/login",
    component: Login,
    forRegistered: false,
  },
];

RouterComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

const connectFunction = connect((state) => ({
  user: state.main.user,
}));

export default connectFunction(RouterComponent);
