import React, { Component } from 'react';


class LoginModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleHide = this.handleHide.bind(this);
    //Se define esta propiedad para mantenerlo escondido
    this.state = {
      show = false
    };
  }
  handleHide() {
    this.setState({ show = false });
  }

  render() {
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Contained Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
            ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default LoginModal;