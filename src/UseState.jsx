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

  const onConfirm = () => {
    setState({
      ...state,
      error: state.value !== SECURITY_CODE,
      loading: false,
      confirmed: state.value === SECURITY_CODE,
    });
  }

  const onWrite = newValue => {
    setState({ 
      ...state, 
      value: newValue 
    });
  }

  const onCheck = () => {
    setState({ 
      ...state, 
      error: false, 
      loading: true 
    });
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  useEffect(() => {
    if (!!state.loading) setTimeout(onConfirm, 1500);
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
          onChange={event => onWrite(event.target.value)}
        />
        <button
          onClick={onCheck}
        >Verify</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Confirmation, are you sure?</p>
        <button onClick={onDelete}>Yes, delete</button>
        <button onClick={onReset}>No, I regretted it</button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <p>Deleted</p>
        <button onClick={onReset}>Reset, go back</button>
      </React.Fragment>
    )
  }
}

export { UseState }