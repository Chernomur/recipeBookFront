import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./ui/components/containers/Header";

import { authCheck } from "./api/authApi";
import { updateUser } from "./store/main/actions";
import Router from "./ui/Router";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTokenValidated: false,
    };
  }

  async componentDidMount() {
    await authCheck().then(
      (result) => this.props.updateUser(result),
      () => {}
    );
    this.setState({ isTokenValidated: true });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        {this.state.isTokenValidated === false ? (
          <div></div>
        ) : (
          <>
            <Header />
            <Router />
          </>
        )}
      </>
    );
  }
}

App.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
  }),
  {
    updateUser,
  }
);

export default connectFunction(App);
