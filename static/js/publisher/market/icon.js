import React, { Fragment } from "react";
import reactDom from "react-dom";
import Modal from "../../components/modal";
import Cropper from "../../components/cropper";

class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCropper: false
    };
  }

  componentDidUpdate() {
    if (!this.canvas || !this.state.crop) {
      return false;
    }

    const ctx = this.canvas.getContext("2d");
    const image = new Image(this.props.url);

    ctx.drawImage(
      image,
      this.state.crop.x,
      this.state.crop.y,
      this.state.crop.width,
      this.state.crop.height,
      0,
      0,
      this.state.crop.width,
      this.state.crop.height
    );
  }

  openEditor() {
    this.setState({
      showCropper: true
    });
  }

  closeEditor() {
    this.setState({
      showCropper: false
    });
  }

  saveCrop(event) {
    event.preventDefault();
    this.setState({
      showCropper: false
    });
  }

  getCrop(crop) {
    this.setState({
      crop
    });
  }

  renderCanvas() {
    return (
      <canvas
        ref={ref => {
          this.canvas = ref;
        }}
        width={80}
        height={80}
      />
    );
  }

  renderCropper() {
    // this.cropper = new Cropper(this.image);
    // console.log(this.cropper);
    if (this.state.showCropper) {
      return (
        <Modal closeHandler={this.closeEditor.bind(this)}>
          <div className="p-card">
            <h4 className="p-card__title u-align-text--left">Edit icon</h4>
            <div className="p-card__content">
              <Cropper url={this.props.url} getCrop={this.getCrop.bind(this)} />
              <div class="row u-align--right">
                <button
                  className="p-button--positive u-no-margin--bottom"
                  onClick={this.saveCrop.bind(this)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal>
      );
    }

    return false;
  }

  render() {
    return (
      <Fragment>
        {this.state.crop ? (
          this.renderCanvas()
        ) : (
          <img
            src={this.props.url}
            alt=""
            ref={img => {
              this.image = img;
            }}
            onClick={this.openEditor.bind(this)}
          />
        )}
        {this.renderCropper()}
      </Fragment>
    );
  }
}

function init(input, wrapper, currentUrl) {
  const iconInput = document.querySelector(input);
  const iconWrapper = document.querySelector(wrapper);

  if (!iconInput) {
    throw new Error("No icon input found");
  }
  if (!iconWrapper) {
    throw new Error("No icon wrapper found");
  }

  reactDom.render(<Icon url={currentUrl} />, iconWrapper);
}

export { Icon as default, init as initIcon };
