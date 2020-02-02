import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [httpState, setHttpState] = useState({
    message: 'This is a static message'
  });

  useEffect(() => {

    // You cannot return a Promise to useEffect
    (async () => {
      const joke = await getAJoke();

      setHttpState({
        message: joke
      })
    })();

    // Optional. You can use a return to clean the side effect, like unsubscribing from events
    return () => {}

  }, [] /* This is important to not make a request twice (or more) */);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {httpState.message}
        </p>
      </header>
    </div>
  );
}

async function getAJoke() {
  const response = await axios.get('https://api.icndb.com/jokes/random');

  if (response.data.type !== 'success') {
    throw response;
  }

  return response.data.value.joke;
}

export default App;
