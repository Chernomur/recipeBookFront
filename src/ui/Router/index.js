/* eslint-disable no-undef */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Recipe from "ui/pages/Recipe";
import Profile from "ui/pages/Profile";
import EditProfile from "ui/pages/EditProfile";
import Recipes from "ui/pages/Recipes";
import Registration from "ui/pages/Registration";
import Login from "ui/pages/Login";
import RedirectPage from "ui/pages/RedirectPage";
import Users from "ui/pages/admin/Users";
import CreateRecipe from "ui/pages/CreateRecipe";

const Router = (props) => {
  return (
    <>
      <Switch>
        {routes.map(({ path, component, forRegistered, forAdmin }) => {
          if (props.user.role === "admin" && forAdmin === true) {
            return <Route path={path} key={path} component={component} exact />;
          }
          if (Boolean(props.user.id) === forRegistered && forAdmin === false) {
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
    path: "/profile/:id?",
    component: Profile,
    forRegistered: true,
    forAdmin: false,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
    forRegistered: true,
    forAdmin: false,
  },
  {
    path: "/recipe/:id",
    component: Recipe,
    forRegistered: true,
    forAdmin: false,
  },
  {
    path: "/recipe-list",
    component: Recipes,
    forRegistered: true,
    forAdmin: false,
  },
  {
    path: "/create-recipe",
    component: CreateRecipe,
    forRegistered: true,
    forAdmin: false,
  },
  {
    path: "/registration",
    component: Registration,
    forRegistered: false,
    forAdmin: false,
  },
  {
    path: "/login",
    component: Login,
    forRegistered: false,
    forAdmin: false,
  },
  {
    path: "/users",
    component: Users,
    forRegistered: true,
    forAdmin: true,
  },
];

Router.propTypes = {
  user: PropTypes.object.isRequired,
};

const connectFunction = connect((state) => ({
  user: state.main.user,
}));

export default connectFunction(Router);
