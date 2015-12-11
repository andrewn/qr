import React, { Component } from 'react';
import CameraInput from './CameraInput';
import {VelocityComponent} from 'velocity-react';
import { includes } from 'lodash';

import './App.css';

var QrCode = require('qrcode-reader');

export default class App extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      view: 'start',
      result: null
    };
  }

  handleInput(evt) {
    console.log('handleInput, evt', evt);
    this.setState({
      view: 'loading'
    });
    let url = URL.createObjectURL(evt.file);
    let qr = new QrCode();
    qr.callback = (result) => {
      this.setState({
        view: 'result',
        imageUrl: url,
        result: result
      });
    };
    qr.decode(url);
  }

  componentDidMount() {
    //setTimeout(() => this.setState({ view: 'camera' }), 500);
  }

  render() {
    let link;
    let view = this.state.view;
    if( /^http/.test(this.state.result) ) {
      link = <a href={this.state.result}>{this.state.result}</a>
    } else {
      link = this.state.result;
    }

    let cameraAnim = {
      opacity: view === 'start' ? 1 : 0
    };
    let loadingAnim = {
      opacity: view === 'loading' ? 1 : 0
    };
    let resultAnim = {
      opacity: view === 'result' ? 1 : 0
    };
    let duration = 500;

    return (<div data-view={this.state.view}>
      <VelocityComponent animation={cameraAnim} duration={duration}>
        <CameraInput
          className="view"
          onImage={this.handleInput} />
      </VelocityComponent>

      <VelocityComponent animation={loadingAnim} duration={duration}>
        <p className="view">Loading&helli;</p>
      </VelocityComponent>

      <VelocityComponent animation={resultAnim} duration={duration}>
        <p className="view">{link}</p>
      </VelocityComponent>

      <img style={{width:"100vmin", display: "block"}} src={this.state.imageUrl} />
    </div>);
  }
}
