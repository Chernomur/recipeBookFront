import React, { createRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { editUser, editImgUpload } from "api/userApi";

import { updateUser } from "store/main/actions";
import { Paper, TextField, Button, Avatar, Collapse } from "@material-ui/core";
import defaultAvatar from "public/userDefault.webp";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.inputFile = createRef();
    this.state = {
      unsavedFullName: null,
      unsavedEmail: null,

      changePassword: false,
      isRequired: false,
      oldPassword: null,
      newPassword: null,
      passwordConfirm: null,

      errorMessage: null,
      errorField: null,

      file: null,
      fileURL: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.unsavedEmail == null) {
      return {
        unsavedFullName: props.user.fullName,
        unsavedEmail: props.user.email,
      };
    }
    return null;
  }

  passValidation = (password) => {
    if (password.length < 3 || password.length > 50) {
      return false;
    }

    return !password.includes(" ");
  };

  updateUserInfo = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: null, errorField: null });

    if (
      this.state.oldPassword ||
      this.state.newPassword ||
      this.state.passwordConfirm
    ) {
      if (this.state.passwordConfirm !== this.state.newPassword) {
        this.setState({ errorMessage: "Password mismatch" });
        return;
      }

      if (this.state.newPassword && !this.state.oldPassword) {
        this.setState({ errorField: "newPassword" });
        this.setState({ errorMessage: "input old Password" });
        return;
      }
      if (!this.passValidation(this.state.oldPassword)) {
        this.setState({ errorField: "oldPassword" });
        this.setState({ errorMessage: "invalid password" });
        return;
      }

      if (!this.passValidation(this.state.newPassword)) {
        this.setState({ errorField: "newPassword" });
        this.setState({ errorMessage: "invalid password" });
        return;
      }
    }

    try {
      if (this.state.file) {
        await editImgUpload(this.state.file);
      }

      const response = await editUser(this.props.user.id, {
        fullName: this.state.unsavedFullName,
        email: this.state.unsavedEmail,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      });

      this.props.updateUser(response);

      this.setState({ errorMessage: "change completed" });
      // eslint-disable-next-line react/prop-types
      this.props.history.push(`/profile/${this.props.user.id}`);
    } catch (e) {
      // console.log(e);
      this.setState({ errorMessage: e.response.data.message });
      this.setState({ errorField: e.response.data.field });
    }
  };

  inputFileHandler = async (event) => {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  };

  isRequiredHandler = () => {
    if (
      this.state.passwordConfirm ||
      this.state.newPassword ||
      this.state.oldPassword
    ) {
      this.setState({ isRequired: true });
    } else {
      this.setState({ isRequired: false });
    }
  };

  onInputChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.isRequiredHandler
    );
  };

  clickOnRef = () => {
    this.inputFile.current.click();
  };

  showChangePassword = () => {
    this.setState({ changePassword: !this.state.changePassword });
    this.setState(
      {
        oldPassword: null,
        newPassword: null,
        passwordConfirm: null,

        errorMessage: null,
        errorField: null,
      },
      this.isRequiredHandler
    );
  };

  render() {
    return (
      <>
        {this.props.user.id && (
          <EditProfileForm onSubmit={this.updateUserInfo}>
            <Paper className="paper" elevation={3}>
              <div>
                <div>
                  <Button
                    className="input-file"
                    variant="contained"
                    onClick={this.clickOnRef}
                  >
                    Change avatar
                  </Button>
                </div>
                <div className="preview">
                  <Avatar
                    className="img-preview"
                    src={
                      this.state.fileURL ||
                      (this.props.user.avatar
                        ? this.props.user.avatar
                        : defaultAvatar)
                    }
                  />
                </div>
                <div className="file-error">
                  <h3>
                    {this.state.errorField === "inputFile" &&
                      this.state.errorMessage}
                  </h3>
                </div>
                <input
                  accept="image/*"
                  className="hidden"
                  onChange={this.inputFileHandler}
                  ref={this.inputFile}
                  type="file"
                />

                <div className="user-info">
                  <TextField
                    label="Change Full Name"
                    error={this.state.errorField === "fullName"}
                    helperText={
                      this.state.errorField === "fullName"
                        ? this.state.errorMessage
                        : ""
                    }
                    value={this.state.unsavedFullName}
                    onChange={this.onInputChange}
                    name="unsavedFullName"
                  />

                  <TextField
                    label="Change Email"
                    error={this.state.errorField === "email"}
                    helperText={
                      this.state.errorField === "email"
                        ? this.state.errorMessage
                        : ""
                    }
                    value={this.state.unsavedEmail}
                    name="unsavedEmail"
                    onChange={this.onInputChange}
                  />
                </div>

                <Button
                  className="show-password-butt"
                  variant="contained"
                  onClick={this.showChangePassword}
                >
                  {this.state.changePassword
                    ? "non change password"
                    : "change password"}
                </Button>

                <Collapse in={this.state.changePassword}>
                  <div className="change-password">
                    <TextField
                      required={this.state.isRequired}
                      className="passwords"
                      onChange={this.onInputChange}
                      label="Old Password"
                      error={this.state.errorField === "oldPassword"}
                      helperText={
                        this.state.errorField === "oldPassword"
                          ? this.state.errorMessage
                          : ""
                      }
                      name="oldPassword"
                    />
                    <TextField
                      required={this.state.isRequired}
                      className="passwords"
                      onChange={this.onInputChange}
                      label="New Password"
                      error={this.state.errorField === "newPassword"}
                      helperText={
                        this.state.errorField === "newPassword"
                          ? this.state.errorMessage
                          : ""
                      }
                      name="newPassword"
                    />

                    <TextField
                      required={this.state.isRequired}
                      className="passwords"
                      onChange={this.onInputChange}
                      label="Password confirmation"
                      error={this.state.errorMessage === "Password mismatch"}
                      helperText={
                        this.state.errorMessage === "Password mismatch"
                          ? this.state.errorMessage
                          : ""
                      }
                      name="passwordConfirm"
                    />
                  </div>
                </Collapse>

                <div className="buttons">
                  <Link className="button-link" to="/profile">
                    <Button variant="contained">Back</Button>
                  </Link>

                  <Button type="submit" variant="contained" color="secondary">
                    Save changes
                  </Button>
                </div>
              </div>
            </Paper>
          </EditProfileForm>
        )}
      </>
    );
  }
}

const EditProfileForm = styled.form`
  display: flex;
  justify-content: center;

  .paper {
    max-width: 700px;
  }

  .input-file {
    margin: 10px;
  }

  .img-preview {
    margin: auto;
    width: 150px;
    height: 150px;
  }

  .file-error {
    color: red;
  }

  .hidden {
    visibility: hidden;
  }

  .show-password-butt {
    margin-bottom: 15px;
  }
  .user-info div {
    margin: 15px;
  }

  .change-password {
    display: flex;
    margin: 15px;
    padding: 5px;
  }
  .change-password div {
    padding-right: 10px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    margin: 15px;
  }

  .button-link {
    text-decoration: none;
  }

  .avatar {
    width: 150px;
  }
`;

const connectFunction = connect(
  (state) => ({
    user: state.main.user,
    editableContent: state.main.editableContent,
  }),
  {
    updateUser,
  }
);

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connectFunction(EditProfile);
