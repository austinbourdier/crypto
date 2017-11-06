import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import App from './containers/App';
const passwordPrompt = window.prompt("Enter your password: ", "")
axios.get('/password-check', {params: {
    password: passwordPrompt
  }})
  .then((response) => {
    render(<App />, document.getElementById('root'));
  })
  .catch((error) => {
    alert('Incorrect password, please reload the page and try again');
  });
