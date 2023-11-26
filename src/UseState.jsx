import React, { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false
  });

  useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        setState({
          ...state,
          error: state.value !== SECURITY_CODE, 
          loading: false 
        });
      }, 2000);
    }
  }, [state.loading]);

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
}

export { UseState }