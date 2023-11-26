import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
      error: false,
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

        this.setState({ 
          error: SECURITY_CODE !== this.state.value, 
          loading: false 
        })
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>
        <p>Please enter the security code</p>

        {(this.state.error && !this.state.loading) && <p>Error: invalid code</p>}

        {this.state.loading && <Loading />}

        <input 
          placeholder="Security code" 
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Verify
        </button>
      </div>
    );
  }
}

export { ClassState };
