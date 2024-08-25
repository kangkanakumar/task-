import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = JSON.parse(inputData);
      const response = await axios.post('https://your-heroku-app-name.herokuapp.com/bfhl', { data: data.data });
      setResult(response.data);
    } catch (err) {
      setError('Error parsing input data. Ensure it is valid JSON.');
    }
  };

  return (
    <div className="App">
      <h1>BFHL Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          rows="5"
          cols="33"
          placeholder='Enter JSON data here... e.g. {"data": ["A", "12", "c"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h2>Results:</h2>
          <p>Numbers: {JSON.stringify(result.numbers)}</p>
          <p>Alphabets: {JSON.stringify(result.alphabets)}</p>
          <p>Highest Lowercase Alphabet: {JSON.stringify(result.highest_lowercase_alphabet)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
