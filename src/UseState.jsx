import React, { useEffect, useState } from 'react'

function UseState({ name }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log("Starting effect")

    if (!!loading) {
      setTimeout(() => {
        console.log("Validating");

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

      <input placeholder="Security code" />
      <button
        onClick={() => setLoading(true)}
      >Verify</button>
    </div>
  );
}

export { UseState }