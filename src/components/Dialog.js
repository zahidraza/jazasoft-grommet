import React, { Component } from "react";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class Dialog extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Dialog;
