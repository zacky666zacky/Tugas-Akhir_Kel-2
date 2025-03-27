import React, { Component } from "react";

export default class StateFull extends Component {
  render() {
    return (
      <>
        <div>
          <h1>Name: {this.props.nama}</h1>
          <br />
          job: {this.props.job}
        </div>
      </>
    );
  }
}
