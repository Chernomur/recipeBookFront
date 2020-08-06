import React from "react";
import styled from "styled-components";
import axios from "../../api/axios";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  async handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${axios.defaults.baseURL}/user/upload`,
        this.state.file);

      // console.log("res:",response);
    } catch (e) {
      // console.log("error", e);
    }
    // console.log("file", this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl}/>);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <StyledPreview>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          method="post"
          encType="multipart/form-data"
        >
          <input
            className="fileInput"
            type="file"
            name="filedata"
            onChange={(e) => this.handleImageChange(e)}/>
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}>Upload Image
          </button>
        </form>
        <div className="imgPreview">
          {imagePreview}
        </div>
      </StyledPreview>
    );
  }
}

const StyledPreview = styled.div`
  
  .imgPreview {
    text-align: center;
    margin: 5px 15px;
    height: 200px;
    width: 500px;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 5px solid gray;
    border-bottom: 5px solid gray;
  
   img{
    width: 100%;
    height: 100%;
  }
  }
  .previewText{
    width: 100%;
    margin-top: 20px;
  }
`;

export default (ImageUpload);
