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
        unsavedFullName: props.user.fullName,
        unsavedEmail: props.user.email
      };
    }
    return null;
  }

  updateUserInfo = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/user/${this.props.user.id}`,
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
      <>
        {
          !this.props.user.id &&
          <div>
            <h2>вы не зарегистрированы</h2>
          </div>
        }
        {
          this.props.user.id &&
          <EditProfileForm
            onSubmit={this.updateUserInfo}
          >
            <div>

              <div>
                Change avatar:
                <ImageUpload />
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
                  name="Fullname"
                />
              </div>

              <div>
                Change Email:
                <input
                  value={this.state.unsavedEmail}
                  name="email"
                  onChange={this.changeEmail}
                />
              </div>

              <div>
                Change Password:
                <input name="password" />
              </div>

              <div>
                <input
                  type="submit"
                  value="Save changes" />
              </div>

              {
                this.state.serverMessage &&
                <div className="card">
                  {this.state.serverMessage}
                </div>
              }
            </div>
          </EditProfileForm>
        }
      </>
    );
  }
}

const EditProfileForm = styled.form`
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
    user: state.main.user,
    editableContent: state.main.editableContent
  }), {
    singInUser
  }
);

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  singInUser: PropTypes.func.isRequired
};

export default connectFunction(EditProfile);
