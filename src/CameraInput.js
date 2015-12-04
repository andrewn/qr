import React, { Component } from 'react';

import './CameraInput.css';

import Icon from './Icon.js'

var camera = require('./camera.svg');

// import * as Icon from './camera.svg';

// console.log('Icon', Icon);

export default class CameraInput extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {};
  }

  handleInput(evt) {
    if (this.props.onImage) {
      let file = evt.target.files ? evt.target.files[0] : null;
      if (!file) { return; }
      this.props.onImage({ file: file });
    }
  }

  render() {
    let link;
    if( /^http/.test(this.state.result) ) {
      link = <a href={this.state.result}>{this.state.result}</a>
    } else {
      link = this.state.result;
    }

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
      {link}

      <img style={{width:"100vmin", display: "block"}} src={this.state.imageUrl} />
    </div>);
  }
}
