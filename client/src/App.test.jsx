import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders file sharing app', () => {
  render(<App />);
  const headerElement = screen.getByText(/share your files across the network/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders upload button', () => {
  render(<App />);
  const uploadButton = screen.getByRole('button', { name: /upload file/i });
  expect(uploadButton).toBeInTheDocument();
});

test('renders network status component', () => {
  render(<App />);
  const statusElement = screen.getByText(/server:/i);
  expect(statusElement).toBeInTheDocument();
});
