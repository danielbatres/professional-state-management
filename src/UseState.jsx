import React, { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        setState({
          ...state,
          error: state.value !== SECURITY_CODE, 
          loading: false,
          confirmed: state.value === SECURITY_CODE
        });
      }, 1500);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Please enter the security code</p>
        {state.error && (
          <p>Error: invalid code</p>
        )}

        {state.loading && (
          <p>Loading...</p>
        )}

        <input 
          placeholder="Security code" 
          value={state.value}
          onChange={event => setState({ ...state, value: event.target.value })}
        />
        <button
          onClick={() => {
            setState({ ...state, error: false, loading: true })
          }}
        >Verify</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Confirmation, are you sure?</p>
        <button onClick={() => {
          setState({ 
            ...state, 
            deleted: true 
          });
        }}>Yes, delete</button>
        <button onClick={() => {
          setState({ 
            ...state, 
            confirmed: false 
          })
        }}>No, I regretted it</button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <p>Deleted</p>
        <button onClick={() => {
          setState({ 
            ...state, 
            confirmed: false, 
            deleted: false, 
            value: '' 
          });
        }}>Reset, go back</button>
      </React.Fragment>
    )
  }
}

export { UseState }