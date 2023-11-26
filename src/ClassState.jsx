import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: true,
    };
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>
        <p>Please enter the security code</p>

        {this.state.error && (
          <p>Error: invalid code</p>
        )}

        <input placeholder="Security code" />
        <button onClick={() => this.setState({ error: !this.state.error })}>Verify</button>
      </div>
    );
  }
}

export { ClassState };
