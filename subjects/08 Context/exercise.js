////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Form extends React.Component {

  static childContextTypes = {
    handleSubmit: PropTypes.func
  }

  getChildContext(){
    return { handleSubmit: this.props.handleSubmit }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class SubmitButton extends React.Component {

  static contextTypes = {
    handleSubmit: PropTypes.func
  }

  render() {
    return <button onClick={this.context.handleSubmit}>{this.props.children}</button>;
  }
}

class TextInput extends React.Component {

  static contextTypes = {
    handleSubmit: PropTypes.func
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.context.handleSubmit()
    } 
  }

  render() {
    return (
      <input
        onKeyDown={this.handleKeyPress}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    );
  }
}

class App extends React.Component {
  handleSubmit = ({ firstName, lastName }) => {
    alert(`YOU WIN, ${firstName} ${lastName}!`);
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form handleSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
