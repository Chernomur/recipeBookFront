import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Paper, Button, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    return (
      <>
        {this.props.user.id && (
          <StyledProfilePage>
            <Paper className="paper" elevation={3}>
              <Avatar
                className="avatar"
                src={this.props.user.avatar}
                alt="user's avatar"
              />

              <div>
                <div>
                  <h3> {this.props.user.fullName}</h3>
                </div>

                <div>
                  <h4>{this.props.user.email}</h4>
                </div>
              </div>
              <Link className="edit-profile-button" to={"edit-profile"}>
                <Button variant="contained" color="secondary">
                  Edit Profile
                </Button>
              </Link>
            </Paper>
          </StyledProfilePage>
        )}
      </>
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
    width: 150px;
    height: 150px;
  }
`;

const connectFunction = connect((state) => ({
  user: state.main.user,
}));

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connectFunction(Profile);
