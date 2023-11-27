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

const reducerObject = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'CHECK': {
    ...state,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state)[action.type] || state;
}

