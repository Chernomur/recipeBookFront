import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import axios from "api/axios";
import { singInUser } from "store/main/actions";
import ImageUpload from "./ImageUpload";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsavedFullName: null,
      unsavedEmail: null,
      serverMessage: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.unsavedEmail == null) {
      return {
        unsavedFullName: props.authorisedUser.fullName,
        unsavedEmail: props.authorisedUser.email
      };
    }
    return null;
  }

  updateUserInfo = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/user/${this.props.authorisedUser.id}`,
        {
          fullName: this.state.unsavedFullName,
          email: this.state.unsavedEmail
        });

      this.props.singInUser(response);

      this.setState({ serverMessage: "change completed" });
    } catch (e) {
      this.setState({ serverMessage: e.response.data });
    }
  }

  changeFullName = (event) => {
    this.setState({ unsavedFullName: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ unsavedEmail: event.target.value });
  }

  render() {
    return (
      <div>
        {
          !this.props.authorisedUser.id &&
          <div>
            <h2>вы не зарегистрированы</h2>
          </div>
        }
        {
          this.props.authorisedUser.id &&
          <StyledProfilePage>
            <div>

              <div>
                Change avatar:
                <ImageUpload/>
                <img
                  className="avatar"
                  src="https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+people+person+profile+user+users+icon-1320190727966457290.png"
                  alt="user's avatar"
                />
              </div>

              <div>
                Change Full Name:
                <input
                  value={this.state.unsavedFullName}
                  onChange={this.changeFullName}
                />
              </div>

              <div>
                Change Email:
                <input
                  value={this.state.unsavedEmail}
                  onChange={this.changeEmail}
                />
              </div>

              <div>
                Change Password:
                <input/>
              </div>

              <div>
                <button onClick={this.updateUserInfo}>
                  Save changes
                </button>
              </div>

              {
                this.state.serverMessage &&
                <div className="card">
                  {this.state.serverMessage}
                </div>
              }
            </div>
          </StyledProfilePage>
        }
      </div>
    );
  }
}

const StyledProfilePage = styled.div`
  display: flex;
  background: indianred;
  padding: 15px;
  
  .avatar{
    width: 150px;
  }
  
  div{
    margin: 15px;
  }
`;

const connectFunction = connect(
  (state) => ({
    authorisedUser: state.main.authorisedUser,
    editableContent: state.main.editableContent
  }), {
    singInUser
  }
);

EditProfile.propTypes = {
  authorisedUser: PropTypes.object.isRequired,
  singInUser: PropTypes.func.isRequired
};

export default connectFunction(EditProfile);
