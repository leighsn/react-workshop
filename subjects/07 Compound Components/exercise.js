////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the parent so it can use it to render.
// - Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
//   the <RadioOption>s so the keyboard will work)
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  };

  selectValue = () => {
    this.props.setActiveIndex(index);
  }

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        isSelected: child.props.value === this.props.activeIndex,
        onClick: () => this.selectValue(child.props.value)
      })
    );

    return <div>{children}</div>;
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string
  };

  render() {
    return (
      <div onClick={this.props.onClick}>
        <RadioIcon isSelected={this.props.isActive} />
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    const { isSelected } = this.props;
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    );
  }
}

class App extends React.Component {

  state = {
    activeIndex: 0
  }

  setActiveIndex = (activeIndex) => {
    this.setState({ activeIndex })
  }

  render() {
    return (
      <div>
        <h1>`♬ It's about time that we all turned off the radio ${this.state}♫`</h1>

        <RadioGroup 
          defaultValue="fm" 
          activeIndex={this.state.activeIndex} 
          setActiveIndex={this.setActiveIndex}
        >
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
