import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    return (
      <div className={this.props.className} dangerouslySetInnerHTML={{__html: this.props.image}} />
    );
  }
};
