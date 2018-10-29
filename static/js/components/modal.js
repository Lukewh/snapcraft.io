import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vbox-overlay" style={{ display: "block", opacity: 1 }}>
        <div className="vbox-container">
          <div className="vbox-content" style={{ opacity: 1 }}>
            {this.props.children}
          </div>
        </div>
        {this.props.closeHandler ? (
          <div className="vbox-close" onClick={this.props.closeHandler}>
            X
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Modal;
