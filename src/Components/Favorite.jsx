import React, { Component } from "react";
class Favorite extends Component {
  render() {
    return (
        <div onClick={this.props.clickTrigger}>
        <i className={this.getClasses()} aria-hidden="true"></i>
      </div>
    );
  }
  getClasses() {
    let classes = "fa fa-heart";
    classes += !this.props.isLiked ? "" : "-o";
    return classes;
  }
}

export default Favorite;
