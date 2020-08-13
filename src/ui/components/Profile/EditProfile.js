import React, { createRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { editUser, editImgUpload } from "api/userApi";

import { updateUser } from "store/main/actions";
import { Paper, TextField, Button, Avatar } from "@material-ui/core";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.inputFile = createRef();
    this.state = {
      unsavedFullName: null,
      unsavedEmail: null,
      oldPassword: null,
      newPassword: null,
      passwordConfirm: null,
      errorMessage: null,
      errorField: null,

      file: null,
      fileURL: null,

      changePassword: false,
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

  updateUserInfo = async (event) => {
    event.preventDefault();
    // if (
    //   this.state.passwordConfirm ||
    //   this.state.newPassword ||
    //   this.state.oldPassword
    // ) {
    // }
    if (this.state.passwordConfirm !== this.state.newPassword) {
      this.setState({ errorMessage: "Password mismatch" });
      return;
    }
    if (this.state.newPassword && !this.state.oldPassword) {
      this.setState({ errorField: "newPassword" });
      this.setState({ errorMessage: "input old Password" });
      return;
    }
    try {
      if (this.state.file) {
        await editImgUpload({ file: this.state.file });
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
      this.props.history.push("/profile");
    } catch (e) {
      // console.log(e);
      this.setState({ errorMessage: e.response.data.message });
      this.setState({ errorField: e.response.data.field });
    }
  };

  inputFileHandler = async (event) => {
    const fd = new FormData();
    fd.append("filedata", event.target.files[0]);

    this.setState({ fileURL: URL.createObjectURL(event.target.files[0]) });

    this.setState({ file: fd });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  clickOnRef = () => {
    this.inputFile.current.click();
  };

  showChangePassword = () => {
    this.setState({ changePassword: !this.state.changePassword });
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
                    src={this.state.fileURL || this.props.user.avatar}
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

                <div>
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
                {this.state.changePassword && (
                  <div className="change-password">
                    <TextField
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
                )}

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
  .change-password {
    display: flex;
    border-radius: 5px;
    border: solid 1px lightcoral;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }

  .button-link {
    text-decoration: none;
  }

  .avatar {
    width: 150px;
  }

  div {
    margin: 15px;
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