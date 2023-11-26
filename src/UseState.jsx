import React, { useState } from 'react'

function UseState({ name }) {
  const [error, setError] = useState(false);
  
  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please enter the security code</p>
      {error && (
        <p>Error: invalid code</p>
      )}
      <input placeholder="Security code" />
      <button
        onClick={() => setError(!error)}
      >Verify</button>
    </div>
  );
}

export { UseState }