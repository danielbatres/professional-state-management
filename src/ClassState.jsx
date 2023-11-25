import React from "react";

class ClassState extends React.Component {
  render() {
    return (
      <div>
        <h2>Delete ClassState</h2>
        <p>Please enter the security code</p>
        <input placeholder="Security code" />
        <button>Verify</button>
      </div>
    );
  }
}

export { ClassState };
