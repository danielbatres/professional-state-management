import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onWrite = ({ target: { value }}) => dispatch({ type: actionTypes.write, payload: value });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  useEffect(() => {
    if (!!state.loading) setTimeout(onConfirm, 1500);
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>Verify</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Confirmation, are you sure?</p>
        <button onClick={onDelete}>Yes, delete</button>
        <button onClick={onReset}>No, I regretted it</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Deleted</p>
        <button onClick={onReset}>
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

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  delete: 'DELETE',
  reset: 'RESET'
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    error: false,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: state.value !== SECURITY_CODE,
    loading: false,
    confirmed: state.value === SECURITY_CODE,
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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
