import React, { Component } from 'react';
import {VelocityComponent} from 'velocity-react';

import Icon from './Icon.js';

let gear = require('../icons/gear.svg');

export default class Progress extends Component {
  constructor() {
    super();
  }
  render() {
    let processingSpinnerAnim;
    if (this.props.isActive) {
      processingSpinnerAnim = {
        animation : {
          rotateZ: 360
        },
        duration: 2000,
        easing: 'linear',
        loop: true
      };
    } else {
      processingSpinnerAnim = {};
    }
    return (<VelocityComponent {...processingSpinnerAnim}>
            <Icon
              className="loading-icon"
              image={gear} />
          </VelocityComponent>);
  }
}
