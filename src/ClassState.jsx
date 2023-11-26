import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: true,
      loading: false,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("update");

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Validating");

        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>
        <p>Please enter the security code</p>

        {this.state.error && <p>Error: invalid code</p>}

        {this.state.loading && <Loading />}

        <input placeholder="Security code" />
        <button onClick={() => this.setState({ loading: true })}>
          Verify
        </button>
      </div>
    );
  }
}

export { ClassState };
