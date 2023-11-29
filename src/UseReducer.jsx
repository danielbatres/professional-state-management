import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!!state.loading) setTimeout(() => {
      dispatch({ type: 'CONFIRM' })
    }, 1500);
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Please enter the security code</p>
        {state.error && <p>Error: invalid code</p>}

        {state.loading && <p>Loading...</p>}

        <input
          placeholder="Security code"
          value={state.value}
          onChange={(event) => dispatch({ type: 'WRITE', payload: event.target.value })}
        />
        <button onClick={() => dispatch({ type: 'CHECK' })}>Verify</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Confirmation, are you sure?</p>
        <button onClick={() => dispatch({ type: 'DELETE' })}>Yes, delete</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>No, I regretted it</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted</p>
        <button onClick={() => dispatch({ type: "RESET" })}>
          Reset, go back
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

const reducerSwitch = (state, action) => {
  const newState = { ...state };
  
  switch (action.type) {
    case 'ERROR':
      newState.error = true;
      newState.loading = false;
      break;
    case 'CHECK':
      newState.loading = true;
      break;
  }

  return newState;
};

const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'CHECK': {
    ...state,
    error: false,
    loading: true,
  },
  'CONFIRM': {
    ...state,
    error: state.value !== SECURITY_CODE,
    loading: false,
    confirmed: state.value === SECURITY_CODE,
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'DELETE': {
    ...state,
    deleted: true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
}

export { UseReducer };
