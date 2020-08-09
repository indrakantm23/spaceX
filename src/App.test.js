import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Verify if App renders
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Verify if data loads
test('should fetch data from API', () => {
  let API_URL = "https://api.spacexdata.com/v3/launches?limit=100";
  let data = fetch(API_URL).then(res => res.json().then(data => {return data}))
  expect(data).toBe(data.length >0);
});
