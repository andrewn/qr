import React, { Component } from 'react';
import {VelocityComponent} from 'velocity-react';

require('./Result.css');

export default class Result extends Component {
  constructor() {
    super();
  }
  render() {
    let action = null,
        button = null,
        msg = null,
        isFound = false;
    if( /^http/.test(this.props.result) ) {
      isFound = true;
      msg = <a href={this.props.result}>{this.props.result}</a>;
      action = <a
          className="button button-go"
          target="_blank"
          href={this.props.result}>Open</a>;
    } else if (this.props.result != null){
      msg = <p>
        <i>?</i> No code found
      </p>;
    }
    let classes = 'result ' + (isFound ? 'is-found' : 'is-not-found');
    return <div className={classes}>
      {msg}
      <div className="actions">
        {action}
        <button
          className="button reset-button"
          onClick={this.props.onReset}>Reset</button>
      </div>
    </div>;
  }
}
