import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numberId, setNumberId] = useState("");

  const fetchNumbers = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:9876/numbers/${numberId}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      if (!response) {
        // First response
        setResponse({
          windowPrevState: [],
          windowCurrState: data.numbers.slice(0, 4),
          numbers: data.numbers,
          avg: data.avg,
        });
      } else {
        // Subsequent responses
        const prevWindowSize = response.windowCurrState.length;
        const windowCurrState = data.numbers
          .slice(prevWindowSize - 4, prevWindowSize)
          .concat(data.numbers.slice(prevWindowSize));
        setResponse({
          windowPrevState: response.windowCurrState,
          windowCurrState,
          numbers: data.numbers,
          avg: data.avg,
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setNumberId(event.target.value);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <input
        type="text"
        value={numberId}
        onChange={handleInputChange}
        placeholder="Enter number ID (p, f, e, r)"
      />
      <button onClick={fetchNumbers} disabled={loading || !numberId}>
        Fetch Numbers
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>
            Window Previous State: {JSON.stringify(response.windowPrevState)}
          </p>
          <p>
            Window Current State: {JSON.stringify(response.windowCurrState)}
          </p>
          <p>Numbers: {JSON.stringify(response.numbers)}</p>
          <p>Average: {response.avg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
