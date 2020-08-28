import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Paper, Button, Avatar } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { getUser } from "api/userApi";
import defaultAvatar from "public/userDefault.webp";

import { updateUser } from "ui/pages/Profile/store/actions";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getUserReq();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getUserReq();
    }
  }

  updateUser = (user) => {
    this.setState({ user });
  };

  getUserReq = async () => {
    try {
      if (
        +this.props.match.params.id === this.props.user.id ||
        this.props.user.role === "admin"
      ) {
        const res = await getUser(this.props.match.params.id);

        this.updateUser(res);
      } else {
        this.props.history.push(`/profile/${this.props.user.id}`);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  render() {
    if (!this.state.user) {
      return null;
    }

    return (
      <StyledProfilePage>
        <Paper className="paper" elevation={3}>
          <Avatar
            className="avatar"
            src={
              this.state.user.avatar ? this.state.user.avatar : defaultAvatar
            }
          ></Avatar>

          <div>
            <div>
              <h3> {this.state.user.fullName}</h3>
            </div>

            <div>
              <h4>{this.state.user.email}</h4>
            </div>
          </div>
          {+this.props.match.params.id === this.props.user.id && (
            <Link className="edit-profile-button" to={"/edit-profile"}>
              <Button variant="contained" color="secondary">
                Edit Profile
              </Button>
            </Link>
          )}
        </Paper>
      </StyledProfilePage>
    );
  }
}

const StyledProfilePage = styled.div`
  .paper {
    padding: 10px;
    margin: auto;
    background-color: whitesmoke;
    max-width: 380px;
  }

  .edit-profile-button {
    text-decoration: none;
  }

  .avatar {
    margin: auto;
    width: 150px;
    height: 150px;
  }
`;

const connectFunction = connect(
  (state) => ({
    currentUser: state.user.currentUser,
    user: state.main.user,
  }),
  { updateUser }
);

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

withRouter(Profile);

export default connectFunction(Profile);
