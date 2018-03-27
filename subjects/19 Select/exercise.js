////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    showOptions: false
  };

  static contextTypes = {
    handleSelect: PropTypes.func
  };



  static childContextTypes = {
    handleSelect: PropTypes.func
  }

  getChildContext(){
    return { handleSelect: this.handleSelect };
  }

  toggleOptions = () => {
    debugger;
    this.setState({ showOptions: !this.state.showOptions })
  }

  isControlled = () => {
    return !!this.props.value;
  }

  handleSelect(val) {
    this.setState({ selectValue: val})
  }

  renderChildren(){
    if (!this.isControlled){
      return this.props.children;
    } else {
      return React.Children.map(child => {
        return React.cloneElement(child, {
          onClick: () => this.handleSelect(child.props.value)
        })
      })
    }
  }

  render() {
    return (
      <div className="select" onClick={this.toggleOptions}>
        <div className="label">
          label <span className="arrow">▾</span>
        </div>
        {this.state.showOptions && <div className="options">{this.renderChildren()}</div>}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <div className="option">{this.props.children}</div>;
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select + Option</h1>

        <h2>Controlled</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
