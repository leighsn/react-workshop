# Workshop Topics
- Writing re-usable, maintainable components. [See the original curriculum](https://github.com/ReactTraining/react-workshop/)


## Imperative Code -> Declarative Code
- Imperative code in React -> explicitly specify behavior through combination of props. 
- Declarative code - specify result you want, while components handle implementation and hide it from users. Declarative code is easier to understand and reason about.
- Driving analogy -> imperative would be pressing the gas and brake, declarative is putting on cruise control. Delegate the imperative work of stepping on the gas and brake to the cruise control component. Practically, this means moving logic down into the tree and passing down desired result. 
- Write components that other engineers can use without having to understand how their internals work, and having to dictate behavior through multiple props.
- Example of imperative code: [jQuery date picker] (http://api.jqueryui.com/datepicker/). 
- Instead, encapsulate logic into child components that can be assembled to fit the use case.

Example: Theramin Music Player
- Original component - logic around playing the sound closely coupled to the <App/> component. Not re-usable. Four places in the code where our component interacts with the oscillator component.
- Step 2: Interact with the oscillator component in two places - on mount, and in the function that handles all the imperative code. Otherwise, our component runs imperative work whenever it updates. Start to seperate logic of oscilaltor from the component.
- Step 3: Encapsulate the interaction with oscillator to a <Tone/> component
- Step 4: Seperate <Tone/> component from App by creating a <Theremin/> component that lets you specify type of sound wave


## Compound Components
- De-couple component structure from functionality so that other developers can re-organize them as they need to for their specific use case.
- {this.props.children} - use when you don't want to control behavior of the children from the parent component. If you do want to have control over child render logic based on state of the parent, use React.Component.children helpers:

```
React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        myProp: child.props.whatever === this.state.whatever
      });
    });
```

## Context

- "Forbidden API" - all the docs warn you not to use it because it's unstable. 
- Solves the problem of passing props from ancestor to deeply nested child without needing to pass it down through each level of the tree. Useful when there's an ancestor that has a shouldComponentUpdate method that might prevent subtree re-rendering. Also saves the effort of having to pass props down many levels that aren't needed by intermediate components.
- Instead, specify the props you want to have access to on the ancestor, and specify them again on the descendent.
- Context is widely used by other libraries meant to be used with React, including Fluxible, Redux, and React Router.
- Stable version will be coming to React 16.3

```
class Ancestor extends React.Component {

  static childContextTypes = {
    isAwesome: PropTypes.bool,
    skills: PropTypes.array
  }

  getChildContext(){
    return {
      isAwesome: true,
      skills: ['Being an ancestor', 'Chilling']
    };
  }
}

//other syntax
Ancestor.childContextTypes = {
  //same  
}

Ancestor.childContextTypes = {
  isAwesome: PropTypes.bool,
    skills: PropTypes.array
};


class Descendant extends React.Component {
  static contextTypes = {
    isAwesome: PropTypes.bool,
    skills: PropTypes.array
  };

  render (){
    return (
      <p>`It is `${this.context.isAwesome} that my ancestor is awesome`</p>
      <ul>Skills: </ul>
      {this.context.skills.map(skill => <li>{skill}</li>) }
    );
  }
}


// other syntax
Descendant.contextTypes = {
  //same
}


```


## Higher-order components
- Common pattern for encapsulating logic that you want to use repeatedly. Replacement for mixins, which were popular before ES 6
- HOC is just a component that wraps another component, in order to bake in additional logic or modify props. 
- Downsides - common to have components wrapped in 5 or more levels of compound components.
- Also, common pattern is to create an anonymous class wrappey, which seems excessive. Useful pattern but can be over-utilized. 

## Render Props
- Alternative pattern for encapsulating logic that you want to pass to children. More flexible than HOC.

## Render Optimizations
- React.PureComponent -> use when you don't need state on your component. More efficient than a simple functional component because they always re-render when they are part of the tree that re-renders. React.PureComponent is similar to a React.Component with a built in shouldComponentUpdate method that compares props. C