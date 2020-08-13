import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const RedirectPage = (props) => {
  return (
    <>{props.user.id ? <Redirect to="profile" /> : <Redirect to="login" />}</>
  );
};

RedirectPage.propTypes = {
  user: PropTypes.object.isRequired,
};

const connectFunction = connect((state) => ({
  user: state.main.user,
}));

export default connectFunction(RedirectPage);
