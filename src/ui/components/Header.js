import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import { updateUser } from "store/main/actions";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { storage } from "utils";

class Header extends React.Component {
  logOut = () => {
    this.props.updateUser({});
    storage.token.set(null);
  };

  render() {
    return (
      <>
        <StiledHeader>
          <AppBar position="fixed" className="header">
            <Link to="/recipe-list">
              <img
                className="header-logo"
                alt={"logo"}
                src={"https://image.flaticon.com/icons/svg/3202/3202822.svg"}
              />
            </Link>
            {this.props.user.id && (
              <TextField
                className="search"
                id="filled-textarea"
                placeholder="Search"
                variant="filled"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <Breadcrumbs aria-label="breadcrumb">
              {this.props.user.id && (
                <Link className="button-link" to="/recipe-list">
                  <Button>
                    <FavoriteIcon className="icon" />
                    Favorite
                  </Button>
                </Link>
              )}

              {this.props.user.id && (
                <Link className="button-link" to="/profile">
                  <Button>
                    <AccountCircleIcon className="icon" />
                    Profile
                  </Button>
                </Link>
              )}

              {this.props.user.id && (
                <Button onClick={this.logOut}>
                  <ExitToAppIcon className="icon" />
                  logOut
                </Button>
              )}

              {!this.props.user.id && (
                <Link className="button-link" to="/login">
                  <Button>login</Button>
                </Link>
              )}

              {!this.props.user.id && (
                <Link className="button-link" to="/registration">
                  <Button>registration </Button>
                </Link>
              )}
            </Breadcrumbs>
          </AppBar>
        </StiledHeader>
      </>
    );
  }
}

const StiledHeader = styled.header`
  margin-bottom: 100px;

  .button-link {
    text-decoration: none;
  }

  .icon {
    width: 20;
    height: 20;
  }

  .search {
    width: 250px;
  }

  .search input {
    margin-bottom: 15px;
    font-size: 25px;
  }

  .header {
    height: 60px;
    background-color: coral;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 300px;
  }
  .header-logo {
    width: 50px;
  }

  input {
    width: 500px;
    height: 20px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
  }),
  {
    updateUser,
  }
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connectFunction(Header);
