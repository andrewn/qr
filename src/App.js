import React, { Component } from 'react';
import CameraInput from './CameraInput';
import {VelocityComponent} from 'velocity-react';
import { throttle } from 'lodash';

import Progress from './Progress.js';
import Result from './Result.js';

import './App.css';

var QrCode = require('qrcode-reader');

export default class App extends Component {
  constructor() {
    super();
    this.handleInput  = this.handleInput.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleReset  = this.handleReset.bind(this);
    this.handleBodyClick  = this.handleBodyClick.bind(this);
    this.state = {
      view: 'initialising',
      result: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('state:', nextState);
  }

  handleInput(evt) {
    let url = URL.createObjectURL(evt.file);

    let qr = new QrCode();
    qr.callback = this.handleResult;

    this.setState({
      view: 'processing',
      imageUrl: url,
      result: null
    });

    // @hack
    // Decoding blocks main thread so
    // wait until processing transition
    // is displayed
    // @todo move into web worker?
    setTimeout(
      () => { qr.decode(url); },
      this.props.duration * 2
    );
  }

  // Fires multiple times when attached as
  // onClick to root element??
  handleBodyClick(evt) {
    if (this.state.view === 'start') {
      console.log('handleBodyClick')
      this.refs.cameraInput.triggerInput();
    }
  }

  handleResult(result) {
    this.setState({
      view: 'result',
      result: result
    });
  }

  handleReset(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({
      view: 'start'
    });
    return false;
  }

  componentDidMount() {
    setTimeout(() => this.setState({ view: 'start' }), this.props.duration);
  }

  render() {
    let view = this.state.view;

    let duration = this.props.duration;

    let hidden = {
      height: 0
    };

    let camera = {
      initialising: hidden,
      start: {
        height: '50vmin'
      },
      processing: hidden,
      result: hidden
    };

    let image = {
      initialising: hidden,
      start: hidden,
      processing: {
        height: '50vmin'
      },
      result: {
        height: '50vmin'
      }
    };

    let progress = {
      initialising: hidden,
      start: hidden,
      processing: {
        height: '10vmin'
      },
      result: hidden
    };

    let result = {
      initialising: hidden,
      start: hidden,
      processing: hidden,
      result: {
        height: '50vmin'
      }
    };

    return (<div data-step={view} className="app">
      <VelocityComponent
        animation={ progress[view] }
        duration={duration}
        >
        <Progress isActive={view === 'processing'}/>
      </VelocityComponent>

      <VelocityComponent
        animation={ result[view] }
        duration={duration}
        >
        <div className="result">
          <Result
            onReset={this.handleReset}
            result={this.state.result} />
        </div>

      </VelocityComponent>

      <VelocityComponent
        animation={ image[view] }
        duration={duration}
        >
        <div>
          <img
            style={{height:"60vmin", display: "block"}}
            src={this.state.imageUrl} />
        </div>
      </VelocityComponent>

      <VelocityComponent
        animation={ camera[view] }
        duration={duration}
        >
        <CameraInput
          ref="cameraInput"
          onImage={this.handleInput} />
      </VelocityComponent>
    </div>);
  }
}

App.defaultProps = { duration: 500 };
