import React from "react";
import ReactCrop from "react-image-crop";

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crop: {
        minWidth: 256,
        maxWidth: 256,
        aspect: 1
      }
    };
  }

  onChange(crop) {
    this.setState({ crop }, () => {
      this.updateParent();
    });
  }

  updateParent() {
    if (this.props.getCrop) {
      this.props.getCrop(this.state.crop);
    }
  }

  render() {
    return (
      <ReactCrop
        src={this.props.url}
        onChange={this.onChange.bind(this)}
        crop={this.state.crop}
      />
    );
  }
}

export default ImageCropper;
