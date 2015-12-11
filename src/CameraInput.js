import React, { Component } from 'react';

import './CameraInput.css';

import Icon from './Icon.js';

var camera = require('../icons/camera.svg');

export default class CameraInput extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {};
  }

  // doesn't file on change event
  handleInput(evt) {
    let file = evt.target.files ? evt.target.files[0] : null;
    if (file && this.props.onImage) {
      this.props.onImage({ file: file });
    }
  }

  render() {
    return (<div className="camera-input">
      <label className="ci-label">
        <Icon
          className="ci-icon"
          image={camera} />
        <input
          type="file"
          capture="camera"
          accept="image/*"
          id="cameraInput"
          className="ci-input"
          onChange={this.handleInput}
          name="cameraInput" />
      </label>
    </div>);
  }
}
