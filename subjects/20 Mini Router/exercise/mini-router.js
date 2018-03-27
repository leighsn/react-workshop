////////////////////////////////////////////////////////////////////////////////
import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
  history = createHashHistory();

  static childContextTypes = {
    location: PropTypes.object,
    updateRoute: PropTypes.func
  }

  state = {
    location: this.history.location
  }

  componentDidMount(){
    this.history.listen(()=> {
      this.setState({ location: this.history.location })
    })
  }

  getChildContext = () => {
    return ({
      location: this.state.location,
      updateRoute: this.updateRoute
    })
  }

  updateRoute = (route) => {
    debugger
    this.history.push(route);
  }

  render() {
    return this.props.children;
  }
}

class Route extends React.Component {

  static contextTypes = {
    location: PropTypes.object,
    updateRoute: PropTypes.func
  }

  render() {
    const { location } = this.context;
    const { path, render, component: Component } = this.props;
    if (location.pathname === path) {
      return <Component />;
    } else {
      return null;
    }
  }
}

class Link extends React.Component {

  static contextTypes = {
    location: PropTypes.object,
    updateRoute: PropTypes.func
  }

  handleClick = e => {
    e.preventDefault();
    this.context.updateRoute(e.target.hash);
  };

  render() {
    return (
      <a href={`#${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export { Router, Route, Link };
