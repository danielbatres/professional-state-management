import React, { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  console.log(value);

  useEffect(() => {
    console.log("Starting effect")

    if (!!loading) {
      setTimeout(() => {
        console.log("Validating");

        setError(value !== SECURITY_CODE);

        setLoading(false);
      }, 2000);
    }

    console.log("End effect");
  }, [loading]);

  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please enter the security code</p>
      {error && (
        <p>Error: invalid code</p>
      )}

      {loading && (
        <p>Loading...</p>
      )}

      <input 
        placeholder="Security code" 
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button
        onClick={() => {
          setError(false);
          setLoading(true);
        }}
      >Verify</button>
    </div>
  );
}

export { UseState }