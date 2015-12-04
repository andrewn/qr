import React, { Component } from 'react';
import CameraInput from './CameraInput';

import './App.css';

var QrCode = require('qrcode-reader');

export default class App extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {};
  }

  handleInput(evt) {
    let url = URL.createObjectURL(evt.file);
    let qr = new QrCode();
    qr.callback = (result) => {
      this.setState({
        imageUrl: url,
        result: result
      });
    };
    qr.decode(url);
  }

  render() {
    let link;
    if( /^http/.test(this.state.result) ) {
      link = <a href={this.state.result}>{this.state.result}</a>
    } else {
      link = this.state.result;
    }

    return (<div>
      <CameraInput
        onImage={this.handleInput} />

      {link}

      <img style={{width:"100vmin", display: "block"}} src={this.state.imageUrl} />
    </div>);
  }
}
